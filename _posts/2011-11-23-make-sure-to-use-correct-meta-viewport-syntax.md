---
layout: post
title: Make sure to use correct meta viewport syntax
titleinfo: Alex Gibson
desc: An example of why you should be careful to define meta viewport values using the correct syntax
---

When browsing the web it's not uncommon to come across two slight variations on the syntax for declaring meta viewport content values. It's a bit unclear how the two variations originated, but it should be noted that only one is correct, and using an incorrect syntax can actually create problems on certain web browsers.

This is the correct syntax:

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
{% endhighlight %}

This is the incorrect syntax:

{% highlight html %}
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;" />
{% endhighlight %}

Notice the correct syntax uses comma separated values. The incorrect way is to use a semi-colon separator. There is also no real need for the separator on the last value, `user-scalable`.

So, why does all of this really matter? “It doesn't seem to make a difference on my iPad?” Well, maybe not — but it can and does make a difference on other devices. The recent [CSS Device Adaptation](http://dev.w3.org/csswg/css-device-adapt/) specification defines it, so real world implementations are now built toward the comma syntax style.

A real world example is the BlackBerry Playbook. It has a good web browser, but it's not very forgiving with error handling when parsing the meta viewport. If you use semi-colons instead of comma's, width can in some circumstances not get set to `device-width`. There is currently a bug in the PlayBook's viewport implementation that means width gets set to an arbitrary value if `initial-scale` is not also set to 1.0. If an error is thrown due to incorrect viewport syntax, `initial-scale` can be ignored and the whole page will appear enlarged, with over-sized text and blurry images. Not really what you intended, huh?

Safari and Chrome are currently the only web browsers that display a series of errors/warnings for an incorrect meta viewport declaration:

    Viewport argument value "device-width;" for key "width" not recognized. Content ignored.
    Viewport argument value "1.0;" for key "initial-scale" was truncated to its numeric prefix.
    Viewport argument value "1.0;" for key "maximum-scale" was truncated to its numeric prefix.
    Viewport argument value "0;" for key "user-scalable" was truncated to its numeric prefix.

It would be nice if more browsers did this. Maybe once [@viewport](http://dev.opera.com/articles/view/an-introduction-to-meta-viewport-and-viewport/) becomes more widely adopted, we could then begin to phase out the messy meta viewport altogether?

So, the next time you are using meta viewport in a site — make sure you define it properly. Don't just cut and paste it from a old/bad example you found somewhere!

Please note, you should not necessarily be including all the different properties seen above in your declaration. This article is simply concentrating on how to define things correctly.

Update - for anyone wishing to use `width=device-width` without also setting `initial-scale=1.0`, the PlayBook can be tamed by inserting the legacy BlackBerry `HandheldFriendly` meta property before the viewport declaration:

{% highlight html %}
<meta name="HandheldFriendly" content="True" />
<meta name="viewport" content="width=device-width" />
{% endhighlight %}
