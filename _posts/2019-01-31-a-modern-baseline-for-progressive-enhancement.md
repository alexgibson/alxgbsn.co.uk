---
layout: post
title: Using ES modules as a modern baseline for progressive enhancement
desc: A new approach to delivering progressively enhanced websites using ES modules.
excerpt: It's pretty commonplace today to write JavaScript using ES2015 (or ES6), and then to transpile that code to ES5 in a build step, using something like Babel. Transpiling enables us to write code using the latest ECMAScript syntax and features, but then compiles it in a backward compatible way so that it works with older browsers. The downside to this is that transpiling can also lead to increased bundle sizes if you're not careful, and for browsers that already support ES2015 features, you're potentially shipping a lot of redundant code. Modern browsers need neither the transpiled code, nor the polyfills that can get bundled along with it.
---

It's pretty commonplace today to write JavaScript using ES2015 (or ES6), and then to transpile that code to ES5 in a build step, using something like [Babel](https://babeljs.io/). Transpiling enables us to write code using the latest ECMAScript syntax and features, but then compiles it in a backward compatible way so that it works with older browsers. The downside to this is that transpiling can also lead to increased bundle sizes if you're not careful, and for browsers that already support ES2015 features, you're potentially shipping a lot of redundant code. Modern browsers need neither the transpiled code, nor the polyfills that can get bundled along with it.

Before we get into the details of this post, I'll start by emphasizing that depending on your project and its target audience, transpiling and bundling your JavaScript may be the _exact right_ thing to do still. Browser segmentation and page load times are key metrics to measure. However, the with technologies like [HTTP/2](https://en.wikipedia.org/wiki/HTTP/2) and support for [ES modules](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) landing in [all major browsers](https://caniuse.com/#feat=es6-module), we now have other options on the table. There is a new opportunity to build [progressively enhanced](https://developer.mozilla.org/docs/Glossary/Progressive_Enhancement) websites using modern ES2015 features, but without as much of the bloat and complicated build steps we've become accustomed to.

Cutting the mustard
-------------------

[Feature detection](https://developer.mozilla.org/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection) has long been a useful technique to determine the code paths that run in our web pages. Techniques such as ["cutting the mustard"](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard) have often been used to define a baseline of browser support for core functionality. Browsers that pass the test can run modern code, and older browsers are given a degraded experience. With ES modules, this kind of feature test can now evolve considerably.

ES2015 introduced several new pieces of syntax, such as [`let`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/let), [`const`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/const), [arrow functions](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [classes](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes), and of course [`import`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export) for modules. Since this new syntax can't be parsed by older browsers without throwing errors, web pages need a way to opt-in to use the new syntax where traditional feature detection falls short. Thankfully, web standards people are clever and have delivered such a mechanism!

Modules to the rescue
---------------------

When the spec for loading ES modules was introduced, it added a new value for the `type` attribute to the `<script>` tag, [`type="module"`](https://developer.mozilla.org/docs/Web/HTML/Element/script#attr-type). This acts as an identifier to browsers that the script is an ES module and can be loaded as such. It's also important to note that modules use [`defer`](https://developer.mozilla.org/docs/Web/HTML/Element/script#attr-defer) by default, so do not block the HTML parser like regular scripts.

```html
<script type="module" src="./my-module.js"></script>

<!-- Modules can also be inline -->

<script type="module">
  import thing from './my-module.js';
</script>
```

So how does this all tie together with progressive enhancement? Well, `type="module"` is a value that older browsers will not understand. When a browser encounters what it considers to be an invalid type, it won't execute that script. Whilst it may still be downloaded, the script will not be parsed, and none of its `import` dependencies will be requested either. This allows us to safely use ES2015 features for modern browsers, and also improves page load performance for people on older browsers or operating systems, since they have less to download over the network. Older browsers can receive a nicely degraded experience of your choosing.

Of course, if you still wanted to transpile and bundle code for older browsers, or provide some sort of baseline JS support then you can still do that too, using the `nomodule` attribute. This attribute signals to a browser that supports ES modules that the script can be ignored, meaning only older browsers will download and run it.

```html
<script nomodule type="text/javascript">
  // degraded experience
</script>
```

If you're building a progressively enhanced website, then depending on your approach this fallback may not even be needed. It really depends on your target audience and what you see as a suitable baseline experience.

Performance
-----------

As I mentioned at the beginning of this article, using unbundled ES modules in production today may not (yet) be a viable option for many large or complex websites. Using ES modules may result in shipping less code compared to transpiled code, but there are still trade-offs to shipping unbundled vs bundled scripts. Whilst browser vendors are continually working hard to improve module loading performance, you should still [read about the current trade-offs](https://developers.google.com/web/fundamentals/primers/modules#performance) and carefully measure the impact that modules may have before switching. For simpler websites or personal projects, using ES modules today may be just fine. It's up to you to decide.

Speeding up module loading
--------------------------

If you do decide to use ES modules, you may also want to [look into preloading](https://developers.google.com/web/updates/2017/12/modulepreload), so that browsers can preparse modules and their dependencies as early as they can. Of course, minifying is also recommended as well.

```html
<head>
  <link rel="modulepreload" href="./my-module.js">
</head>

<script type="module" src="./my-module.js"></script>
```

Note: preloading is currently only supported in Chrome at the time of writing.

A modern baseline, or a taste of the future?
--------------------------------------------

As we have seen, ES modules can provide a simple, modern baseline for building progressively enhanced websites that can still degrade gracefully on older browsers. Whilst this probably isn't ready for large, complex websites just yet, it might just be fine for smaller sites and personal projects. To help tempt you, here's a list of just some of the features that this technique unlocks access to:

- ES6 variables [`let`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/let), and [`const`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/const).
- [Classes](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes).
- [Template literals](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals).
- Static [`import`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export) in ES modules.
- [Arrow functions](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
- [Promises](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise).
- [Async functions](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function).
- [`fetch`](https://developer.mozilla.org/docs/Web/API/Fetch_API).

If you would like to learn more about ES modules, [Lin Clark](https://code-cartoons.com/) wrote an excellent [deep dive on the Mozilla Hacks blog](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/). I highly suggest reading it.
