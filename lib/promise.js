(function () {

    "use strict";

    var State = {
        PENDING: 0,
        FULFILLED: 1,
        REJECTED: 2
    };

    function Promise() {

        var currentState = State.PENDING;
        var currentStack = [];
        var currentOutput;

        this.then = function (onFulfilled, onRejected) {

            var promise = new Promise();

            currentStack.push({
                promise: promise,
                resolve: onFulfilled,
                reject: onRejected
            });

            return promise;
        };

        this.resolve = function (value) {
            changeState(State.FULFILLED, value);
        };

        this.reject = function (reason) {
            changeState(State.REJECTED, reason);
        };

        function process() {

            if (currentState == State.PENDING) return false;

            while (currentStack.length) {

                var obj = currentStack.shift();
                var fnToCall = currentState == State.FULFILLED ? obj.resolve : obj.reject;
                var promiseToFulFill = obj.promise;

                if (!(fnToCall instanceof Function)) {
                    (currentState == State.FULFILLED ? promiseToFulFill.resolve : promiseToFulFill.reject)(currentOutput);
                    continue;
                }

                var output;
                try {
                    output = fnToCall(currentOutput);
                    if (output === promiseToFulFill) throw new TypeError("type error");
                } catch (error) {
                    promiseToFulFill.reject(error);
                    continue;
                }

                if (output && output.then instanceof Function) {
                    output.then(promiseToFulFill.resolve, promiseToFulFill.reject);
                } else
                    promiseToFulFill.resolve(output);
            }
        }

        function changeState(state, data) {

            if (currentState == State.FULFILLED && (state == State.PENDING || state == State.REJECTED)) {
                return new Error("can't transition from current state: " + currentState);
            }

            if (currentState == State.REJECTED && (state == State.PENDING || state == State.FULFILLED)) {
                return new Error("can't transition from current state: " + currentState);
            }

            if (state == State.FULFILLED && arguments.length < 2) {
                return new Error("transition to fulfilled must have a non null value");
            }

            if (state == State.REJECTED && arguments.length < 2) {
                return new Error("transition to rejected must have a non null reason");
            }

            currentState = state;
            currentOutput = data;
            setImmediate(process);
            return currentState;
        }
    };

    module.exports = Promise;

})();