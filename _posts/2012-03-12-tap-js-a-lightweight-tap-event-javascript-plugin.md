---
layout: post
title: Tap.js - A lightweight ‘tap’ event JavaScript plugin
desc: A custom 'tap' event JavaScript plugin for mobile browsers
---

While the [W3C touch events API](http://www.w3.org/TR/touch-events/) is quite flexible in its low-level implementation for dealing with multi-touch interaction, it means that the higher level gestures we use daily in our web apps can take [quite a lot of work](http://alxgbsn.co.uk/2011/08/16/event-delegation-for-touch-events-in-javascript/) for developers to implement themselves, even down to the basic ‘tap’ event. Many mobile web frameworks already offer support for such gestures, but if your app does not use or require such a framework, something as simple as a 'tap' plugin can become a necessity on nearly every mobile project.

[Tap.js](https://github.com/alexgibson/tap.js) is a simple, lightweight plugin for a common ‘tap’ gesture. It has no dependencies and can be used just like any regular JavaScript event, along with standard event listener syntax. It also falls back to using regular mouse events when touch is not supported, so you don't need to manually feature detect or provide two different event types in your code.

Installation
------------

Please see the [GitHub repo](https://github.com/alexgibson/tap.js) for setup instructions.

Usage
-----

First, include the main JavaScript file in the `<head>` of your HTML document:

{% highlight html %}
<script src="tap.js"></script>
{% endhighlight %}

Next create a new Tap instance, passing the element you want to use:

{% highlight javascript %}
var el = document.getElementById('my-id'),
    myTap = new Tap(el);
{% endhighlight %}

You can then start listening for 'tap' events using the regular JavaScript event listener syntax:

{% highlight javascript %}
el.addEventListener('tap', tapDidOccur, false);
function tapDidOccur (e) {
    //your code
}
{% endhighlight %}

You can stop listening for tap events like so:

{% highlight javascript %}
el.removeEventListener('tap', tapDidOccur, false);
{% endhighlight %}

Browser support
---------------------------------------

Please see the [GitHub readme](https://github.com/alexgibson/tap.js/#supported-web-browsers) for up to date browser support details.
