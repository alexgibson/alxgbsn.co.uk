
alxgbsn.co.uk
=============

[![Build Status](https://travis-ci.org/alexgibson/alxgbsn.co.uk.svg?branch=admin)](https://travis-ci.org/alexgibson/alxgbsn.co.uk)
[![devDependency Status](https://david-dm.org/alexgibson/alxgbsn.co.uk/admin/dev-status.svg)](https://david-dm.org/alexgibson/alxgbsn.co.uk/#info=devDependencies)

This is the source code repository for my [personal blog](http://alxgbsn.co.uk), a simple static site built using [Jekyll](http://jekyllrb.com/) and published on [Surge](https://surge.sh/).

Install
-------

Dependencies are handled using [Bundler](http://bundler.io/), which must be installed first:

```
gem install bundler
```

Site dependencies can then be installed using:

```
bundle install --path vendor/bundle
```

Run
---

To generate the static site and watch for changes:

```
bundle exec jekyll serve
```

To automatically compile Sass, lint JS and watch for changes:

```
gulp
```

Test
-----

Once the static site is built you can then validate the HTML and all site links by running:

```
htmlproof ./_site --href-ignore /feed/ --check-html --check-favicon --only-4xx
```
