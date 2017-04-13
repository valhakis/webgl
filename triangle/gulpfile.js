'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var app = './app';
var dist = './dist';

var paths = {
   scripts: [
      `${app}/*.js`
   ],
   scss: [
      `${app}/*.scss`
   ],
   html: [
      `${app}/*.html`
   ]
};

gulp.task('scripts', function() {
   return gulp.src(paths.scripts).pipe(gulp.dest(`${dist}/js`)).pipe(browserSync.stream());
});

gulp.task('sass', function() {
   return gulp.src(paths.scss).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(`${dist}/css`)).pipe(browserSync.stream());
});

gulp.task('html', function() {
   return gulp.src(paths.html).pipe(gulp.dest(`${dist}`)).pipe(browserSync.stream());
});

gulp.task('default', ['scripts', 'sass', 'html'], function() {
   browserSync.init({
      port: 80,
      server: {
         baseDir: './dist'
      },
      open: false
   });

   gulp.watch(paths.html, ['html']);
   gulp.watch(paths.scss, ['sass']);
   gulp.watch(paths.scripts, ['scripts']);
});

