---
layout: post
title: Making web content more accessible with iOS VoiceOver
titleinfo: Alex Gibson
desc: An overview of using VoiceOver with iOS Safari and tips on how to make your web content more accessible
---

If you're a web developer and own an iOS device, you may have noticed it comes with a whole range of accessibility features. One such feature is a built-in screen reader for visually impaired users, called VoiceOver. For a touch screen device, VoiceOver is a wonderfully capable piece of assistive technology, and a very useful tool that you can use to help test the accessibility of your web content.

This article gives an introduction to using VoiceOver on iOS, followed by some basic tips to help improve the accessibility of your web content. While covering iOS specifically for example's sake, many of these tips are also applicable to improving accessibility for screen reader users in general.

Navigating a web page using VoiceOver on iOS
--------------------------------------------

You can enable VoiceOver on iOS by going to: Settings -> General -> Accessibility -> VoiceOver.

Using VoiceOver at its most basic level involves selecting an item by touching it, activating a selected item by double-tap, and scrolling by flicking three fingers. You can also swipe left/right to navigate through content elements in the natural order of your page’s markup. For quick page navigation, you can swipe up/down to jump through predefined sections of web content, such as headings, links, words, lines and even landmark roles. These pre-defined options are selected via a feature known as Rotator. A user can cycle through Rotator settings using a two finger rotation gesture anywhere on screen. The selected option is then read aloud as you rotate your fingers.

Aside from regular click events which operate using double-tap, touch events operate a little differently with iOS VoiceOver, since they rely on dragging the finger and not just tapping. If a web page features an element that has a touch event associated with it, the user must double-tap & hold on the element until an audible sound effect of three small tones is heard. Once the tones have played, VoiceOver then allows a touch gesture to be performed and ignores all other actions until the finger is next released. At this point VoiceOver returns back to it's normal state.

This may sound like a lot to remember at first, but VoiceOver is actually very simple to use and feels very intuitive after just a few sessions. Give it a go before reading on and try to familiarize yourself with the gestures.

There is a nice [introduction to VoiceOver on the iPhone](http://www.apple.com/accessibility/iphone/vision.html) over on Apple's website for some more in-depth examples and other features not covered here.

Using WAI-ARIA landmark roles
-----------------------------

As you will have discovered after trying VoiceOver, one of the fastest ways to navigate through a large web page is to use the Rotator feature. If your web pages use well structured headings and markup, then your pages should already be relatively easy to navigate. A nice additional feature you can take advantage of however, is the use of [WAI-ARIA landmark roles](http://www.w3.org/WAI/PF/aria-practices/). These role attributes enable screen reader users to quickly jump to predefined sections of a web page, and these can be accessed by VoiceOver using the Rotator 'landmark' option.

Here's some basic HTML5 markup for a common web page complete with landmark roles:

{% highlight html %}
<header role="banner">
    <h1>Page heading</h1>
</header>

<div role="main">
    <section role="region">
        <h2>Sub heading 1</h2>
     </section>
    <section role="region">
        <h2>Sub heading 2</h2>
    </section>
</div>

<footer role="contentinfo">
     <h4>Footer title</h4>
</footer>
{% endhighlight %}

Note: as of iOS 4.3 the 'landmark' option is not included as a default rotator setting, and must be selected first in the general accessibility options. iOS does not currently read out the landmark types either, it just simply describes each as 'landmark start' and 'landmark end'.

Hiding and showing content
--------------------------

Because many client-based web applications are often just single page controllers that hide and show content when switching between views, it is important to make sure that only visible content is accessible to screen readers. If you can't visually see something on screen, then (usually) it should be hidden from assistive technologies as well. Some mobile web applications simply slide elements in and out of the viewport when transitioning between screens. This can be problematic since elements that are not visible can still be read out and accessed by VoiceOver.

You can hide an HTML element from screen readers by setting the `aria-hidden` attribute to true. Likewise, setting the value to false will un-hide the element again.

{% highlight javascript %}
document.querySelector('#panel').setAttribute('aria-hidden', 'true'); //not visible
document.querySelector('#panel').setAttribute('aria-hidden', 'false'); //visible
{% endhighlight %}

If you wish to visually hide the content as well, you can also take advantage of this attribute to set the element's `display` property in CSS like so.

{% highlight css %}
#panel[aria-hidden="true"] { display: none; }
#panel[aria-hidden="false"] { display: block; }
{% endhighlight %}

Note here we are only changing the `display` property for the element `#panel` and not simply for every element that might have `aria-hidden` applied. There are situations where you might want content hidden from screen readers, but still visible on screen. Take for example, if your website creates a floating dialog box that is displayed on top of the existing page. In this case the content is still visible behind the dialog box, but should not be accessible until the user responds and the dialog box is closed. Here you might want to apply `aria-hidden` to the page behind, but not actually change the `display` property.

Making faux-buttons behave like buttons
---------------------------------------

While it is advisable to use a native HTML `<button>` element wherever possible, sometimes you may want to (for stylistic reasons) make a non-interactive HTML element such as a `<div>`, act like a button.

{% highlight html %}
<div id="my-button">Button text</div>
{% endhighlight %}

It is important to make sure this behaves like an interactive element to VoiceOver, so assign a `role` attribute of type `button` to the element. The role attribute will enable VoiceOver to verbally identify the element just as it would do a native HTML `<button>`.

{% highlight html %}
<div id="my-button" role="button">Button text</div>
{% endhighlight %}

Now that VoiceOver identifies the element as a button and not just a piece of text, it makes it much clearer how the user should interact with this element and that they should and double-tap to activate it.

Providing textual descriptions for icons
----------------------------------------

It is common to use visual icons to represent actions that buttons perform on mobile devices. Icons have the advantage of saving valuable screen space and are often universally understood. For assistive technologies, it is still important to provide a textual alternative. Take for example the following faux-button that does not contain any inner text.

{% highlight html %}
<div id="edit-button" role="button"></div>
{% endhighlight %}

Here we must use another piece of HTML markup that is visible to assistive technologies, in order to provide a textual label.

{% highlight html %}
<p class="hide" id="edit-label">Edit item</p>
{% endhighlight %}

We can then link the button with the textual label using the `aria-labelledby` attribute on our faux-button.

{% highlight html %}
<div id="edit-button" role="button" aria-labelledby="edit-label"></div>
{% endhighlight %}

In order to hide the textual label visually on the screen, but not from assistive technology, we can position the label off screen.

{% highlight css %}
.hide {
	position: absolute;
	top: -20em;
	left: -200em;
}
{% endhighlight %}

When VoiceOver gains focus on the element, it will now read out the label, before describing the role.

Final Note
----------

These are just a few basic things that you can do to help improve the accessibility of your web content for VoiceOver on iOS. Mobile specific content is sadly often forgotten when it comes to accessibility, since many still regard it as not having the right tools available to assist people. It is a good thing that iOS uses the same underlying technology as VoiceOver for Mac OSX, because if you're building accessible content for the web, then you're already well on the way to providing a great experience on iOS too.