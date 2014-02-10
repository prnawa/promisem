promisem
========

minimalist Promises/A+ library for [node](http://nodejs.org).


## Installation

    $ npm install git+https://github.com/promises-aplus/promises-tests.git

## Quick Start

```js
var Promise = require('promisem');

function sayHello() {
    var promise = new Promise();
    // 'setTimeout' in this example could be any operation
    // like an XMLHttpRequest or an expected user input
    setTimeout(function () {
        promise.resolve('hello');
    }, 5000);
    return promise;
}

sayHello().then(
    function (greeting) {
        // five seconds later
        console.log(greeting);  // 'hello'
    },
    function (err) {
        // five seconds later
        console.log(err);  // "I'm busy"
    }
);
```

## Features

  * minimalist

## Philosophy

GUI developers are familiar with the phrase "don't block the UI thread." In JavaScript, everything executes in a single thread. If you block that thread, your application grinds to a halt. Animations freeze, keystrokes and clicks are ignored, it’s unlikely you’ll even be able to scroll. Promises are a popular approach to dealing with the wait for long-running tasks to complete.

A promise represents a value. That value may or may not be available when you receive a promise. Instead of directly asking a promise what its value is, or even asking if the value is available yet, you can ask to be notified once the value becomes available. The act of a promise obtaining its value is known as fulfillment. Once a promise is fulfilled, the promise's value never changes; it always represents that value.



## More Information

  * [Promises/A+ specification](http://promisesaplus.com/)
  * [Conformant implementations of Promises/A+](http://promisesaplus.com/implementations)
  * [Compliances tests for Promises/A+](https://github.com/promises-aplus/promises-tests)
  

## Running Tests

To run the test suite, first invoke the following command within the repo, installing the development dependencies:

    $ npm install

Then run the tests:

    $ npm test

## Contributors

  https://github.com/prnawa/promisem/graphs/contributors

## License

Copyright (c) 2014, Ruwan Nawarathne
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

