'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var deploy = require('gulp-gh-pages');
var compass = require('gulp-compass');
var jshint = require('gulp-jshint');
var del = require('del');
var runSequence = require('run-sequence');

var options = {
    branch: 'master'
};

gulp.task('deploy', ['site:build'], function () {
    return gulp.src('./_site/**/*')
        .pipe(deploy(options));
});

gulp.task('jekyll:build', function (gulpCallBack){
    var spawn = require('child_process').spawn;
    var jekyll = spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'});

    jekyll.on('exit', function(code) {
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    });
});

gulp.task('site:build', function(callback) {
    runSequence('clean', ['compass:compile', 'js:lint'], 'jekyll:build', callback);
});

gulp.task('compass:compile', function() {
    return gulp.src('./sass/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            sourcemap: true,
            sass: 'sass',
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('js:lint', function() {
    return gulp.src(['./js/*.js', '!./js/lib/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean', function () {
    return del(['_site/**']);
});

gulp.task('default', function () {
    watch('./sass/*.scss', function () {
        gulp.start('compass:compile');
    });
    watch('./js/*.js', function () {
        gulp.start('js:lint');
    });
});
