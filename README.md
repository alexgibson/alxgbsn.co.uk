
alxgbsn.co.uk
=============

[![Build Status](https://travis-ci.org/alexgibson/alxgbsn.co.uk.svg?branch=master)](https://travis-ci.org/alexgibson/alxgbsn.co.uk)
[![dependencies Status](https://david-dm.org/alexgibson/alxgbsn.co.uk/status.svg)](https://david-dm.org/alexgibson/alxgbsn.co.uk)

This is the source code repository for my [personal blog](https://alxgbsn.co.uk), a simple static site built using [Jekyll](http://jekyllrb.com/) and hosted on [Surge](https://surge.sh/).

Install
-------

First install [Bundler](http://bundler.io/):

```
gem install bundler
```

Site dependencies can then be installed using:

```
bundle install --path vendor/bundle
```

Finally install dev dependencies from npm:

```
npm install
```

Run
---

To compile the static site run:

```
gulp site:build
```

To start a local server:

```
bundle exec jekyll serve
```

Test
-----

Once the static site has been generated you can then validate the HTML and all site links by running:

```
bundle exec htmlproofer ./_site --url-ignore /feed/ --check-html --check-favicon --only-4xx --assume-extension --disable-external
```

Deploy
------
To automatically build and deploy the static site to the `gh-pages` branch:

```
gulp deploy
```

