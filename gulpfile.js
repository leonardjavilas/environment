//environment
const gulp = require('gulp');
const sass = require('gulp-sass');
const haml = require('gulp-ruby-haml');
const browserSync = require('browser-sync').create();
const gulpIgnore = require("gulp-ignore");
const htmlBeautify = require("gulp-html-beautify");
const cssBeautify = require('gulp-cssbeautify');
const autoPrefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const cssNano = require('gulp-cssnano');
const concat = require('gulp-concat');
const pipeline = require('readable-stream').pipeline;
const rename = require("gulp-rename");
const del = require('del');
const order = require("gulp-order");
const jsHint = require('gulp-jshint');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

// project - config paths
const dir_src = 'src';
const dir_dist = 'docs';
//const extensions = ;

// set of route objects - start
const src_paths = {
    haml: [`${dir_src}/*.haml`, `${dir_src}/partials/*.haml`],  //for development
    //haml:  'src/*.haml',     //for production
    css:  `${dir_src}/css/**/*`,
    js:  `${dir_src}/js/**/*`,
    sass:  `${dir_src}/scss/**/*.scss`, // for customs styles
    fonts:  `${dir_src}/fonts/**/*`,
    images:  `${dir_src}/img/**/*.+(png|jpg|jpeg|gif|svg)`,
    scripts:  `${dir_src}/scripts/**/*`,
    test_js:  `${dir_src}/scripts/settings.js`,
    test_css:  `${dir_src}/scss/styles.scss`,
  }

// set of paths - distribution
const dist_paths = { 
 css: `${dir_dist}/assets/css`,
 js: `${dir_dist}/assets/js`,
 img: `${dir_dist}/assets/img`,
 fonts: `${dir_dist}/assets/fonts`,
 compress: `${dir_dist}/assets/compress`,
}

// excludes the partials generated through haml
const partial_condition = "_*.html";

// set of tasks 
gulp.task('clean', function () {
  return del.sync(dir_dist);
})

gulp.task('browser', function () {
  browserSync.init({
    server: {
      baseDir: dir_dist
    }
  })
});

gulp.task("haml", function() {
  return gulp
  .src(src_paths.haml)
  .pipe(
    haml({
      doubleQuote: true
    })
    )
  .pipe(
    htmlBeautify({
      indent_size: 2
    })
    )
  .pipe(gulpIgnore.exclude(partial_condition))
  .pipe(gulp.dest(dir_dist))
  .pipe(
    browserSync.reload({
      stream: true
    })
    );
});

gulp.task('css', function() {
  return gulp.src(src_paths.css)
  .pipe(gulp.dest(dist_paths.css))
});

gulp.task('js', function() {
  return gulp.src(src_paths.js)
  .pipe(gulp.dest(dist_paths.js))
});

gulp.task('sass', function () {
  return gulp.src(src_paths.sass)
  .pipe(sass().on('error', sass.logError))
  .pipe(autoPrefixer({
    browsers: ['last 2 versions'],
    cascade: false,
  }))
  .pipe(cssBeautify({
    indent: '  '
  }))
  .pipe(gulp.dest(dist_paths.css));
});

gulp.task('fonts', function() {
  return gulp.src(src_paths.fonts)
  .pipe(gulp.dest(dist_paths.fonts))
});

gulp.task('images', function() {
  return gulp.src(src_paths.images)
  .pipe(gulp.dest(dist_paths.img))
});

gulp.task('scripts', function() {
  return gulp.src(src_paths.scripts)
  .pipe(jsHint())
  .pipe(jsHint.reporter('default'))
  .pipe(gulp.dest(dist_paths.js))
});

////////////////////////////////////////////
//test of compress with gulp
gulp.task('compress_js', function () {
  return pipeline(
    gulp.src(src_paths.test_js),
    order([
      "dist/assets/js/jquery.Rut.js",
      "dist/assets/js/settings.js"
      ]),
    concat('application.js'),
    uglify(),
    rename('test.min.js'),
    gulp.dest(dist_paths.compress)
    );
});

gulp.task('compress_css', function () {
  return pipeline(
       // gulp.start('sass'),
       gulp.src(`${dir_dist}/assets/css/styles.css`),
       concat('application.css'),
       cssNano(),
       rename('application.min.css'),
       gulp.dest(dist_paths.compress)
       );
});

gulp.task('compress_images', function() {
  return gulp.src(src_paths.images)
  .pipe(cache(imagemin({
   interlaced: true
 })))
  .pipe(gulp.dest(dist_paths.compress))
});

//return gulp.src(src_paths.images)
gulp.task('watch', ['haml','css','js','sass','fonts','images','scripts'], function() {
  gulp.watch(src_paths.haml, ['haml']).on('change', browserSync.reload);
  gulp.watch(src_paths.sass, ['sass']).on('change', browserSync.reload);
  gulp.watch(src_paths.scripts, ['scripts']).on('change', browserSync.reload);
  gulp.watch(src_paths.images, ['images']).on('change', browserSync.reload);
});

gulp.task('default', ['watch','browser']);

// var runSequence = require('run-sequence');
// var merge = require('merge-stream');
// haml pug(jade) slim 
// gulp.task('optimiza-web', ['minify-js', 'minify-css']);
