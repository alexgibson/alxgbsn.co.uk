---
layout: post
title: Visibility.js - A cross-browser plugin for using the Page Visibility API
titleinfo: Alex Gibson
desc: A JavaScript plugin providing cross browser support for using the Page Visibility API
---

Since the [Page Visibility API](http://www.w3.org/TR/page-visibility/) now has fairly wide [browser support](http://caniuse.com/#feat=pagevisibility) (I'm still looking at you however, Safari), I decided to release a plugin for handling and detecting web page visibility changes. Because most browsers still use this feature under an experimental vendor prefix, the JavaScript can be somewhat clumbersome and a pain to rewrite. [Visibility.js](https://github.com/alexgibson/visibility.js) handles all the vendor prefix messiness for you, and provides a simple API for registering visibility change callbacks. As always, the plugin is open source and free for anyone to use.

Installation
---------------------------------------

* Download: [zip](https://github.com/alexgibson/visibility.js/zipball/master)
* [Bower](https://github.com/twitter/bower/): `bower install visibility.js`
* Git: `git clone https://github.com/alexgibson/visibility.js`

Setup
---------

First, include the visibility.js JavaScript file in the `head` of your HTML document:

{% highlight html %}
<script src="visibility.js"></script>
{% endhighlight %}

Next just create a new plugin instance, passing the relevant callbacks you want to use:

{% highlight javascript %}
var page = new Visibility({onHidden: onHiddenFunc, onVisible: onVisibleFunc});

function onHiddenFunc () {
	console.log('hidden callback');
}

function onVisibleFunc () {
	console.log('visible callback');
}
{% endhighlight %}

Useful methods
--------------

* `isHidden` (returns boolean) - manually check to see if the page is hidden.
* `isSupported` (returns boolean) - test for Page Visibility API browser support.
* `destroy` - remove event listener and callbacks.


Supported web browsers
---------------------------------------

See [http://caniuse.com/#feat=pagevisibility](http://caniuse.com/#feat=pagevisibility)

License
-------

Visibility.js is released under open source [MIT License](https://github.com/alexgibson/visibility.js/blob/master/LICENSE.md).