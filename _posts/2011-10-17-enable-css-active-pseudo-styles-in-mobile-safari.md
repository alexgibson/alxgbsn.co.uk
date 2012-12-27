---
layout: post
title: Enable CSS active pseudo styles in Mobile Safari
titleinfo: Alex Gibson
desc: A single line JavaScript hack to enable CSS active pseudo styles in iOS Mobile Safari
---

By default Mobile Safari disables CSS active pseudo styles on web pages, instead opting for a generic tap–highlight colour on clickable elements. A little known trick is that you can easily re-enable your active pseudo styles by declaring a `touchstart` event on the page. You don't even need to actually use the event, simply declaring an empty function will suffice.

Just add the following single line of JavaScript to your web page and all your active CSS styles will spring to life.

{% highlight javascript %}
document.addEventListener("touchstart", function() {},false);
{% endhighlight %}

Note: if you do this trick it is also worth removing the default `tap–highlight` colour Mobile Safari applies using the following CSS rule.

{% highlight css %}
html {
	-webkit-tap-highlight-color: rgba(0,0,0,0);
}
{% endhighlight %}

On a related note, there are also some other useful mobile Webkit oddities that can activated by using empty event declarations, like [making form labels clickable](http://krijnhoetmer.nl/stuff/javascript/label-checkbox-ios/).