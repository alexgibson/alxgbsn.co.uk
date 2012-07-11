---
layout: post
title: Serving iOS retina startup images for the new iPad
---

In the past we have touched on how to serve iOS startup images for full screen web apps using both [CSS media queries and JavaScript](http://alxgbsn.co.uk/2011/10/24/ios-startup-images-using-css-media-queries/) techniques. Now that the latest iPad sports a retina calibre display, we must again look at the best way to serve startup images in our web apps.

Given the potential bandwidth cost incurred by downloading such large images (2048 x 1496 landscape, 1536 x 2006 portrait), the most advisable technique is to use JavaScript to serve only the assets a device requires (rather than downloading every asset, which would happen if we used media queries). This can be done using the following code snippet in the `<head>` of your page.

{% highlight javascript %}
(function(){
    var p, l, r = window.devicePixelRatio;
	if (navigator.platform === "iPad") {
    	p = r === 2 ? "img/startup-tablet-portrait-retina.png" : "img/startup-tablet-portrait.png";
    	l = r === 2 ? "img/startup-tablet-landscape-retina.png" : "img/startup-tablet-landscape.png";
    	document.write('<link rel="apple-touch-startup-image" href="' + l + '" media="screen and (orientation: landscape)"/><link rel="apple-touch-startup-image" href="' + p + '" media="screen and (orientation: portrait)"/>');
    } else {
    	p = r === 2 ? "img/startup-retina.png": "img/startup.png"; 
    	document.write('<link rel="apple-touch-startup-image" href="' + p + '"/>');
    }
})();
{% endhighlight %}

It would be nice if Apple would provide a better way to do this rather than having to rely on JavaScript. Perhaps in the future we will be able to have the option to use vector formats, such as SVG for startup images?