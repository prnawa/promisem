(function () {

    "use strict";

    var State = {
        PENDING: 0,
        FULFILLED: 1,
        REJECTED: 2
    };

    function Promise() {

        this.state = State.PENDING;
        this.stack = [];

        var currentState = this.state;
        var currentStack = this.stack;
        var currentvalue;


        this.then = function (onFulfilled, onRejected) {

            var promise = new Promise();

            currentStack.push({
                promise: promise,
                fulfill: onFulfilled,
                reject: onRejected
            });

            return promise;
        };

        this.fulfill = function (value) {
            changeState(State.FULFILLED, value);
        };

        this.reject = function (reason) {
            changeState(State.REJECTED, reason);
        };

        function process() {

            if (currentState == State.PENDING) return false;

            while (currentStack.length) {
                var obj = currentStack.shift();
                var fnToCall = currentState == State.FULFILLED ? obj.fulfill : obj.reject;
                var promiseToFulFill = obj.promise;

                if (typeof fnToCall !== 'function') {
                    if (currentState == State.FULFILLED) promiseToFulFill.fulfill(currentvalue);
                    if (currentState == State.REJECTED) promiseToFulFill.reject(currentvalue);
                    return;
                }
                setImmediate(function () {
                    var value;
                    try {
                        value = fnToCall(currentvalue);
                    } catch (error) {
                        promiseToFulFill.reject(error);
                    }

                    if (value && value.then instanceof Function) {
                        value.then(promiseToFulfill.fulfill, promiseToFulfill.reject);
                    } else {
                        promiseToFulFill.fulfill(value);
                    }
                });
            }
        }

        function changeState(state, value) {
            // catch changing to same state (perhaps trying to change the value)
            if (currentState == state) {
                return new Error("can't transition to same state: " + state);
            }

            // trying to change out of fulfilled or rejected
            if (currentState == State.FULFILLED || currentState == State.REJECTED) {
                return new Error("can't transition from current state: " + state);
            }

            // if second argument isn't given at all (passing undefined allowed)
            if (state == State.FULFILLED && arguments.length < 2) {
                return new Error("transition to fulfilled must have a non null value");
            }

            // if a null reason is passed in
            if (state == State.REJECTED && arguments.length < 2) {
                return new Error("transition to rejected must have a non null reason");
            }

            //change state
            currentState = state;
            currentvalue = value;

            process();

            return currentState;
        }
    };

    module.exports = Promise;

})();