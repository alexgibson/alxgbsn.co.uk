---
layout: post
title: Testing native ES modules using Mocha and esm
desc: How to write unit tests for native ES modules using Mocha and esm and run them on the command line.
excerpt: I recently worked on a project where I wanted to switch to using native ES modules in the browser. Migrating the existing code to use ES modules was easy enough, but the tricky part came when I wanted to maintain the existing unit tests. It turns out that many JavaScript testing frameworks don't yet support native ES modules, and I was struggling to find an easy solution that didn't require transpiling my code back to ES5.
---

I recently worked on a project where I wanted to switch to using native ES modules in the browser. Migrating the existing code to use ES modules was easy enough, but the tricky part came when I wanted to maintain the existing unit tests. It turns out that many JavaScript testing frameworks don't yet support native ES modules, and I was struggling to find an easy solution that didn't require transpiling my code back to ES5.

I managed to hack together [Mocha's browser test runner](https://medium.com/dailyjs/running-mocha-tests-as-native-es6-modules-in-a-browser-882373f2ecb0) to work with ES modules, but I couldn't find a simple way to automate this in CI. The project I was working on also had a suite of Node based unit tests, which were written using [Jest](https://jestjs.io/). Node doesn't yet support native ES modules either, and I wanted to try and avoid using two different testing frameworks if at all possible. I was stuck.

The solution came when I heard about a rather clever library called [esm](https://github.com/standard-things/esm). It's is a fast, production ready, zero-dependency ES module loader for Node. Using it with Mocha turned out to be really straight forward. Here's a basic example demonstrating how to do it.

First, make sure you have both [Mocha](https://mochajs.org/) and [esm](https://github.com/standard-things/esm) installed. Next, create an ES module. Here's a very trivial example called `sum.js`:

```javascript
export default function sum(a, b) {
    return a + b;
}
```

A unit test for this module could look like the following piece of code (let's call it `sum.test.js`). Note that here I'm using [Chai](https://www.chaijs.com/), but you could use any [assertion library](https://mochajs.org/#assertions) that Mocha supports.

```javascript
import sum from './sum.js';
import { expect } from 'chai';

describe('sum', function() {

    it('should return the sum of two arguments', function () {
        expect(sum(1, 2)).to.equal(3);
    });
});
```

If we try to run this test on the command line using `mocha 'sum.test.js'` then we get an error. This is because Node does not yet understand the ES `import` syntax.

```
import sum from './sum.js';
       ^^^

SyntaxError: Unexpected identifier
```

Thankfully, fixing this using esm is _really_ easy. All that's needed is to pass in `esm` as a `require` to our `mocha` command:

```
mocha 'sum.test.js' --require esm
```

The test now passes without any further configuration changes. Success!

```
sum
  ✓ should return the sum of two arguments


1 passing (10ms)
```

Because Mocha is Node based, I was also able to port the project's back-end tests to use the same framework. Being able to run both suite of tests via an npm script in `package.json` is nice and simple:

```
"scripts": {
  "test": "npm run test-node && npm run test-browser",
  "test-browser": "mocha --recursive './test/browser/**/*.js' --require esm",
  "test-node": "mocha --recursive './test/node/**/*.js'",
},
```
