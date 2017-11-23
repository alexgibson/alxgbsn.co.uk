'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const compass = require('gulp-compass');
const jshint = require('gulp-jshint');
const htmlmin = require('gulp-html-minifier');
const del = require('del');
const runSequence = require('run-sequence');

let options = {
    branch: 'master'
};

gulp.task('jekyll:build', (gulpCallBack) => {
    let spawn = require('child_process').spawn;
    let jekyll = spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'});

    jekyll.on('exit', (code) => {
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    });
});

gulp.task('site:build', (callback) => {
    runSequence('clean', ['compass:compile', 'js:lint'], 'jekyll:build', 'minify:html', callback);
});

gulp.task('compass:compile', () => {
    return gulp.src('./sass/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            sourcemap: false,
            sass: 'sass',
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('minify:html', () => {
  gulp.src('./_site/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true }))
    .pipe(gulp.dest('./_site'));
});

gulp.task('js:lint', () => {
    return gulp.src(['./js/*.js', '!./js/lib/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean', () => {
    return del(['_site/**']);
});

gulp.task('default', () => {
    watch('./sass/*.scss', () => {
        gulp.start('compass:compile');
    });
    watch(['./js/*.js', 'sw.js'], () => {
        gulp.start('js:lint');
    });
});
