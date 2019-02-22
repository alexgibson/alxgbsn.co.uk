---
layout: post
title: Testing native ES modules using Mocha and esm.
desc: How to write unit tests for native ES modules using Mocha and esm and run them on the command line.
excerpt: I recently worked on a project where I wanted to switch to using native ES modules in the browser. Migrating the existing code to ES modules was easy enough, but the tricky part came when I wanted to maintain the existing unit tests. Turns out, many JavaScript testing frameworks don't yet support native ES modules out of the box, and I was struggling to find an easy solution that didn't require transpiling my code back to ES5.
---

I recently worked on a project where I wanted to switch to using native ES modules in the browser. Migrating the existing code to ES modules was easy enough, but the tricky part came when I wanted to maintain the existing unit tests. Turns out, many JavaScript testing frameworks don't yet support native ES modules out of the box, and I was struggling to find an easy solution that didn't require transpiling my code back to ES5.

I managed to hack together [Mocha's browser test runner]((https://medium.com/dailyjs/running-mocha-tests-as-native-es6-modules-in-a-browser-882373f2ecb0)) to use ES modules, but I couldn't find a simple way to automate this in CI. The project I was working on also has a suite of Node based unit tests, which we're written using [Jest](https://jestjs.io/). Node doesn't yet support native ES modules however, and I wanted to try and avoid using two different testing frameworks in the future if at all possible. I was stuck.

The solution came when I heard about a rather clever library called [esm](https://github.com/standard-things/esm). It's is a fast, production ready, zero-dependency ES module loader for Node. Using it with Mocha turned out to be relatively straight forward. Here's a basic example for how to do it.

First, make sure you have both [Mocha](https://mochajs.org/) and [esm](https://github.com/standard-things/esm) installed. Next, write a simple ES module called `sum.js`:

```javascript
export default function sum(a, b) {
    return a + b;
}
```

A unit test for this module could look like this:

```javascript
import sum from './sum.js';
import { expect } from 'chai';

describe('sum', function() {

    it('should return the sum of two arguments', function () {
        expect(sum(1, 2)).to.equal(3);
    });
});
```

If we try to now run this test using `mocha 'sum.test.js'` we get a error, since Node doesn't understand the ES import syntax:

```
import sum from './sum.js';
       ^^^

SyntaxError: Unexpected identifier
```

Obviously this is not what we want. Thankfully, passing in `esm` as a require to Mocha is _really easy_:

```
mocha 'sum.test.js' --require esm
```

The test now passes without any further configuration changes. Success!

```
sum
  ✓ should return the sum of two arguments


1 passing (10ms)
```

Because Mocha is a Node based testing framework, I was also able to port the project's backend tests to use the same framework. Running both suite of tests via the `npm test` command can be done in `package.json` like so:

```
"scripts": {
  "test": "npm run test-node && npm run test-browser",
  "test-browser": "mocha --recursive './test/browser/**/*.js' --require esm",
  "test-node": "mocha --recursive './test/node/**/*.js'",
},
```
