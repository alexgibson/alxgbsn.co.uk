---
layout: post
title: Moving to Jekyll and GitHub Pages
titleinfo: Alex Gibson
desc: The benefits of using a static site generator such as Jekyll and hosting a blog on GitHub Pages
---

For the past few years my old blog has served me pretty well, but I've been looking for something simpler and less cumbersome to update and maintain. I've just finished moving my content to a new home, which is now hosted on [GitHub Pages](http://pages.github.com/) and powered by [Jekyll](http://jekyllrb.com/).

Jekyll is a popular static site generator written in Ruby. It takes a template directory and then processes it to create a static website consisting of pure HTML files, which you can then host on your chosen web server. Here are a list of reasons why I made the decision to ‘go static’:

Authoring new content
---------------------

No more bloated <abbr>CMS</abbr> or <abbr>WYSIWYG</abbr> editors! I can write draft content using [Markdown](http://daringfireball.net/projects/markdown/), which can be processed directly by Jekyll. With cross-device apps like [iA Writer](http://www.iawriter.com/) and cloud syncing via [Dropbox](https://www.dropbox.com/) or [iCloud](https://www.icloud.com/), writing draft content is now much easier.

Built-in version control
------------------------

Because this site is hosted on GitHub, version control comes baked-in. I use one branch (master) for hosting the static site on GitHub Pages, and another (admin) for the source.

Performance & reliability
-------------------------

No more PHP/MySQL database means pages load faster and the site should be able to handle periods of heavy traffic with less worry.

Security
--------

Having to deal with mySQL security issues should be unnecessary for something as simple as a personal website or blog. Now I no longer even need think about it.

Collaboration
-------------

Because the [source](https://github.com/alexgibson/alxgbsn.co.uk) for this site is available on GitHub, people are free to make suggestions and/or corrections to my posts via submitting a pull request or opening an issue.

Portability
-----------

Moving a static site to a new web server in the future couldn't be simpler. I also still retain the original content in markdown format, instead of being locked away inside a database file.

Plugins
-------

There are a wealth of good [Jekyll plugins](https://github.com/mojombo/jekyll/wiki/Plugins) available via the community. Jekyll also works very nicely with the Python syntax highlighter [Pygments](http://pygments.org/), which you can see in use on this site.

Sass/Compass
------------

I've been using CSS pre-processors such as [Less](http://lesscss.org/) and [Sass](http://sass-lang.com/)/[Compass](http://compass-style.org/) in work projects for a while now, so this was also a good opportunity to start again from scratch with my personal site (which at the time was still all hand written CSS) and integrate it into the build process. I've chosen to use Sass as I like the syntax, as well as the wealth reusable patterns and mixins offered by Compass.

Overall
-------

So far, I'm really enjoying the simplicity of having a static site. Getting Jekyll up and running correctly was quite simple, but I'm still learning a lot about making the most out of my template structure and there is still a lot I need to explore. The new site is by no means complete, but I'm pretty happy with what I've managed to put together in just a couple of days.
