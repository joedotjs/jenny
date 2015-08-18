var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('buildJS', function () {

    var bundler = browserify();

    bundler.add('./js/main.js');
    bundler.transform(babelify);

    return bundler.bundle()
        .pipe(source('main.js'))
        .pipe(plumber())
        .pipe(gulp.dest('./public'))
        .pipe(livereload());

});

gulp.task('buildCSS', function () {
    return gulp.src('./scss/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./public'))
        .pipe(livereload());
});

gulp.task('default', function () {

    livereload.listen();

    gulp.watch('scss/**/*.scss', ['buildCSS']);
    gulp.watch('js/**/*.js', ['buildJS']);

    gulp.watch('./index.html', function () {
       livereload.reload();
    });

});