var fs   = require('fs');
var gulp = require('gulp');
var del  = require('del');
var sass = require('gulp-sass');

var options = {
    src   : './src/',
    public: './public/'
}

gulp.task('scripts', function() {
  var files = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    options.src + 'scripts/*.js'
  ];
  return gulp
          .src(files)
          .pipe(gulp.dest(options.public + 'scripts'));
});

gulp.task('styles', function() {
  var files = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    options.src + 'styles/*.scss'
  ];
  return gulp
          .src(files)
          .pipe(sass())
          .pipe(gulp.dest(options.public + 'styles'));
});

gulp.task('images', function() {
  return gulp
          .src(options.src + 'images/**')
          .pipe(gulp.dest(options.public + 'images'));
});

gulp.task('html', function() {
  return gulp
          .src(options.src + '*.html')
          .pipe(gulp.dest(options.public));
});

gulp.task('clean', function() {
  return del([
    options.public + '*'
  ]);
});

gulp.task('watch', function() {
  gulp.watch(options.src + 'scripts/*.js',   ['scripts']);
  gulp.watch(options.src + 'styles/*.scss', ['styles']);
  gulp.watch(options.src + 'images/*',  ['images']);
  gulp.watch(options.src + '*.html',    ['html']);
});

gulp.task('build', ['clean', 'scripts', 'styles', 'images', 'html']);

gulp.task('default', ['build', 'watch']);
