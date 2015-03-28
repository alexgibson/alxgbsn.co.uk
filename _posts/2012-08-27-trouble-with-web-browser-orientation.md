---
layout: post
title: Trouble with web browser orientation
titleinfo: Alex Gibson
desc: A look at the current methods available to determine browser orientation, and details some of the problems found along the way.
---

In a sensible world, determining web browser orientation on mobile and tablet devices should be as straight forward as querying a property such as `window.orientation` and hoping for a value such as `portrait` or `landscape` to get returned. Unfortunately, the harsh reality of current API's and web browser inconsistencies makes the process way more complicated than it should be.

This post takes a look at the current methods available to web developers to determine browser orientation, and details some of the problems found along the way.

window.orientation
------------------

`window.orientation` is supported on iOS and by the majority of Android devices on the market today. When queried, the property will return a number based on the degrees of rotation from a device's *default orientation*.

{% highlight javascript %}
onOrientationChange: function () {
    switch(window.orientation) {
    case 0:
        //default orientation
        break;
    case 90:
        //90 degrees clockwise from default
        break;
    case -90:
        //90 degrees anti-clockwise from default
        break;
    case 180:
        //180 degrees from default
        break;
    }
}
{% endhighlight %}

Unfortunately, there are a lot of [common misconceptions](http://www.matthewgifford.com/2011/12/22/a-misconception-about-window-orientation/) about what these values represent. For example, a value of `0` degrees does not necessarily mean `portrait`, as it depends on which orientation is considered to be *default* by the manufacturer. Some tablet browsers, such as the iPad, will use `0` for portrait. Some Android tablets, such as the Xoom, use `0` for landscape.

I have seen certain mobile web frameworks fall at this first hurdle, by assuming all browsers and devices share the same implementation as iOS Safari. It is the framework assumptions here that are at fault, not the browser implementation.

So just how do we check if a device is being held in portrait or landscape? We could just check `window.innerWidth` and `window.innerHeight` when the `orientationchange` event fires, right?

{% highlight javascript %}
onOrientationChange: function () {
    this.orientation = window.innerHeight >= window.innerWidth ? 'portrait' : 'landscape';
}
{% endhighlight %}

Well, sadly no…

Here come the Android quirks
----------------------------

Unfortunately, some Android browsers seem to fire `orientationchange` before the window `resize` event, so checks for `window.innerWidth` and `window.innerHeight` can be reported incorrectly on some devices. A `setTimeout` can help, but it is not really reliable as the time it takes for these values to change seems to vary from device to device.

window.onresize
---------------

The next alternative is to use the window `resize` event instead. This will surely work reliably, right? Well yes, kind of. But with another inevitable Android catch:

Android 4.x stock browser fires `resize` whenever the on-screen keyboard is shown. Depending on the height of the keyboard and size of screen, this can result in `window.innerWidth` being greater than `window.innerHeight`, causing in an incorrect orientation to be reported. In order to combat this `resize` event triggering an unwanted change in orientation, it is necessary to store the previous orientation and check that `window.innerWidth` has actually changed. If only `window.innerHeight` changes,  then the keyboard is likely visible.

{% highlight javascript %}
onResize: function () {
    if (window.innerWidth !== this.previousWidth) {
        this.orientation = window.innerHeight >= window.innerWidth ? 'portrait' : 'landscape';
    }
}
{% endhighlight %}

CSS Media Queries and window.matchMedia
---------------------------------------

As a side note, this `resize` event behaviour on Android 4.x stock browser will also trigger CSS orientation media queries, such as:

{% highlight css %}
@media screen and (orientation:portrait) {

}

@media screen and (orientation:landscape) {

}
{% endhighlight %}

This can lead to unintentional styles being applied when the keyboard is visible, unless developers specify `min-width` or another attribute that must also satisfy the media query. Any JavaScript checks using `window.matchMedia` will also be affected in the same manner.

Other clever hacks
------------------

There are some other solutions out there for determining browser orientation, including this [clever hack](http://fettblog.eu/blog/2012/04/16/robust-but-hacky-way-of-portraitlandscape-detection/) that uses CSS Media Queries, but does not rely on `window.matchMedia` being supported.

Conclusion
----------

Given that `window.orientation` is not really all that useful, and `resize` event behaviour can differ significantly between browsers, we still lack a robust API to report device orientation accurately. For such a basic feature that is commonly needed today, it is pretty ridiculous that a task like this proves to be so overly complicated.
