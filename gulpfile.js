'use strict';

var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var compass = require('gulp-compass');
var jshint = require('gulp-jshint');

var options = {
    branch: 'master'
};

gulp.task('deploy', ['compass:compile', 'js:lint', 'jekyll:build'], function () {
    return gulp.src('./_site/**/*')
        .pipe(deploy(options));
});

gulp.task('jekyll:build', function (gulpCallBack){
    var spawn = require('child_process').spawn;
    var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});

    jekyll.on('exit', function(code) {
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    });
});

gulp.task('compass:compile', function() {
    return gulp.src('./sass/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            sass: 'sass'
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('js:lint', function() {
    return gulp.src(['./js/*.js', '!./js/lib/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
