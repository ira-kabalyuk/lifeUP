var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var del = require('del');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');

var src = {
    app: 'app/',
    html: 'app/**/*.html',
    js: 'app/scripts/*.js',
    sass: 'app/styles/*.scss',
    images: 'app/images/**/*',
    tmp: '.tmp/',
    dist: 'dist/'
}


gulp.task('styles', function () {
    return gulp.src(src.sass)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'nested'}))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(src.tmp +'/styles'))
        .pipe(browserSync.stream());
});


gulp.task('scripts', function() {
    return gulp.src(src.js)
        //.pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(src.tmp + '/scripts'))
        .pipe(browserSync.stream());
});


gulp.task('images', function() {
    return gulp.src(src.images)
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(src.tmp + '/images'))
        .pipe(browserSync.stream());
});


gulp.task('serve', ['styles', 'scripts', 'images'], function() {
    browserSync.init({
        server: {
            baseDir: [src.tmp, src.app],
            routes: {
                "/bower_components": "bower_components"
            }
        }
    });

    gulp.watch(src.sass, ['styles']);
    gulp.watch(src.js, ['scripts']);
    gulp.watch(src.images, ['images']);
    gulp.watch(src.html).on('change', browserSync.reload);
});


gulp.task('serve:dist', ['build'], function() {
    browserSync.init({
        server: src.dist
    });
});


gulp.task('clean', function() {
    return del.sync([src.tmp, src.dist]);
});


gulp.task('copy', ['styles', 'images'], function() {
    gulp.src(src.tmp + '/images/**/*')
        .pipe(gulp.dest(src.dist + '/images'));

    return gulp.src(src.app + '/fonts/**/*')
        .pipe(gulp.dest(src.dist + '/fonts'))
});


gulp.task('build', ['clean', 'copy'], function() {
    var assets = useref.assets({searchPath: ['.tmp', 'app', '.']});
    return gulp.src(src.html)
        .pipe(assets)
        .pipe(gulpif(isFileExt('js'), uglify()))
        .pipe(gulpif(isFileExt('css'), minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(src.dist));
});


function isFileExt(ext) {
    return function(file) {
        var parts = file.path.split('.');
        var last = parts[parts.length -1];
        return (ext === last);
    }
}