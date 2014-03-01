---
layout: post
title: Concierge - A responsive UI component for installing Open Web Apps.
titleinfo: Alex Gibson
desc: A JavaScript plugin for installing Open Web Apps via the browser.
---

[Concierge](https://github.com/alexgibson/concierge) is a responsive UI component for installing [Open Web Apps](https://developer.mozilla.org/en-US/docs/Web/Apps) via the browser. It creates an automated "install" button that can be used in any web app, using app manifest meta data to populate the UI.

Features
----------

* Displays the app name and icon as part of the install button UI.
* Only shows on browsers that support installable Open Web Apps.
* Button will only appear if the app has not yet been installed on a device.

Try the demo below on Firefox OS, Firefox for Android, or Firefox for desktop (Nightly recommended).

Demo: [https://alexgibson.github.com/concierge](https://alexgibson.github.com/concierge)

Installation
---------------------------------------

* Download: [zip](https://github.com/alexgibson/concierge/archive/master.zip)
* [Bower](https://github.com/twitter/bower/): `bower install concierge`
* Git: `git clone https://github.com/alexgibson/concierge.git`

Setup
---------

This component can be used as an AMD module, or a global.

{% highlight javascript %}
var Concierge = require('concierge');
{% endhighlight %}

To use create a new `Concierge` instance, passing the relevant callbacks you need.

{% highlight javascript %}
var install = new Concierge({
    onSuccess: successCallback,
    onError: errorCallback
});

function successCallback () {
    console.log('App installed!');
}

function errorCallback (error) {
    console.error('Concierge() error: ' + error);
}
{% endhighlight %}

Also make sure to include the CSS styles in your template.

{% highlight css %}
<link type="text/css" rel="stylesheet" href="concierge.css" />
{% endhighlight %}

Supported web browsers
----------------------

Open Web Apps are currently supported by Firefox OS, Firefox for Android and Firefox for desktop (Nightly recommended).

License
-------

Concierge is released under open source [MIT License](https://github.com/alexgibson/concierge/blob/master/LICENSE.md).
