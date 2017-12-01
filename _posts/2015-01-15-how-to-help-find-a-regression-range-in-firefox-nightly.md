---
layout: post
title: How to help find a regression range in Firefox Nightly
desc: Using mozregression track down the cause of a regression in Firefox
excerpt: I recently spotted a visual glitch in a CSS animation that was only happening in Firefox Nightly. I was pretty confident the animation played fine just a couple of weeks ago, so after some debugging and ruling out any obvious wrong-doing in the code, I was pretty confident that a recent change in Firefox must have somehow caused a regression. Not knowing quite what else to do, I decided to file a bug to see if anyone else could figure out what was going wrong.
---

I recently spotted a [visual glitch](https://bug1083079.bugzilla.mozilla.org/attachment.cgi?id=8506255) in a CSS animation that was only happening in Firefox Nightly. I was pretty confident the animation played fine just a couple of weeks ago, so after some debugging and ruling out any obvious wrong-doing in the code, I was pretty confident that a recent change in Firefox must have somehow caused a regression. Not knowing quite what else to do, I decided to [file a bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1083079) to see if anyone else could figure out what was going wrong.

After some initial discussion it turned out the animation was only broken in Firefox on OSX, so definitely a bug! It could have been caused by any number of code changes in the previous few weeks and could not be reproduced on other platforms. So how could I go about helping to find the cause of the regression?

It was then someone pointed me to a tool I hadn't heard of before, called [mozregression](http://mozilla.github.io/mozregression/). It's an interactive regression range finder for Mozilla nightly and inbound builds. Once installed, all you need to do is pass in a last known "good date" together with a known "bad date" and a URL to test. The tool then automates downloading and running different nightly builds against the affected URL.

    mozregression --good=2014-10-01 --bad=2014-10-02 -a "https://example.com"

After each run, mozregression asks you if the build is "good" or "bad" and then continues to narrow down the regression range until it finds when the bug was introduced. The process takes a while to run, but in the end it then spits out a [pushlog like this](https://hg.mozilla.org/integration/mozilla-inbound/pushloghtml?fromchange=33a3fd4d1970&tochange=28519d825a23).

This helped to narrow down the cause of the regression considerably, and together with a [reduced test case](https://bug1083079.bugzilla.mozilla.org/attachment.cgi?id=8516184) we we're then able to work out which commit was the cause.

The resulting patch also turned out to fix another bug that was effecting [Leaflet.js maps](https://bugzilla.mozilla.org/show_bug.cgi?id=1105762) in Firefox. Result!
