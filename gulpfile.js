'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const ghpages = require('gh-pages');
const dist = '_site';

function deploy(cb) {
    ghpages.publish(dist, function(err) {
        console.error(err); // eslint-disable-line no-console
    });

    cb();
}

function buildJekyll(cb) {
    let spawn = require('child_process').spawn;
    let jekyll = spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'});

    jekyll.on('exit', (code) => {
        cb(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    });
}

function serveJekyll(cb) {
    let spawn = require('child_process').spawn;
    let jekyll = spawn('bundle', ['exec', 'jekyll', 'serve'], {stdio: 'inherit'});

    jekyll.on('exit', (code) => {
        cb(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    });
}

function minifyHtml() {
    return gulp.src('./_site/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true }))
        .pipe(gulp.dest('./_site'));
}

function clean(cb) {
    del(['_site/**']).then(() => {
        cb();
    });
}

function lintJS() {
    return gulp.src(['gulpfile.js', './_assets/js/*.js', '!./_assets/js/lib/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function defaultTask(cb) {
    gulp.watch(['./_assets/js/*.js'], lintJS);
    cb();
}

const build = gulp.series(clean, lintJS, buildJekyll, minifyHtml);
const serve = gulp.series(clean, lintJS, serveJekyll, defaultTask);

gulp.task('default', serve);
gulp.task('build', build);
gulp.task('deploy', gulp.series(build, deploy));

module.exports = serve;
