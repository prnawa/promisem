var Promise = require('./../lib/promise');

module.exports.deferred = function () {

    var promise = new Promise();

    return {
        promise: promise,
        resolve: promise.resolve,
        reject: promise.reject
    };
};