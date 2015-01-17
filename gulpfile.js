var gulp = require('gulp');
var deploy = require('gulp-gh-pages');

var options = {
    branch: 'master'
};

gulp.task('deploy', ['jekyll:build'], function () {
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
