var gulp = require('gulp');
var mocha = require('gulp-mocha');

var files = ['gulpfile.js', './lib/*.js', 'server.js', './test/*.js'];

gulp.task('mocha', function() {
  return gulp.src('test/*.js')
  .pipe(mocha());
});

gulp.task('watch', function() {
  return gulp.watch(files, ['mocha']);
});

gulp.task('default', ['watch', 'mocha']);
