'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('sass', function (done) {
 return gulp.src('./sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream({match: '**/*.css'}));

  done();
});

gulp.task('serve', gulp.series('sass', function(done) {
    browserSync.init({
        server: {
            baseDir: './',
            open: false
        },
        notify: false
    });

    browserSync.watch([
        './*.html',
        './scripts/*.js'
    ]).on('change', browserSync.reload);

    gulp.watch('./sass/*.*', gulp.series('sass'));
  
    done()
}));