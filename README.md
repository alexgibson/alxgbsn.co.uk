
alxgbsn.co.uk
=============

[![Build Status](https://travis-ci.org/alexgibson/alexgibson.github.com.svg?branch=admin)](https://travis-ci.org/alexgibson/alexgibson.github.com)
[![devDependency Status](https://david-dm.org/alexgibson/alexgibson.github.com/admin/dev-status.svg)](https://david-dm.org/alexgibson/alexgibson.github.com/admin/#info=devDependencies)

This is the source code repository for my [personal blog](http://alxgbsn.co.uk), a simple static site built using [Jekyll](http://jekyllrb.com/) and published on [GitHub Pages](https://pages.github.com/).

Install
-------

```
gem install jekyll html-proofer rdiscount
```

Run
---

To generate the static site and watch for changes:

```
jekyll serve
```

To automatically compile Sass, lint JS and watch for changes:

```
gulp
```

If you would like to contribute, please make a pull request against the [admin branch](https://github.com/alexgibson/alexgibson.github.com/tree/admin). If you name your branch starting with `admin-`, [Travis CI](https://travis-ci.org/) will automatically build and test your changes when you open a pull request.
