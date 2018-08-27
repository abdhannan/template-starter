// Defining requirements
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var gulpSequence = require('gulp-sequence');

/* ================= WATCHER ================== */
gulp.task('watch', function () {
    gulp.watch('./assets/sass/**/*.scss', ['process-css']);
});

/* ================= COMPILER ================== */
gulp.task('process-css', function(callback){
    gulpSequence('sass', 'minify-css')(callback)
});

gulp.task('sass', function () {
    var stream = gulp.src('./assets/sass/main.scss')
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/'))
    .pipe(rename('main.css'))
    return stream;
});

gulp.task('minify-css', function() {
    return gulp.src('./assets/css/main.css')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/css/'));
});
