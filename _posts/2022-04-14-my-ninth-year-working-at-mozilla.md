---
layout: post
title: My ninth year working at Mozilla
desc: A look back at my ninth year working at Mozilla
excerpt: April 15th marks my ninth year working for Mozilla! Last year's mozillaversary post was a bit of a stop gap. Truth be told, I just didn't have the energy to write about what I had been doing at work given all the unrest that was happening in the world. This year, despite the world still being in ongoing states of WTF, I'm going to try and talk a bit more about what I've been keeping my brain busy with at work.
---

April 15th marks my ninth year working for Mozilla! [Last year's](https://alxgbsn.co.uk/2021/04/15/my-eighth-year-working-at-mozilla-copy/) *mozillaversary* post was a bit of a stop gap. Truth be told, I just didn't have the energy to write about what I had been doing at work given all the unrest that was happening in the world. This year, despite the world still being in ongoing states of WTF, I'm going to try and talk a bit more about what I've been keeping my brain busy with at work. Here goes:

Mozilla VPN
-----------

Supporting [Mozilla VPN](https://www.mozilla.org/products/vpn/) has continued to be one of my main focus areas. After a successful launch in Germany and France in 2021, we have continued to expand into new markets (now available in 17 countries!). By working closely with the product and marketing teams, we have developed a technical framework to help us roll out availability in new countries relatively easily. This has been achieved by implementing features such as a flexible subscription ID matrix based on language & currency, as well as by adding new geo-location based features to the site.

I also spent a good amount of of my time working on attribution and analytics functions to help support newly generated subscriptions and referrals. Subscription based products are something that Mozilla is still relatively new at, so making sure we can understand where new customers are coming from has been an important area of focus for numerous teams. We still have some way to go here, but are making good progress.

Bedrock Technical Roadmap
-------------------------

I've continued my efforts to try and document [bedrock's](https://github.com/mozilla/bedrock/) ongoing technical roadmap. We had a bunch of new folks join our team over the last year, so I moved the roadmap to a public GitHub [wiki page](https://github.com/mozilla/bedrock/wiki/Technical-Roadmap) to try make it easier to contribute to (and so other teams at Mozilla can see at a glance what's in there). We've made a lot of progress over the last couple of years paying off technical debt, are finally starting to make some good modernisation efforts.

Build System Improvements
-------------------------

One of my personal goals for H2 2021 was to replace bedrock's ageing front-end build system (Gulp) with a more modern alternative. This doesn't sound like the most exciting thing to talk about in a blog post perhaps, but given the size of bedrock it was actually a pretty daunting task. The site has literally thousands of web pages, and hundreds of individual JS / CSS bundles to compile. Our team had made some efforts toward migrating to Webpack in the past (which we decided was the most suitable alternative given our bundling requirements), but never quite managed to get it across the finish line due to various technical hurdles and time restraints.

After a re-evaluation of our options and some work to removing various blockers, this time we finally managed to migrate bedrock to Webpack. Whilst Webpack is still more complicated than I would like sometimes, switching has reduced a lot of complex boilerplate code we had previously. It has also made it much easier to take advantage of more modern tooling options. Since migrating, we've also now incorporated things such as Babel (at last!) for transpiling our JS, and Prettier for formatting.

Glean
-----

Another area of focus I'd like to spend some time on this year is with regard to web analytics. We've used Google Analytics in most of our projects for years now, however it's good to look at other solutions and the benefits they might offer. Mozilla's own [Glean](https://mozilla.github.io/glean/book/index.html) telemetry platform is now available for the web (exciting!), so I'm currently exploring what this might look like for us to use in some of our projects.

