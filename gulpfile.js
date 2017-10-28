'ust strict';

const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const fileinclude = require('gulp-file-include');
const gulp = require('gulp');
const header = require('gulp-header');
const htmlmin = require('gulp-htmlmin');
const less = require('gulp-less');
const path = require('path');
const pkg = require('./package.json');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');

gulp.task('fileinclude', function() {
  return gulp.src(path.join('./templates/', '*.tpl.html'))
   .pipe(fileinclude())
   .pipe(rename({
     extname: ""
   }))
   .pipe(rename({
     extname: ".html"
   }))
   .pipe(htmlmin({collapseWhitespace: true}))
   .pipe(gulp.dest('./'));
});

// compile less
gulp.task('less', function() {
  return gulp
    .src('less/oot.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// minify css
gulp.task('minify-css', ['less'], function() {
  return gulp.src('css/oot.css')
    .pipe(cleanCSS({ compatibility: '*' })) // Default to ie10
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// minify js
gulp.task('minify-js', function() {
  return gulp.src('js/oot.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'fileinclude', 'less', 'minify-css', 'minify-js'], function() {
  gulp.watch('less/*.less', ['less']);
  gulp.watch('css/*.css', ['minify-css']);
  gulp.watch('js/*.js', ['minify-js']);
  gulp.watch('templates/*', ['fileinclude']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});
