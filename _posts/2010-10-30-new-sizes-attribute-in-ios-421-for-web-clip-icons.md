---
layout: post
title: New sizes attribute in iOS 4.2.1 for web clip icons
---

A small but relatively undiscovered new feature in iOS 4.2.1 is the new ['sizes' attribute](http://developer.apple.com/library/safari/#documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) for defining different sized web clip icons. This new attribute allows you to cater for different device resolutions on iOS when publishing home screen icons for your websites. Here's an example:

	<link rel="apple-touch-icon" href="touch-icon-iphone.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="touch-icon-ipad.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="touch-icon-iphone4.png" />

Now what we really need is for this new attribute to also work on <code>apple-touch-startup-image</code>, so we can finally define different resolution startup images.