var Promise = require('./../lib/promise');

module.exports.deferred = function () {

    var promise = new Promise();

    return {
        promise: promise,
        resolve: promise.fulfill,
        reject: promise.reject
    };
};