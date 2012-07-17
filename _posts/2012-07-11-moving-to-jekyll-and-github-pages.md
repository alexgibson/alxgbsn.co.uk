---
layout: post
title: Moving to Jekyll and GitHub Pages
desc: The benefits of using a static site generator such as Jekyll and hosting a blog on GitHub Pages
---

I've just finished moving my site to a new home, which is now hosted on [GitHub Pages](http://pages.github.com/) and powered by [Jekyll](http://jekyllrb.com/), the increasingly popular static site generator. Jekyll takes a template directory and then processes it to create a static website consisting of pure HTML files, which you can then host on your chosen web server.

For the past few years my old blog has served me pretty well, but I've been looking for something simpler and less cumbersome to update and maintain. Here are a list of reasons why I made the decision to choose Jekyll:

Authoring new content
---------------------

No more bloated CMS or WYSIWYG editors! I can write draft content using [Markdown](http://daringfireball.net/projects/markdown/), which can be processed directly by Jekyll. With cross-device apps like [Ai Writer](http://www.iawriter.com/) and cloud syncing via [Dropbox](https://www.dropbox.com/) or [iCloud](https://www.icloud.com/), creating draft content while on the move is now incredibly easy.

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

Because the [source](https://github.com/alexgibson/alexgibson.github.com) for this site is available on GitHub, people are free to make suggestions and/or corrections to my posts via submitting a pull request or opening an issue.

Portability
-----------

Moving a static site to a new web server in the future couldn't be simpler. I also still retain the original content in markdown format, instead of being locked away inside a database file.

Plugins
-------

There are a wealth of good [Jekyll plugins](https://github.com/mojombo/jekyll/wiki/Plugins) available via the community. Jekyll also works very nicely with the Python syntax highlighter [Pygments](http://pygments.org/), which you can see in use on this site.

Overall
-------

So far, I'm really enjoying the simplicity of having a static site. Getting Jekyll up and running correctly was initially a little confusing, but it was actually quite simple once I got to it. I'm still learning a lot about making the most out of my template structure, as there is still a lot I need to explore. The new site is by no means complete, and there are still a few things I have yet to work out how do. But I'm pretty happy with what I've managed to put together in just a couple of days.