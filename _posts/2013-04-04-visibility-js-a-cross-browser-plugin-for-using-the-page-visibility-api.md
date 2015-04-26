---
layout: post
title: Visibility.js - A cross-browser plugin for using the Page Visibility API
titleinfo: Alex Gibson
desc: A JavaScript plugin providing cross browser support for using the Page Visibility API
---

Since the [Page Visibility API](http://www.w3.org/TR/page-visibility/) now has fairly wide [browser support](http://caniuse.com/#feat=pagevisibility), I decided to put together a simple component for handling and detecting web page visibility changes. Because most browsers still use this feature under an experimental vendor prefix, the JavaScript can be somewhat cumbersome and a pain to rewrite. [Visibility.js](https://github.com/alexgibson/visibility.js) handles all the vendor prefix messiness for you, and provides a simple API for registering visibility change callbacks.

Installation
------------

Please see the [GitHub repo](https://github.com/alexgibson/visibility.js) for setup instructions.

Usage
-----

Create a new `Visibility` instance, passing the relevant callbacks you need.

{% highlight javascript %}
var page = new Visibility({
    onHidden: hiddenCallback,
    onVisible: visibleCallback
});

function hiddenCallback () {
    console.log('hidden callback');
}

function visibleCallback () {
    console.log('visible callback');
}
{% endhighlight %}

Useful methods
--------------

* `isHidden` (returns boolean) - manually check to see if the page is hidden.
* `isSupported` (returns boolean) - test for Page Visibility API browser support.
* `destroy` - remove event listener and callbacks.

Testing
-------

Testing relies upon Karma test runner and Phantom JS. To install these dependencies, run the following command from the project root.

    npm install

Then to perform a single pass of the tests run:

    npm test

Supported web browsers
---------------------------------------

[caniuse.com/#feat=pagevisibility](http://caniuse.com/#feat=pagevisibility)

License
-------

Visibility.js is released under open source [MIT License](https://github.com/alexgibson/visibility.js/blob/master/LICENSE.md).
