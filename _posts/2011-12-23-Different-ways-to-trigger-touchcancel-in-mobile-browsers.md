---
layout: post
title: Different ways to trigger touchcancel in mobile browsers
---

The `touchcancel` event is often neglected when building touch–interfaces using JavaScript. Historically, browsers vendors have never really published documentation detailing the circumstances as to when this event gets fired, and hence it has always been associated with a level of obscurity by many developers. The aim of this post is to try and shed some light on the matter.

Apple originally created touch events for iOS Safari, which have since been adopted as a basis for the [W3C Touch Events Specification](http://www.w3.org/TR/2011/WD-touch-events-20110505/). The original [Safari DOM Additions Reference](http://developer.apple.com/library/safari/#documentation/UserExperience/Reference/TouchEventClassReference/TouchEvent/TouchEvent.html%23//apple_ref/doc/uid/TP40009358) documentation provides very little information on `touchcancel`:

> Sent when the system cancels tracking for the touch.

Thankfully, the W3C Touch Events specification [gives us a bit more detail](http://www.w3.org/TR/2011/WD-touch-events-20110505/#the-touchcancel-event), including some situations where the event should occur:

> A user agent must dispatch this event type to indicate when a touch point has been disrupted in an implementation-specific manner, such as a synchronous event or action originating from the UA canceling the touch, or the touch point leaving the document window into a non-document area which is capable of handling user interactions. (e.g. The UA's native user interface, plug-ins) A user agent may also dispatch this event type when the user places more touch points on the touch surface than the device or implementation is configured to store, in which case the earliest Touch object in the TouchList should be removed.

From this description we can begin to understand `touchcancel` with regard to browser behaviour a little better. It not only helps the browser keep accurate references to active `Touch` objects in the `TouchList`, but it can also be used by developers to carry out UI specific tasks, such as reseting any variables used during `touchstart` or `touchmove`. In the event that the system cancels tracking and the `touchend` event does not fire, `touchcancel` saves the day.

But when do browsers actually trigger this event? To start investigating, it was necessary to build a simple event logger to track all touch events. The test features a touch-area and logs the last touch event fired, making it easier to see exactly what kind of interactions result in a `touchcancel`.

What follows is a list of findings for various mobile web browsers. It is interesting to note that `touchcancel` is not very predictable, especially on Android (2.3.5). But even on iOS5 you cannot always correctly guess what will trigger a `touchcancel`.

iOS Safari 5.0.1 (iPhone 4 & iPad 1)
------------------------------------

Actions that do trigger touchcancel during a touchstart or touchmove event:

* User presses the home button.
* User presses the action button in Safari's bottom toolbar.
* User presses/smears the palm of their hand on the screen, creating no discernible single touch points (iPhone only?).
* User presses the lock button.
* User initiates a gesture using four or more simultaneous touch points on iPad and Multitasking Gestures are enabled in system preferences.

Actions that do not trigger `touchcancel` during a `touchstart` or `touchmove` event:

* User presses the bookmark button in Safari's bottom toolbar.
* User presses the back or forward history buttons in Safari's bottom toolbar.
* User taps to focus on the Safari search bar.
* User rotate's the device orientation.
* Popup notification such as WiFi locator or Clock timer alert appears on screen.
* New iOS5 style notification appears at top of the screen.
* User opens a new tab (iPad).
* User refreshes the page.
* User presses the volume buttons.
* User switches the device onto silent/vibrate.
* User receives a phone call.

In some of these circumstances the browser will simply fire a `touchend` instead of `touchcancel`. In others situations (such as the old–style popup notifications), `touchstart` or `touchmove` will remain active (even while the content is hidden underneath the notification), until the user releases their finger, at which point `touchend` is fired.

Notable iOS5 system functions that will not activate during a `touchstart` or `touchmove` event:

* User cannot focus on the Safari address bar.
* User cannot open a new page (iPhone).
* User cannot double–tap the home button to open the app tray.
* User cannot swipe down from the top of screen to open notification centre.
* User cannot tap on a new iOS5 style notification when it appears at the top of the screen.

Android 2.3.5 (Samsung Galaxy Y GT-S5363) stock browser
-------------------------------------------------------

Actions that do trigger `touchcancel` during a `touchstart` or `touchmove` event:

* User presses the lock button.
* Appears to fire randomly for no immediately obvious reason. This is especially noticeable when performing repeated quick taps and swipes.

Actions that do not trigger `touchcancel` during a `touchstart` or `touchmove` event:

* User presses the home button.
* User rotate's the device orientation.
* User presses the volume buttons.

Notable Android 2.3.5 system functions that will not activate during a `touchstart` or `touchmove` event:

* User cannot press the menu or back buttons.
* User cannot open notifications menu.
* User cannot focus on the browser address bar.
* User cannot tap the bookmarks button.

Opera Mobile
------------

Opera Mobile 11.50 for Android was also tested. While the browser appears to have support for `touchcancel`, it does not actually seem to fire the event. In the case of pressing the home button for example, Opera Mobile appears to immediately fire `touchend` instead.

BlackBerry Playbook (1.0.8.6067)
--------------------------------

Even though the browser reportedly supports the `touchcancel` event, it does not appear to get fired at all. Even when pressing the power button to put the device on standby, `touchcancel` is not fired. The same goes for pressing browser tool bar buttons, or focusing on the address bar. It is also worth noting that when performing a `touchstart` or `touchmove`, the Playbook does not respond to any bevel swipe gestures.

Conclusion
----------

It is appears from the tests that `touchcancel` is still a bit unpredictable. While it is easy enough to identify situations where it gets fired, there are often near identical situations where it does not. While the usefulness of this event is by no means in question, it seems like developers cannot yet rely on this event getting fired in all expected circumstances.

What is clear though, is that you cannot rely on `touchend` getting fired on every device. You need to write code that deals with `touchcancel`. This is especially true on the iPad for example, say if you're building a multi–touch app or multi–player HTML5 game. Since there is no way of telling if the user has enabled Multitasking Gestures, your app needs to handle `touchcancel` gracefully. The unpredictable nature of Android browser also demonstrates the importance of dealing with this event, as failure to do so will likely cause bugs in your UI.

So, next time you're writing your own touch events, don't forget about `touchcancel`. Despite the varying levels of browser support, it still comes in very handy when dealing with certain unexpected user interactions.