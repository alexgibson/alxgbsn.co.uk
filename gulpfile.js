'use strict';

const gulp = require('gulp');
const ghpages = require('gh-pages');
const dist = '_site';

function deploy(cb) {
    ghpages.publish(dist, function(err) {
        console.error(err); // eslint-disable-line no-console
    });

    cb();
}

gulp.task('default', deploy);

module.exports = deploy;
