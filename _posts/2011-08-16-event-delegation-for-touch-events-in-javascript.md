---
layout: post
title: Event delegation for touch events in JavaScript
desc: A bare-bones example of how to perform event delegation for touch events in mobile web browsers
---

Anyone who has experience developing web applications on mobile devices will have no doubt encountered the 300ms delay when firing `click` events in web browsers such as Mobile Safari. There are some useful [standalone plugins](https://github.com/cheeaun/tappable) and [informative articles](http://code.google.com/mobile/articles/fast_buttons.html) to help combat this delay, but this post aims to show a super quick example of how to do simulated 'tap' events on dynamic content using JavaScript event delegation.

A common technique when dealing with `click` events in dynamic content is to use event delegation to capture events bubbling up through the DOM. This same technique can be applied to touch events, although it is a little more difficult since there are at least four different events to capture; `touchstart`, `touchmove`, `touchend` and `touchcancel`.

Here's a very basic example of how to capture a simulated 'tap' event:

{% highlight javascript %}
var tapArea, moved, startX, startY;

tapArea = document.getElementById('list'); //element to delegate
moved = false; //flags if the finger has moved
startX = 0; //starting x coordinate
startY = 0; //starting y coordinate

//touchstart
tapArea.ontouchstart = function(e) {

    moved = false;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
};

//touchmove
tapArea.ontouchmove = function(e) {

    //if finger moves more than 10px flag to cancel
    //code.google.com/mobile/articles/fast_buttons.html
    if (Math.abs(e.touches[0].clientX - startX) > 10 ||
        Math.abs(e.touches[0].clientY - startY) > 10) {
            moved = true;
    }
};

//touchend
tapArea.ontouchend = function(e) {

    e.preventDefault();

    //get element from touch point
    var element = e.changedTouches[0].target;

    //if the element is a text node, get its parent.
    if (element.nodeType === 3) {
        element = element.parentNode;
    }

    if (!moved) {
        //check for the element type you want to capture
        if (element.tagName.toLowerCase() === 'label') {
            console.log('tap!');
        }
    }
};

//don't forget about touchcancel!
tapArea.ontouchcancel = function(e) {

    //reset variables
    moved = false;
    startX = 0;
    startY = 0;
};
{% endhighlight %}

Notice here it is useful to make use of `touchmove` to detect any finger dragging gestures that might occur after a `touchstart` has fired. This way it is easy to cancel the 'tap' on `touchend` if desired.

Update: Originally this article was using the function `document.elementFromPoint(x,y)` to get the element target in `ontouchend`. A few people have kindly pointed out that you can actually just use `e.changedTouches[0].target` or even `e.target` to get the same result for a simple 'tap'. It should be noted however, that the target in this case always refers to the originating element, so if you do need to reference an element a finger might have moved on/off during `touchmove` or `touchend`, you would still need to use:

{% highlight javascript %}
document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
{% endhighlight %}

Life would be so much easier if we had a native 'tap' event in mobile browsers!
