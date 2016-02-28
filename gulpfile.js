'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
 
gulp.task('sass', function () {
	 const processors = [
    autoprefixer({ browsers: ['last 2 versions'] }),
    cssnano()
    ];
  return gulp.src('src/assets/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
   	.pipe(postcss(processors))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
	return gulp.src('src/*.html')
	.pipe(gulp.dest('./dist'))
	.pipe(browserSync.stream());
})

gulp.task('img', function() {
	return gulp.src('src/assets/img/*')
	.pipe(gulp.dest('./dist/assets/img'))
	.pipe(browserSync.stream());
})

// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "./dist"
    });

});

gulp.task('scripts', function() {
  return gulp.src('src/assets/js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'));
});
 
gulp.task('watch', function () {
  gulp.watch('src/assets/sass/*.scss',['sass']);
  gulp.watch("src/*.html", ['html']);		
  gulp.watch("src/assets/img/*", ['img']);		
  gulp.watch("src/assets/js/*", ['scripts']);		
});

gulp.task('default', ['sass', 'serve', 'watch','html','img','scripts']);