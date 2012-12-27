---
layout: post
title: Site redesign, a mobile first approach
titleinfo: Alex Gibson
desc: Details on the redesign of this site using a mobile first approach to designing websites
---

Anyone who has visited this site over the last few weeks will no doubt have noticed a few changes. It has now had a complete design overhaul, which is probably long overdue given the current rise in interest of principals such as [responsive web design](http://www.alistapart.com/articles/responsive-web-design/) and [mobile first](http://www.lukew.com/ff/entry.asp?933). What follows is a run down of basic changes to the site, in what hopefully makes for a much improved reading experience, in our rapidly changing, device-agnostic world.

Establishing a useful baseline
------------------------------

Rather than using a traditional CSS reset, this site now uses [normalize.css](http://necolas.github.com/normalize.css/) to establish a consistent baseline for cross-browser CSS rendering. Normalize.css makes web browsers render elements more consistently and in line with modern standards. It also preserves useful defaults and corrects common browser inconsistencies, unlike many CSS resets.

Mobile First
------------

For a site where 62.46% of visitors in August to September 2011 were on mobile devices, this is real a no-brainer. Whilst the majority of mobile visitors to MiniApps are on more capable smart phone platforms such as iOS and Android (where a simple set of [CSS Media Queries](http://www.w3.org/TR/css3-mediaqueries/) could suffice), given the [continual rise](http://www.lukew.com/ff/entry.asp?1405) in the number of people using mobile devices to access the world wide web, it still makes sense to design using a [mobile first](http://www.lukew.com/ff/entry.asp?933) approach.

This site now serves styling for browsers in the following order:

* A default CSS style sheet suited to small–screen devices
* CSS Media Queries then optimize content for larger screen sizes such as tablets, e–readers and desktop web browsers.
* Note: since Internet Explorer 8 (and below) does not support CSS Media Queries, it is served a static set of CSS styles optimized for desktop, via a single conditional comment.
* Update: IE Mobile is now set as version 7 in the conditional comment. This is because the new Mango update uses mobile IE 9 (thanks [Paul Irish](http://paulirish.com/)!).

{% highlight css %}
/* Default CSS for mobile here -- */

/* Tablets (portrait) ----------- */
@media (min-width : 570px) and (max-width : 768px) {
	
}

/* Tablets landscape, and desktop */
@media (min-width : 769px) {

}
{% endhighlight %}

Conditional comment for Internet Explorer:

{% highlight html %}
<!--[if (lt IE 9)&(!IEMobile 7)]>
<link href="css/desktop.css" rel="stylesheet" />
<![endif]-->
{% endhighlight %}

Responsive design
-----------------

Whilst the new MiniApps design is quite minimal, using a single column design centered on readability and clear presentation of content - there are still some interesting pieces of responsiveness worth noting (other than the typical resizing of content to fit the browser window).

Content first, navigation second
--------------------------------

Despite MiniApps already using a mobile first approach for CSS, more capable small–screen web browsers can benefit from a further layer of progressive enhancement, with the adoption of a [content first, navigation second](http://adactio.com/journal/4778/) design pattern. Using the [CSS3 Flexbox module](http://dev.w3.org/csswg/css3-flexbox/), visitors on capable mobile web browsers will see the page header and main content first, followed by the navigation further down the page, but before the footer.

Here is a basic template for the site's structural HTML markup:

{% highlight html %}
<body>
    <nav role="navigation"></nav>
    <header role="banner"></header>
    <section role="main"></section>
    <aside role="complementary"></aside>
    <footer role="contentinfo"></footer>
</body>
{% endhighlight %}

Nested inside an appropriate CSS Media Query, small–screen browsers are then be served a different ordering of page content, using the box-ordinal-group property.

{% highlight css %}
/* Smartphones (portrait and landscape) ----------- */
@media (max-width : 569px) {

	body {
        display: -webkit-box;
        display: -moz-box;
        display: box;
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        box-orient: vertical;
	}
	
	nav[role=navigation] {
        -webkit-box-ordinal-group: 4;
        -moz-box-ordinal-group: 4;
        box-ordinal-group: 4;
	}

	header[role=banner] {
        -webkit-box-ordinal-group: 1;
        -moz-box-ordinal-group: 1;
        box-ordinal-group: 1;
	}

	section[role=main] {
        -webkit-box-ordinal-group: 2;
        -moz-box-ordinal-group: 2;
        box-ordinal-group: 2;
	}
	
	aside[role=complementary] {
        -webkit-box-ordinal-group: 3;
        -moz-box-ordinal-group: 3;
        box-ordinal-group: 3;
	}
	
	footer[role=contentinfo] {
        -webkit-box-ordinal-group: 5;
        -moz-box-ordinal-group: 5;
        box-ordinal-group: 5;
	}
}
{% endhighlight %}

This gets the user straight to the content they want to see, making much better use of valuable screen real–estate. Each page also features skip links, allowing for quick access to navigation and main content irrespective of the content order.

Note: for the subset of mobile browsers that support CSS Media Queries but do not yet support Flexbox (e.g. Opera Mobile/Mini), featured detection comes to the rescue courtesy of [Modernizr](http://modernizr.com/). A few alternate CSS styling rules are all that is needed for the navigation and footer sections. Modernizr also provides the site's HTML5 shim that enables Internet Explorer to correctly style new sectioning elements.