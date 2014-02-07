var adapter = require('./adapter'),
    promisesAplusTests = require("promises-aplus-tests");

beforeEach(function () {
    for (var key in require.cache) {
        delete require.cache[key];
    }
});

describe("Promises/A+ Tests", function () {
    require("promises-aplus-tests").mocha(adapter);
});