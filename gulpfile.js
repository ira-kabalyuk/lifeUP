var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var del = require('del');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

var src = {
    html: 'app/**/*.html',
    js: 'app/scripts/*.js',
    sass: 'app/styles/*.{scss, css}',
    images: 'app/images/**/*',
    dist: './dist'
}

gulp.task('html', function () {
    return gulp.src(src.html)
        .pipe(gulp.dest(src.dist))
        .pipe(browserSync.stream());
});

gulp.task('styles', function () {
    return gulp.src(src.sass)
        .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(src.dist +'/styles'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src(src.js)
        .pipe(gulp.dest(src.dist + '/scripts'))
        //.pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src(src.images)
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(src.dist + '/images'))
        .pipe(browserSync.stream());
});

gulp.task('clean', function() {
    return del(['dist/']);
});

gulp.task('copy', ['html', 'styles', 'scripts', 'images'], function() {
    gulp.src('./bower_components/**/*')
        .pipe(gulp.dest(src.dist+'/bower_components'));

    gulp.src('./app/fonts/**/*')
        .pipe(gulp.dest(src.dist+'/fonts'));
});

gulp.task('serve', ['copy'], function() {

    browserSync.init({
        server: src.dist
    });

    gulp.watch(src.html, function(e){
        gulp.src(e.path)
            .pipe(gulp.dest(src.dist))
            .pipe(browserSync.stream());
    });
    gulp.watch(src.sass, ['styles']);
    gulp.watch(src.js, ['scripts']);
    gulp.watch(src.images, ['images']);
});

gulp.task('build', ['clean', 'copy'], function() {
    // to do zip
});