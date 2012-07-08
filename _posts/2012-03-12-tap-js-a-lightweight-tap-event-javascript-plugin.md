---
layout: post
title: Tap.js - A lightweight ‘tap’ event JavaScript plugin
---

While the [W3C touch events API](http://www.w3.org/TR/touch-events/) is quite flexible in its low-level implementation for dealing with multi-touch interaction, it means that the higher level gestures we use daily in our web apps can take [quite a lot of work](http://miniapps.co.uk/blog/post/event-delegation-for-touch-events-in-javascript/) for developers to implement themselves, even down to the basic ‘tap’ event. Many mobile web frameworks already offer support for such gestures, but if your app does not use or require such a framework, something as simple as a 'tap' plugin can become a necessity on nearly every mobile project.

[Tap.js](https://github.com/alexgibson/tap.js) is a simple, lightweight plugin for a common ‘tap’ gesture. It has no dependencies and can be used just like any regular JavaScript event, along with standard event listener syntax. It also falls back to using regular mouse events when touch is not supported, so you don't need to manually feature detect or provide two different event types in your code.

Setup
-----

First, include the main JavaScript file in the <head> of your HTML document:

	<script src="tap.js"></script>

Next create a new Tap instance, passing the element you want to use:

	var el = document.getElementById('my-id'),
    	myTap = new Tap(el);
    	
You can then start listening for 'tap' events using the regular JavaScript event listener syntax:

	el.addEventListener('tap', tapDidOccur, false); 
	function tapDidOccur (e) {
    	//your code
    }
    
You can stop listening for tap events like so:

	el.removeEventListener('tap', tapDidOccur, false);
	
Tap.js is open source and available on [GitHub](https://github.com/alexgibson/tap.js).

Tested browsers
---------------

* iOS Safari (5.1)
* Android default browser (2.3.5)
* Opera Mobile 11.50 (Android)
* BlackBerry Playbook (1.0.8.6067)
* HP webOS 2.1.0 (click fallback)
* All modern desktop browsers (click fallback)