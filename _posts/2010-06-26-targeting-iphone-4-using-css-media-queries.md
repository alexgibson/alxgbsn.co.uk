---
layout: post
title: Targeting iPhone 4 using CSS Media Queries
titleinfo: Alex Gibson
desc: How to deliver high resolution web content for mobile devices using CSS Media Queries
---

With the release of iPhone 4 and it's 326ppi display, there has been a fair bit of speculation as to what impact this would have on mobile web apps and websites that are optimised for mobile screen sizes. How would web developers target both older iPhones with a 480x320 display, as well as the iPhone 4's 960x640 display? Would we need separate CSS stylesheets for each device? How would images need to be optimised for the new screens?

It turns out that CSS media queries targeting 320px screens still work on iPhone 4. It's all down to Mobile Safari utilising a 'device to pixel ratio' density of 2. There is actually a distinct difference between a device (screen) pixel and a pixel that we typically define in CSS. For example, when the iPhone 4 browser viewport is equal to the device width, 1 CSS pixel actually translates to 2x2 device pixels. For those interested, there is a quite old (but very relevant) Webkit article about [high dpi websites](http://webkit.org/blog/55/high-dpi-web-sites/). It makes for an interesting read.

This is largely good news for mobile web developers, as very little needs to be done to our mobile CSS stylesheets for iPhone 4. Device pixels are translated to CSS pixels automatically. But what about images? Well, this is where some work needs to be done. In order for images to look crisp on the new iPhone 4 display, we now need to serve images that have a higher ppi than the standard web traditionally uses. To do this, the iPhone 4 (and any other high ppi device) can be targeted using the following CSS media query (Notice I have included rules both with and without the -webkit venor prefix).

Update (07/10/11) - the code below has now been updated to include additional vendor prefix properties, that did not exist at the original time of publishing this article.

{% highlight css %}
/* High PPI Devices ----------- */
@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
only screen and (min--moz-device-pixel-ratio: 1.5),
only screen and (-o-device-pixel-ratio: 3/2), 
only screen and (min-device-pixel-ratio: 1.5) {
	/*high resolution images go here*/
}
{% endhighlight %}

I won't go into great detail on how to best serve images, but it basically involves creating images that are double the pixel size that you would traditionally need (e.g. a 100x50 pixel image translates to 200x100 pixels). You can then set the [background size in CSS](http://www.w3.org/TR/2002/WD-css3-background-20020802/#background-size) so the large images still take up the same number of CSS pixels as they would on a normal display. [Walt Dickinson](http://blog.iwalt.com/2010/06/targeting-the-iphone-4-retina-display-with-css3-media-queries.html) has already written a nice article that has some more info on how to do this.

Finally, one last tip – you can also test for the same value using using JavaScript:

{% highlight javascript %}
if (window.devicePixelRatio == 2) {
	//Targeted code goes here
}
{% endhighlight %}