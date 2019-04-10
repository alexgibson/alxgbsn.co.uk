---
layout: post
title: My sixth year working at Mozilla
desc: A look back at my sixth year working at Mozilla
excerpt: This week marks my sixth year working at Mozilla! I'll be honest, this year's _mozillaversary_ came by so fast I nearly forgot all about writing this blog post. It feels hard to believe that I've been working here for a full six years. I've guess grown and learned a lot in that time, but it still doesn't feel like all that long ago when I first joined full time. Years start to blur together. So, what's happened in this past 12 months?
---

<figure>
    <img src="/images/posts/sf-all-hands-2018.jpg" alt="Photo of San Fransisco's skyline taken at the Monday night event for Mozilla All-Hands, June 2018." srcset="/images/posts/sf-all-hands-2018-high-res.jpg 1.5x">
    <figcaption>Photo of San Fransisco's skyline taken at the Monday night event for Mozilla All-Hands, June 2018.</figcaption>
</figure>

This week marks my sixth year working at Mozilla! I'll be honest, this year's _mozillaversary_ came by so fast I nearly forgot all about writing this blog post. It feels hard to believe that I've been working here for a full six years. I've guess grown and learned a lot in that time, but it still doesn't feel like all that long ago when I first joined full time. Years start to blur together. So, what's happened in this past 12 months?

Building a design system
------------------------

Mozilla's website design system, named [Protocol](https://protocol.mozilla.org), is now a real product. You can [install it via NPM](https://www.npmjs.com/package/@mozilla-protocol/core) and build on-brand Mozilla web pages using its compenents. Protocol builds on a system of _atoms_, _molecules_, and _organiams_, following the concepts first made popular in [Atomic Web Design](http://atomicdesign.bradfrost.com/). Many of the new design system components can be seen in use on the recently redesigned [www.mozilla.org](https://www.mozilla.org) pages.

<figure>
    <img src="/images/posts/protocol-homepage.png" alt="Sections of the mozilla.org homepage, built using Protocol components." srcset="/images/posts/protocol-homepage-high-res.png 1.5x">
    <figcaption>Sections of the mozilla.org homepage, built using Protocol components.</figcaption>
</figure>

It was fun to help get this project off the ground, and to see it finally in action on a live website. Making a flexible, intuitive design system is not easy, and we learned a lot in the first year of the project that can help us to improve Protocol over the coming months. By the end of the year, our hope is to have fully ported all mozilla.org content to use Protocol. This is not an easy task for a small team and a large website that's been around for over a decade. It'll be an interesting challenge!

Measuring clicks to installs
----------------------------

Supporting the needs of experimentation on [Firefox download pages](https://www.mozilla.org/firefox/new/) is something that our team has been helping to manage and facilitate for several years now. The breadth of data now required in order to fully understand the effectiveness of experiments is a lot more complex today compared to when we first started. _Product retention_ (i.e. how often people actively use Firefox) is now the key metric of success. Measuring how many clicks a download button on a web page receives is relatively straight forward, but understanding how many of those people go on to actually run the installer, and then how often they end up actively using the product for requires a multi-step funnel of measurement. Our team has continued to help [build custom tools](https://bedrock.readthedocs.io/en/latest/stub-attribution.html) to facilitate this kind of data in experimentation, so that we can make better informed product decisions.

Publishing systems
------------------

One of our team's main objectives is to enable people at Mozilla to publish quality content to the web quickly and easily, whether that be on [mozilla.org](https://www.mozilla.org), a [microsite](https://irlpodcast.org/), or on a [official blog](https://blog.mozilla.org). We're a small team however, and the marketing organisation has a great appetite for wanting new content at a fast pace. This was one of the (many) reasons why we invested in building a design system, so that we can create on-brand web pages at a faster pace with less repetitive manual work. We also invested in building more [custom publishing systems](https://github.com/mozmeao/www-admin), so that other teams can work more independently. We've long had publishing systems in place for things like [Firefox release notes](https://www.mozilla.org/firefox/releasenotes/), and now we also have some initial systems in place for publishing marketing content, such as the what can currently be seen on the [mozilla.org homepage](https://www.mozilla.org).

Individual contributions
------------------------

- I made over 167 commits to [bedrock](https://github.com/mozilla/bedrock) this past year.
- I made over 78 commits to [protocol](https://github.com/mozilla/protocol) this past year.
- We moved to GitHub issues for most of our projects over the past year, so my [Bugzilla](https://bugzilla.mozilla.org) usage has dropped. But I've now filed over 534 bugs, made over 5185 comments, and been assigned more than 656 bugs on Bugzilla in total. Yikes.

Travel
------

I got to visit Portland, San Fransisco for Mozilla's June all-hands event, and also Orlando for December's all-hands. I brought the family along to Disney World for an end-of-year vacation afterwards, who all had an amazing time. We're very lucky!

<figure>
    <img src="/images/posts/orlando-all-hands-2018.jpg" alt="Family fun outside the Disney Swan & Dolphin, December 2018." srcset="/images/posts/orlando-all-hands-2018-high-res.jpg 1.5x">
    <figcaption>Family photo outside the Disney Swan & Dolphin, December 2018.</figcaption>
</figure>
