---
layout: post
title: Responsive Day Out 2 - The Squishening
titleinfo: Alex Gibson
desc: My notes from Responsive Day Out 2 - The Squishening
---

On Friday 27 June I was in Brighton to attend [Responsive Day Out 2: *The Squishening*](http://responsiveconf.com/). It was a fun one day conference for designers and developers to share and discuss their workflow strategies, techniques and experiences with responsive web design. I usually go to more JavaScript focused events, but I am also keen to try and keep up with all the latest HTML/CSS talk, particularly when it comes to building responsive websites.

The general flow for the day made a nice change to the usual conference format. The day was split into three distinct parts, each featuring a series of speakers doing talks back-to-back. The talks we're then followed by a panel discussion between each section's speakers, led by [Jeremy](http://adactio.com/) fielding questions from the audience.

What follows here is not a full account of each talk, you can listen to the [audio recordings](http://huffduffer.com/adactio/tags/responsiveconf2) for that. This is more a collection of my main take-aways for the day, and what I found most interesting.

Stephen Hay: *Scultping Text*
----------------------------

[Stephen Hay](http://www.the-haystack.com/) started the day off discussing the merits of using well structured content and semantic HTML to help “sculpt” a design. We have spent years designing websites using placeholder text and empty containers of colour yet to be filled with content. But how can we produce the best responsive designs for content we don't yet have? It seems backward and yet here we are. Stephen showed how to design directly around raw HTML content in the browser, starting with small screen sizes and then adding CSS rules and Media Query breakpoints that are dictated by the content, not the viewport size. Everyone seemed to agree it feels like common sense to work this way, yet it's still not practiced enough in reality.

Sally Jenkinson: *More than Media Queries*
-----------------------------------------

[Sally Jenkinson](http://www.sallyjenkinson.co.uk/) focused on designing websites responsibly, not just responsively. It takes much more than just figuring out CSS breakpoints. We can't forget about performance when concentrating on design requirements. Deadlines are often tight, but if we ship fast we must seriously consider the implications of any given choice.

Ida Aalen: *The Core Model*
-------------------------

[Ida Aalen](http://iallenkelhet.no/) discussed what she considered to be the “core model” for information architecture, and focused on the work her team did for the [Norweigian Cancer Society](https://kreftforeningen.no/). There we're some interesting statistics, particularly on dispelling common myth's such as *“people don't want to fill in web forms on mobile”*. The core model approach looks to identify the main business goals and user needs, and apply them in a device agnostic way.

Rachel Andrew: *CSS Grid Layout Module*
---------------------------------------

As a developer I found [Rachel Andrew's](http://www.rachelandrew.co.uk/) talk on the [CSS Grid Layout Module](http://dev.w3.org/csswg/css-grid/) the most interesting presentation of the day. This spec started out life as an initial implementation in IE10, but has since evolved considerably and been standardized. It is now available to test in Chrome Canary (currently behind a flag). The module gives developers the ability to define their own layout grids, columns and gutters, whilst still preserving a strict separation between markup and presentation.

{% highlight css %}
.wrapper {
    display: grid;
    grid-template-columns: 200px 40px auto 40px 200px;
    grid-template-rows: auto 1fr;
}

.content {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
}
{% endhighlight %}

There was discussion over why developers should use this over say, [CSS Flexbox](http://www.w3.org/TR/css3-flexbox/). The feeling seems to be that Flexbox is great for smaller layout details, but is not as well suited to overall site layout. There was mention that Flexbox has [performance issues](http://www.smashingmagazine.com/2013/05/23/building-the-new-financial-times-web-app-a-case-study/), although that has [been refuted](http://updates.html5rocks.com/2013/10/Flexbox-layout-isn-t-slow) by others.

The CSS Grid Layout Module also allows developers control over content ordering, which can be especially useful for responsive design on smaller viewports. There was an accessibility concern raised about re-ordering content in the discussion around this. Such things have already been possible for a while now with Flexbox, but it suffers from the side effect of *visual ordering* becoming different from the *source ordering* readaloud by screen readers. Will this implementation be the same? Jeremy pointed out that this has been a problem ever since we could to `position: absolute;` in browsers.

For more on CSS Grid Layout, you can read [Rachel's blog post](http://rachelandrew.co.uk/archives/2014/06/27/css-grid-layout-getting-to-grips-with-the-chrome-implementation/) and see her [code examples](http://rachelandrew.co.uk/presentations/css-grid).

Dan Donald: *CSS Element Queries*
---------------------------------

[Dan Donald](http://hereinthehive.com/) talked about building flexible web components using [CSS Element Queries](http://ianstormtaylor.com/media-queries-are-a-hack/). These aren't actually a real thing (yet), but lots of folks have shown interest in wanting them, and Dan even built a [prototype](https://github.com/bbc-sport/responsive-modules) while he was working at the BBC to show how they might behave.

There was some discussion on whether any browser vendors we're looking at implementing such a thing, and concensus seems to be that this is a somewhat difficult feature to implement, due to hard problems such as [circular dependencies](http://www.xanthir.com/b4PR0).

Inayaili de León Persson: *Making Ubuntu responsive*
----------------------------------------------------

[Yaili](http://yaili.com/) talked about how to make an existing site responsive when you're not always able to start from scratch, using the [Ubuntu website](http://www.ubuntu.com/) as a case study. She discussed the processes in making sure the existing static desktop design went uneffected, whilst still making pages responsive and looking good on smaller screens. The main points here seemed to be to set priorities and keep goals in check during the process.

Oliver Reichenstein: *Information Architecture*
-----------------------------------------------

[Oliver Reichenstein](http://ia.net/) gave a very clever and humerous talk on information architecture, in which he made the case that home pages, site navigation and side bars are often badly designed simply due to internal politics. He argued that a single-column, [modular approach](http://next.theguardian.com/blog/container-model-blended-content/) to design works much better. Containers should be full width, and should never appear beside each other unless the contain directly related content.

Kirsty Burgoine: *Mistakes and sucesses*
----------------------------------------

[Kirsty Burgoine](http://www.kirstyburgoine.co.uk/) gave another entertaining and humerous talk on some of her experiences building responsive websites for clients. The process of designing and building a website used to be relatively straight forward, with PSD design and hand-off for development being clearly defined, separate steps. But now we build responsive websites this is not as easy as it used to be. Kirsty discussed her processes and ways of helping to manage client expectations, together with the failures and sucesses she encountered along the way.

Stephanie Rieger: *CSS Media Queries Level 4*
---------------------------------------------

[Stephanie Rieger](http://yiibu.com/) devled into [CSS Media Queries Level 4](http://dev.w3.org/csswg/mediaqueries4/) and dissected what browser vendors are currently working on when it comes to new media features. She covered various new media features in her talk, and questioned the practicality of some.

{% highlight css %}
@media (scripting:enabled) {}
{% endhighlight %}

The `scripting` media feature detects if JavaScript is enabled in the browser. This seems well intentioned enough, but is it actually all that useful? Lack of JS support should not be a problem if you're already using *progressive enhancement*. More often than not, problems occur due to slow connectivity or scripts that fail.

{% highlight css %}
@media (light-level:dim) {}
{% endhighlight %}

The `light-level` media feature allows developers to apply specific CSS styles based on (one of three) different luminosity levels detected by a device sensor. Real world testing shows that many device sensors are either not calibrated correctly, or differ enough to make significant use of this pretty impractical.

{% highlight css %}
@media (pointer:coarse) {}
{% endhighlight %}

The `pointer` media type can be used to detect the primary type of pointing device avilable to a user. Values can be `none` (e.g. TV), `coarse` (e.g. touchscreen) or `fine` (e.g. mouse or stylus). But what about devices with multiple input types? It is up to the user-agent to decide which is the primary input type, but what about users who switch inputs or prefer the secondary input type?

{% highlight css %}
@media (overflow-block:scroll) {}
{% endhighlight %}

The `overflow-block` media feature can be used to control the behavior of a device when content overflows the viewport i.e. does it get cut off, or can you scroll?

There was some discussion around this talk about why there seems to be so much work going on adding Media Query features that either aren't really that useful, or do not seem to be well thought out. Why are developers getting light-level sensor API's instead of really useful things, like CSS Element Queries? The concensus was that standards work takes time, and we don't often know what we want or need in advance. These features may have seemed like really clever additions a few years ago, but needs and wants change quickly.

Ethan Marcotte: *Laziness*
----------------------------------------

[Ethan Marcotte](http://ethanmarcotte.com/) rounded off the day with a talk about keeping things simple. He describes himself as a lazy developer, but lazy in the sense that making smart decisions means you don't need to do as much work. Why design for multiple types of devices each with different interactions? If you're smart, you can design something that works well everywhere. Ethan also showed off some nice CSS techniques using `nth-child` selectors to create flexible grids.

Conclusion
----------

I came away at the end of the day feeling glad that I made the effort to attend this small conference. I knew I would get a lot out of the technical talks, but I also got thinking about workflows and strategies more than I anticipated. It was a nice mixture and balance of speakers.

I also left with the impression that we still have a long way to go before we will really get the features we need to make building responsive websites easier. Browser vendors and spec writers are working on some seemingly great things, such as CSS Grids, but there is also a lot of piecemeal stuff being added to the Media Queries spec that either don't seem to be as valuable, or fall short in their real potential.
