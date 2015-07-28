var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var util = require('gulp-util');
var react = require('gulp-react');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var sourcePaths = {
  scripts: [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
    'bower_components/packery/dist/packery.pkgd.min.js',
    'bower_components/react/react.min.js',
    'source/js/*.js'
    ],
  styles: 'source/less/all.less',
  markup: 'source/index.html',
  data: 'source/projects.json'
};


var buildPaths = {
  scripts: 'build/js',
  styles: 'build/css',
  markup: 'build',
  data: 'build'
};

// scripts
gulp.task('scripts', function() {
  return gulp.src(sourcePaths.scripts)
    .pipe(react())
    .pipe(concat('all.js'))
    // .pipe(gulp.dest(buildPaths.scripts))
    // .pipe(uglify())
    // .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(buildPaths.scripts))
    .on('error', util.log);
});

// styles
gulp.task('styles', function() {
  return gulp.src(sourcePaths.styles)
    .pipe(less())
    // .pipe(gulp.dest(buildPaths.styles))
    // .pipe(minifycss())
    // .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(buildPaths.styles))
    .on('error', util.log);
});

// markup
gulp.task('markup', function() {
  return gulp.src(sourcePaths.markup)
    .pipe(gulp.dest(buildPaths.markup))
    .on('error', util.log);
});

// data
gulp.task('data', function() {
  return gulp.src(sourcePaths.data)
    .pipe(gulp.dest(buildPaths.data))
    .on('error', util.log);
});

// rerun tasks on file changes
gulp.task('watch', function() {
  gulp.watch(['source/**/*'], ['main']);
});

// main tasks
gulp.task('main', ['scripts', 'styles', 'markup', 'data']);

// default tasks
gulp.task('default', ['main', 'watch']);
