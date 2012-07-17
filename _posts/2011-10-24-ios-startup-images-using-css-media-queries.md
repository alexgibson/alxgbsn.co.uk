---
layout: post
title: iOS startup images using CSS media queries
desc: How to serve correctly sized iOS startup images for home screen web apps using CSS media queries
---

Ever since the arrival of the iPad and iPhone 4, serving correctly sized `apple-touch-startup-images` for iOS web apps has been somewhat clumbersome, especially if you wish to cater for every type of iOS device.

A common solution has been to use JavaScript to detect what device the user is on, and then to write the correct image into the `<head>` of your HTML file.

{% highlight javascript %}
(function () {
	var filename;
	if (navigator.platform === 'iPad') {
		filename = window.orientation === 90 || window.orientation === -90 ? 'splash-1024x748.png' : 'splash-768x1004.png';
	} else {
		filename = window.devicePixelRatio === 2 ? 'splash-640x920.png' : 'splash-320x460.png';
	}
	document.write('<link rel="apple-touch-startup-image" href="' + filename + '"/>' );
})();
{% endhighlight %}

To make things more complicated, you also need to serve a high-res startup image for the iPhone 4's retina display. The iPad requires two different splash screen images for each orientation as well. Things quickly start to get a bit messy…

As of iOS5, you can now use CSS Media Queries to serve each type of startup image required, so no need for JavaScript anymore!

Just use any of the following media queries in the `<head>`of your HTML file.

{% highlight html %}
<!-- 320x460 for iPhone 3GS -->
<link rel="apple-touch-startup-image" media="(max-device-width: 480px) and not (-webkit-min-device-pixel-ratio: 2)" href="startup-iphone.png" />
<!-- 640x920 for retina display -->
<link rel="apple-touch-startup-image" media="(max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2)" href="startup-iphone4.png" />
<!-- iPad Portrait 768x1004 -->
<link rel="apple-touch-startup-image" media="(min-device-width: 768px) and (orientation: portrait)" href="startup-iPad-portrait.png" />
<!-- iPad Landscape 1024x748 -->
<link rel="apple-touch-startup-image" media="(min-device-width: 768px) and (orientation: landscape)" href="startup-iPad-landscape.png" />
{% endhighlight %}

Caveat
------

The only drawback to this CSS only method is that every image seems to be downloaded, regardless of which one is used on the device. If your application is supporting both iPhone and iPad, it may be worth using the JavaScript solution still. But the choice is yours to make, depending on the number of files and their respective sizes. Hopefully Apple will eventually support another solution to serving the correct file, such as using the `sizes` attribute.