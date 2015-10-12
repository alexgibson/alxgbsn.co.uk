---
layout: post
title: Notify.js - A handy wrapper for the Web Notifications API
titleinfo: Alex Gibson
desc: A JavaScript plugin that provides a simplified wrapper for using the Web Notifications API.
---

I recently spent some time getting to grips with the [Web Notifications API](http://www.w3.org/TR/notifications/), which is currently supported in Chrome, Safari 6, and just recently in Firefox. It enables you to create growl-style notifications for web applications, and if you're on OSX it integrates really nicely with Notification Centre.

I wanted to create something that I could easily reuse in different projects, so I wrote a JavaScript plugin called [Notify.js](https://github.com/alexgibson/notify.js) that acts as a simplified wrapper for the API.

Notify.js aims to simplify requesting user permission and associated Web Notification API events, as well as providing a few extra callbacks and convenience methods.

There is a simple [online demo here](https://alexgibson.github.io/notify.js). Installation and setup instructions are as follows:

Installation
------------

Please see the [GitHub repo](https://github.com/alexgibson/notify.js) for setup instructions.

Usage
-----

To initialize a web notification create a new `Notify` instance, passing the message `title` as well as any other options you wish to use.

{% highlight javascript %}
var myNotification = new Notify('Yo dawg!', {
    body: 'This is an awesome notification',
    notifyShow: onNotifyShow
});

function onNotifyShow() {
    console.log('notification was shown!');
}
{% endhighlight %}

Then show the notification.

{% highlight javascript %}
myNotification.show();
{% endhighlight %}

Required parameters
-------------------

* `title` (string) - notification title

Optional parameters
-------------------

* `body`: (string) - notification message body
* `icon`: (string) - path for icon to display in notification
* `tag`: (string) - unique identifier to stop duplicate notifications
* `timeout`: (integer) - number of seconds to close the notification automatically
* `notifyShow`: (function) - callback when notification is shown
* `notifyClose`: (function) - callback when notification is closed
* `notifyClick`: (function) - callback when notification is clicked
* `notifyError`: (function) - callback when notification throws an error
* `permissionGranted`: (function) - callback when user has granted permission
* `permissionDenied`: (function) - callback when user has denied permission

Static methods
--------------

* `Notify.needsPermission()` - (returns boolean) check is permission is needed for the user to receive notifications.
* `Notify.requestPermission()` - requests permission from the user if needed and handles permission callbacks.
* `Notify.isSupported()` - (returns boolean) test for Web Notifications API browser support

A note about Chrome
-------------------

Unlike other browsers that implement the Web Notification API, Chrome does not permit requesting permission on page load (it must be as a result of user interaction, such as a `click` event). You can find out more in the [Chromium bug for this issue](https://code.google.com/p/chromium/issues/detail?id=274284).

Testing
-------

Install [Node](http://nodejs.org). Testing relies on the Karma test-runner, which can be installed globally using the following command.

    npm install -g karma

In the project root, to perform a single pass of the tests using Firefox run:

    npm test

Browser support
---------------------------------------

Please see the [GitHub readme](https://github.com/alexgibson/notify.js/#browser-support) for up to date browser support details.
