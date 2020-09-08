var gulp        = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var cssnano     = require('gulp-cssnano');
var htmlmin     = require('gulp-htmlmin');
var imagemin    = require('gulp-imagemin');
var sourcemaps  = require('gulp-sourcemaps');
var handlebars  = require('gulp-handlebars');
var wrap        = require('gulp-wrap');
var declare     = require('gulp-declare');
var cache       = require('gulp-cache');
var sass        = require('gulp-sass');
var del         = require('del');

// Tasks 

gulp.task('browserSync', function() {
  browserSync({
      proxy: "localhost:3000",
      port: 3001,
      notify: true
  });
})

gulp.task('watch', function() {
  gulp.watch('assets/scss/*.scss', ['scss']);
  gulp.watch('assets/js/*.js', browserSync.reload);
  gulp.watch('views/**/*.hbs', browserSync.reload);
});

gulp.task('js', function() {  
  return gulp.src('assets/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scss', function () {
  gulp.src('assets/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  gulp.src('assets/img/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
  gulp.src('assets/fonts/**/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('views', function() {
  gulp.src('views/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: '1222.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

// Build Sequences

gulp.task('default', function(callback) {
  runSequence(
    'clean:dist',
    'browserSync',
    'watch',
    ['js', 'scss', 'images', 'fonts', 'views'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['js', 'scss', 'images', 'fonts', 'views'],
    callback
  )
})