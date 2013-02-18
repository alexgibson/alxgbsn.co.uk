---
layout: post
title: Notify.js - A handy wrapper for the Web Notifications API
titleinfo: Alex Gibson
desc: A JavaScript plugin that provides a simplified wrapper for using the Web Notifications API.
---

I recently spent some time getting to grips with the [Web Notifications API](http://www.w3.org/TR/notifications/), which is currently supported in both Chrome and Safari 6. It enables you to create growl-style notifications for web applications, and if you're on OSX it integrates really nicely with Notification Centre. 

I wanted to create something that I could easily resuse in different projects, so I wrote a JavaScript plugin called [Notify.js](https://github.com/alexgibson/notify.js) that acts as a simplified wrapper for the API. It automatically handles aspects such as requesting user permission and API level events, allowing you to quickly create notifications and register callbacks for the events you want.

There is a simple [online demo here](http://alxgbsn.co.uk/notify.js/). Installation and setup instructions are as follows:

Installation
---------------------------------------

* Download: [zip](https://github.com/alexgibson/notify.js/zipball/master)
* [Bower](https://github.com/twitter/bower/): `bower install notify.js`
* Git: `git clone https://github.com/alexgibson/notify.js`

Setup
---------

First, include the main notify.js JavaScript file in your HTML document:

{% highlight html %}
<script src="notify.js"></script>
{% endhighlight %}

Next create a new Notify instance, passing the relevant message parameters and callbacks you want to use:

{% highlight javascript %}
var myNotification = new Notify('Yo dawg!', {
	body: 'This is an awesome notification', 
	notifyShow: myApp.onShowNotification, 
	notifyClose: myApp.onCloseNotification, 
	notifyClick: myApp.onClickNotification, 
	notifyError: myApp.onErrorNotification
});

function onNotifyShow() {
	console.log('notification was shown!');
}
{% endhighlight %}

To then show your notification, you can simply call:

{% highlight javascript %}
myNotification.show(); 
{% endhighlight %}

Notify.js will automatically handle requesting user permission and the associated API events for you. It also goes some way toward bridging the gap between the current WebKit implementation and what's in the official W3C specification.

Required parameters
-------------------

* title (string) - notification title

Optional parameters
-------------------

* body: (string) - notification message body
* notifyShow: (function) - callback when the notification is shown
* notifyClose: (function) - callback when the notification is closed
* notifyClick: (function) - callback when the notification is clicked
* notifyError: (function) - callback when there is a permission error

Supported web browsers
----------------------

- Chrome
- Safari 6

Browsers that do not yet support the Web Notification API will simply report a console warning instead of showing a notification. This plugin will be kept up to date as more browsers add support for the API and as the spec changes.

License
-------

Notify.js is released under open source [MIT License](https://github.com/alexgibson/notify.js/blob/master/LICENSE.md).