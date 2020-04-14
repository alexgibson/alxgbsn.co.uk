---
layout: post
title: My seventh year working at Mozilla
desc: A look back at my seventh year working at Mozilla
excerpt: This week marks my seventh year working full time for Mozilla. The past year has been good for me personally and professionally, but it has also been an uneasy time for both Mozilla and the world as a whole. I write this post under lockdown during to the COVID-19 pandemic, which is a very testing time for many people and organizations around the world. I'm thankful to still have a stable job, and to have the protection of being able to work from home. I'm more aware of my privilege now than ever before.
---

<figure>
    <img src="/images/posts/berlin-2020.jpg" alt="Mozilla remotees group photo in Berlin, January 2020" srcset="/images/posts/berlin-2020-high-res.jpg 1.5x">
    <figcaption>Mozilla remotees group photo in Berlin, January 2020</figcaption>
</figure>

This week marks my seventh year working full time for Mozilla. The past year has been good for me personally and professionally, but it has also been an uneasy time for both Mozilla and the world as a whole. I write this post under lockdown during to the COVID-19 pandemic, which is a very testing time for many people and organizations around the world. I'm thankful to still have a stable job, and to have the protection of being able to work from home. I'm more aware of my privilege now than ever before.

Professional achievements
-------------------------

Earning a promotion from Senior to Staff level engineer at Mozilla is an achievement I thought I'd never accomplish a few years back. It always seemed like a lofty goal, with no clear path for me from where I was situated within the organization. After help and guidance from my manager over the course of a year, it was something I was happy to finally achieve in 2019. I really wanted to be spending more time solving larger technical problems, as well as helping to improve the systems that we rely on for our day-to-day work. To be given more accountability and time to spend on this type of work is a prospect I am really excited about.

Roadmapping
-----------

As part of my new responsibilities I'm accountable for maintaining the technical roadmap of a large, non-trivial project ([bedrock](https://github.com/mozilla/bedrock)). Maintaining the roadmap involves working closely with the project owner and project manager, as well as other stakeholders and engineers, with a goal to better understand the needs of the platform and to identify areas where it can be improved. There is no shortage of work to do here for a website that's been around for over a decade, has spanned three different codebases, is translated in over 100 languages, and consists of three different front-end CSS frameworks. Over the past 6 months I've spent a lot of time filing issues, triaging bugs, and setting milestones to chart a course for platform improvements. It's been satisfying to see technical debt start to get paid off, and for large platform improvements begin to appear on the horizon.

Project Fluent
--------------

One of the first large platform improvements we've been busy working on is an overhaul of bedrock's localization (L10n) system. The website's current L10n system is more than 7 years old, and was built at a time when the need for new localized content was much less frequent than it is today. Once new copy is added to the website, the process of extracting and updating localized strings requires a lot of manual care and intervention. Adding "breaking" string changes is also painful, where even the smallest of punctuation changes is capable of triggering a wave of new localization work.

Working together with Mozilla's L10n team, we set a mandate to decommission the current L10n system in 2020, and have been gradually implementing a replacement system built on top of [Project Fluent](https://projectfluent.org/). One of the key goals for the new system is to make the L10n process faster and with less friction for our teams, as well as for the wider Mozilla L10n community. Breaking down the requirements for a such a system of complex workflows has been a long and sometimes difficult task, with several blockers along the way. But we're nearly there, and the majority of the implementation work is complete. We're now on the last stretch of migrating legacy content, before finally switching over to the new system.

Uncertain changes
-----------------

As I mentioned earlier, despite the past year being a good for me professionally, it has also been a year of unexpected changes and turmoil. To being with, Mozilla had some layoffs at the start of 2020. Whilst I was lucky enough to be uneffected by the [reorganisation](https://blog.mozilla.org/blog/2020/01/15/readying-for-the-future-at-mozilla/), some of my collegues were not as fortunate. Redundancies at Mozilla have been pretty few and far between during the time that I have worked here, so it was pretty unsettling for the organisation as a whole to undergo such a sudden change. My hope is that is now behind us and we can start looking again to the future.

To complicate things further, the world is also being heavily tested by the COVID-19 pandemic right now. It's fortunate that Mozilla is in a position to adapt well to continuing work under the distributed environment that we all find ourselves in. A lot of people are relying more and more on the internet right now to do the things they need both for work and for family life, so Mozilla continues to play an important role in enabling people with the tools they need to communicate and interact safely online.

What will 2020 bring? Your guess is as good as mine. My hope is it can only get better from here.
