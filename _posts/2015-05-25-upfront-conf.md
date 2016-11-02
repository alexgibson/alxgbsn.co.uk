---
layout: post
title: UpFront Conference 2015
desc: My notes from UpFront Conference 2015
---

<figure>
    <img src="/images/posts/upfront-2015.png" alt="UpFront Conf 2015">
</figure>

I took a trip to Manchester last week to attend [UpFront Conf 2015](http://upfrontconf.com/). It was a full day of talks on web design and front-end development, and covered a range of topics including UI design, web performance, front-end testing, and typography. It even had a talk dedicated games console browsers! The line up of speakers delivered a good balance of both creative and technical talks, which made for an enjoyable day of brain-food. Here are my notes from the talks:

Brad Frost - Atomic design
--------------------------

[Brad Frost](http://bradfrost.com/) started off the day by sharing his experience working with clients to design reusable, responsive UI components. [Atomic Design](http://atomicdesign.bradfrost.com/) focuses on building individual components instead of web pages. This helps to promote reusability, which in turn improves workflow, speeds up prototyping, and makes things more easily testable. Brad says we should be investing more time in keeping our [style guides](http://styleguides.io/) up to date, as well as developing common [pattern libraries](http://patternlab.io/). These are things that often get treated as auxiliary aspects of a project, but if we prioritize our work using a clear methodology, we can work more efficiently in the long run.

Alica Sedlock - Jumping into front end testing
----------------------------------------------

[Alica Sedlock](http://www.aliciability.com/) gave a useful high-level overview of front-end testing, which covered areas such as *Unit tests*, *Integration tests*, and *Visual Regression testing*. A lot of the usual suspects for unit & integration tests we're covered, such as Jasmine, Mocha, Karma, and headless browsers such as PhantomJS. What I found particularly interesting (or new to me anyway), was how to test for visual regressions. This can be done using tools such as [PhantomCSS](https://github.com/Huddle/PhantomCSS) and [CasperJS](http://casperjs.org/) to take screenshots of before & after states, and then diff the changes. Pretty neat!

Soledad Penadés - The disconnected ensemble: Scattered clouds, underground
--------------------------------------------------------------

Mozilla's own [Soledad Penadés](http://soledadpenades.com/) gave a really fun talk & tech demo, sharing some of her experiments exploring the concepts of a [P2P Web](https://github.com/sole/the-p2p-web), and how this could be applied to mobile platforms such as [Firefox OS](https://www.mozilla.org/en-US/firefox/). Sole built some musical toys, using Web Audio API and Web Components, which could be run and shared over a local network. This showed off some pretty interesting tech, including how an app can run its own local web server and share addresses to clients using NFC. Very cool!

I'd also never met Sole in person before, despite working at the same company (in the same country, even), so it was nice to get to say hi and chat a bit in the break!

[View Sole's demo source code](https://github.com/sole/disconnected-ensemble-src).

Dean Hume - Faster mobile websites
----------------------------------

In the first talk of the day dedicated to web performance, [Dean Hume](http://deanhume.com/) gave an overview on why page loading speed is so important, and how we are often failing horribly at performance when it comes to mobile. Dean gave an insight into using the *RAIL approach* (Response, Animate, Idle, Load) to help improve overall page speed, covering techniques such as [image optimization](http://imageoptimization.info/), [critical CSS](https://github.com/addyosmani/critical), [responsive images](http://responsiveimages.org/), and more. The most high level goals are to reduce overall page weight, minimize the number of requests a page needs to make, and speed up the time to first paint.

[View Dean's slides](https://speakerdeck.com/deanohume/faster-mobile-websites).

Ben Foxall - The Internet of browsers
-------------------------------------

[Ben Foxall](http://benjaminbenben.com/) demoed a fun interactive concept that played on the *“Internet of Things”*, and showed that technology is very much a part of our physical world. Ben used browser meta data from devices in the audience to produce a visualization which highlighted where people we're sat in relation to the speaker. This was accomplished using common Web API's such as geolocation, orientation, proximity, ambient light, touch and sound.

[View Ben's interactive demo](http://thing.benjaminbenben.com/).

Richard Rutter - Web typography you could be doing now
------------------------------------------------------

[Richard Rutter](http://clagnut.com/) gave a talk on common typography best practices, and how best to apply them to web design. I found this quite insightful being more developer oriented, and also learnt a few new CSS properties that I never even knew existed (e.g. `font-variant-numeric`). Richard also made a great point that we should all be serving [woff2](http://caniuse.com/#feat=woff2) for our web fonts by now, which can save up to 30% in file size.

[View Richard's slides](http://webtypography.net/talks/upfront2015/).

Anna Debenham - Games Console browsers
--------------------------------------

[Anna Debenham](http://www.maban.co.uk/) gave a really interesting talk on the rise in use of [games console browsers](http://console.maban.co.uk/). Apparently 18% of people in the UK used a games console to log onto a social media web site in 2013. Another interesting group are 14-16 year olds, 20% of whom in the UK use a games console browser to access the internet (likely they don't yet have a mobile device with data contract).

Anna went on to showcase the wide range of user inputs a games console can have, including gestures, voice commands, keypads, touch screens, and styluses to name just a few. Web browsers on these devices can also have very tight memory constraints, as well as pretty poor standards support. We need to try and optimize our web pages to be as light as possible, as well as make sure to always support common inputs such as keyboard, and use focus styles more effectively.

Yesenia Perez-Cruz - Design decisions through the lens of performance
---------------------------------------------------------------------

[Yesenia Perez-Cruz](http://www.yeseniaperezcruz.com/) gave the second talk to focus on web performance, which was also the final talk of the day. I thought this one was particularly good as Yesenia shared how she works as a web designer to make informed decisions that won't negatively impact a web page, taking into consideration factors like overall page weight, loading time and number of requests. This is something that designers don't often prioritize, or consider being something a developer only needs worry about.

In Yesenia's experience, slow and heavy sites are often a result of poor planning, communication, and awareness. Traditional waterfall processes often result with optimization being only an afterthought, or something that the developer needs to try and squeeze in toward the end of a project. It shouldn't be this way. As a designer, Yesenia asks questions like, *“How many requests will a carousel add?”*, *“How will performance be effected if we add another font weight?”*, *“Do we really need that parallax background?”* Her suggestion to help weigh up these questions is to establish a [web performance budget](http://clearleft.com/thinks/responsivedesignonabudget/) for any given page, and to make performance an overall project goal from the outset. Performance should be considered a design feature, not just a side effect of development.
