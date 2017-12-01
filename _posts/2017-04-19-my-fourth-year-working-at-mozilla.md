---
layout: post
title: My fourth year working at Mozilla
desc: A look back at my fourth year working at Mozilla
excerpt: This week marks my 4th year Mozillaversary! As usual, I try to put together a short post to recap on some of the things that happened during the past year. It feels like I have some things to talk about this time around which are slightly more process-heavy than previous year's efforts, but gladly there's some good work in there too. Here goes!
---

<figure>
    <img src="/images/posts/hawaii-staff-photo.jpg" alt="Mozilla staff photo from All-Hands event in Hawaii, December 2016" srcset="/images/posts/hawaii-staff-photo-high-res.jpg 1.5x">
    <figcaption>Mozilla staff photo from All-Hands event in Hawaii, December 2016</figcaption>
</figure>

This week marks my 4th year *Mozillaversary*! As usual, I try to put together a short post to recap on some of the things that happened during the past year. It feels like I have some things to talk about this time around which are slightly more process-heavy than previous year's efforts, but gladly there's some good work in there too. Here goes!

Our team grew
-------------

Our [functional team grew](https://mozilla.github.io/meao/2017/01/16/introducing-mozmeao/) over the past year which is really great to see. We now manage the development and infrastructure for both [www.mozilla.org](https://www.mozilla.org/) and [MDN](https://developer.mozilla.org/). The idea is that having both teams more closely aligned will lead to increased sharing of knowledge and skills, as well as standardization on common tools, libraries, infra, deployment and testing. It's great to have some more talented people on the team, hooray!

Are we agile yet?
-----------------

While most of my day-to-day work is still spent tending to the needs of [www.mozilla.org](https://www.mozilla.org/), a lot has changed in the last year with regard to how our development team manages work processes. The larger marketing organization at Mozilla has switched to a new *agile sprint model*, with dedicated durable teams for each focus area. While I think this is a good move for the marketing org as a whole, it has also been a struggle for many teams to adjust (the mozorg team included). While two week sprints can work well for product focused teams, a website such as mozorg can be quite a different beast; with multiple stakeholders, moving parts, technical debt, and often rapidly shifting priorities. It is also an [open source project](https://github.com/mozilla/bedrock), with [real contributors](https://github.com/mozilla/bedrock/graphs/contributors). We're still experimenting with trying to make this new process fit the needs of our project, but I do wonder if we'll slowly creep back to [Kanban](https://en.wikipedia.org/wiki/Kanban_%28development%29) (our previous methodology) during the course of the next year. Let's wait and see ;)

Contributions and other stats
-----------------------------

Here are the usual stats from the past year:

- I made over [166 commits](https://github.com/mozilla/bedrock/commits?author=alexgibson) to bedrock this past year (down from 269 commits last year).
- I have now filed over 424 bugs on [Bugzilla](https://bugzilla.mozilla.org/), been assigned over 474 bugs and made over 3967 comments.
- I cycled over 1657 miles on my lunch breaks (one of my personal goals this past year was to become more healthy!).

Now, the number of commits to bedrock aren't always a good representation of the level of work that occurred during the year. I did work on some large, far reaching bugs which took a lot of time and effort. But it does make me wonder if our new sprint process is actually *less* productive overall? Are all those smaller bugs going left unattended for longer? Would we have still have been hitting our high level goals doing Kanban? It's hard to quantify, but there's some food for thought here.

Firefox Download Pages
----------------------

The main [Firefox download page](https://www.mozilla.org/firefox/new/) is one of the most high traffic pages on mozorg, so it's naturally something we pay close attention to when making changes. This year we experimented on the page **a lot**. It got redesigned it no less than three times, and continually tweaked over the course of multiple A/B tests. Lots of scrutiny goes into every change, especially in relation to page weight, loading time, and the impact that can have on download conversions. Ultimately what used to be a relatively plain looking page turned into something quite beautiful.

<figure>
    <img src="/images/posts/download-page-horizon.png" alt="Redesigned Firefox download page" srcset="/images/posts/download-page-horizon-high-res.png 1.5x">
    <figcaption>Redesigned Firefox download page</figcaption>
</figure>

We also experimented with things like making the sun rise over the horizon, but sadly this proved to be a bit too much of a distraction for some visitors. Nevertheless, kudos to our design team for the beautiful visuals. It was quite fun to work on :)

Firefox Stub Attribution
------------------------

Another notable feature I spent time on was adding support to bedrock for [tracking campaign referral data](https://bugzilla.mozilla.org/show_bug.cgi?id=1279291), and passing that along to the Firefox Stub Installer for profiling in [Telemetry](https://wiki.mozilla.org/Telemetry). The idea is that the Firefox Retention Team can look at data in Telemetry and try to attribute specific changes in retention (how long users actively use the product) to downloads triggered by specific referral sources or media campaigns. This work required coordination with multiple engineering teams within Mozilla, and took considerable time to test and gradually roll out. We're still crunching the data and hope it can provide some useful insights going forward.

SHA-1 Bouncer Support
---------------------

Firefox 52 marked the [end of SHA-1 certificate support](https://blog.mozilla.org/security/2017/02/23/the-end-of-sha-1-on-the-public-web/) on the Web. In order to continue serving downloads to users, we had to switch [Bouncer](https://github.com/mozilla-services/go-bouncer/) to SHA-2 only, and then set up a SHA-1 mirror to continue supporting users on Windows XP/Vista. This required modifying our download button logic in bedrock (something I was once a bit scared of doing) to provide SHA-1 specific links that get shown only to the users who need it. Once XP/Vista are [officially no longer supported](https://blog.mozilla.org/futurereleases/2016/12/23/firefox-support-for-xp-and-vista/) by Firefox ESR we can remove this logic.

Mozilla Global Navigation
-------------------------

As part of Mozilla's new branding rollout, I also got to build the first prototype of the new [global navigation for mozorg](https://www.mozilla.org/en-US/). We're still iterating and refining how it works and performs, but the aim is that one day it can be used across many Mozilla web properties. I'm hopeful it may help to solve some of the information architecture issues we've faced on mozorg in recent years.

All-hands and travel
--------------------

<img src="/images/posts/hawaii-volcano.jpg" alt="Photo of me in the crater of a volcano!" srcset="/images/posts/hawaii-volcano-high-res.jpg 1.5x">

Mozilla's [All-Hands events](https://wiki.mozilla.org/All_Hands) are always pretty amazing. This time they happened in [London](https://wiki.mozilla.org/All_Hands/2016_London) and [Hawaii](https://wiki.mozilla.org/All_Hands/2016_Hawaii). While London wasn't really high on the excitement levels, it was nice to get to welcome all my colleagues to the UK. Hawaii was naturally the real highlight for me, especially because I got to go visit a real, live volcano! In between all that I also got to pay my second visit to the Mozilla Toronto office, almost exactly 4 years since my last visit (which was my very first week working for Mozilla!).
