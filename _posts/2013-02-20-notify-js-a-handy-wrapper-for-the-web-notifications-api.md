---
layout: post
title: Notify.js - A handy wrapper for the Web Notifications API
titleinfo: Alex Gibson
desc: A JavaScript plugin that provides a simplified wrapper for using the Web Notifications API.
---

I recently spent some time getting to grips with the [Web Notifications API](http://www.w3.org/TR/notifications/), which is currently supported in Chrome, Safari 6, and just recently in Firefox. It enables you to create growl-style notifications for web applications, and if you're on OSX it integrates really nicely with Notification Centre. 

I wanted to create something that I could easily resuse in different projects, so I wrote a JavaScript plugin called [Notify.js](https://github.com/alexgibson/notify.js) that acts as a simplified wrapper for the API. 

Notify.js automatically handles requesting user permission and associated Web Notification API events, as well as adding a few extra convenience methods.

There is a simple [online demo here](http://alxgbsn.co.uk/notify.js/). Installation and setup instructions are as follows:

Installation
---------------------------------------

* Download: [zip](https://github.com/alexgibson/notify.js/zipball/master)
* [Bower](https://github.com/twitter/bower/): `bower install notify.js`
* Git: `git clone https://github.com/alexgibson/notify.js`

Setup
---------

This component can be used as an AMD module, or a global.

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

* title (string) - notification title

Optional parameters
-------------------

* body: (string) - notification message body.
* icon: (string) - path for icon to display in notification.
* tag: (string) - unique identifier to stop duplicate notifications.
* notifyShow: (function) - callback when notification is shown.
* notifyClose: (function) - callback when notification is closed.
* notifyClick: (function) - callback when notification is clicked.
* notifyError: (function) - callback when notification throws an error.
* permissionDenied: (function) - callback when user has denied permission.

Useful methods
--------------

* `isSupported()` - (returns boolean) test for Web Notifications API browser support.

Testing
-------

Install [Node](http://nodejs.org). Testing relies on the Karma test-runner, which can be installed globally using the following command.

```
npm install -g karma
```

In the project root, to perform a single pass of the tests using Firefox run:

```
npm test
```

Browser support
---------------------------------------

- Chrome
- Safari
- Firefox
- Firefox Mobile (Android)


License
-------

Notify.js is released under open source [MIT License](https://github.com/alexgibson/notify.js/blob/master/LICENSE.md).
