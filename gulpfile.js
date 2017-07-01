const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const gutil = require('gulp-util');
const path = require('path');
const webpack = require('gulp-webpack-build');
const nodemon = require('gulp-nodemon');
const shell = require('gulp-shell');
const PluginError = gutil.PluginError;

var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var typescript = require('gulp-tsc');

const isProduction = process.env.NODE_ENV === 'production';

var src = './src',
  dest = './dist',
  webpackOptions = {
    debug: true,
    devtool: '#source-map',
    watchDelay: 200
  },
  webpackConfig = {
    useMemoryFs: true,
    progress: false
  },
  CONFIG_FILENAME = webpack.config.CONFIG_FILENAME;

gulp.task('webpack', [], function () {
  // if(isProduction) {
    // return gulp.src(path.join(src, '**', CONFIG_FILENAME), { base: path.resolve(src) })
    return gulp.src([`${__dirname}/src/**/*.js`, `${__dirname}/src/**/*.ts`, `${__dirname}/src/**/*.tsx`], { base: path.resolve(src) })
      .pipe(webpack.closest(CONFIG_FILENAME))
      .pipe(webpack.init(webpackConfig))
      .pipe(webpack.props(webpackOptions))
      .pipe(webpack.run())
      .pipe(webpack.format({
        version: false,
        timings: true
      }))
      .pipe(webpack.failAfter({
        errors: true,
        warnings: true
      }))
      .pipe(gulp.dest(dest));
  // }
  
});

gulp.task('css', function () {
  var postcss = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src('src/style/main.css')
    // .pipe(isProduction ? gutil.noop() : sourcemaps.init() )
    .pipe(postcss([require('precss'), require('autoprefixer')]))
    // .pipe(isProduction ? gutil.noop() : cleanCSS())
    // .pipe(isProduction ? gutil.noop() : sourcemaps.write('./'))
    // .pipe(isProduction ? gutil.noop() : sourcemaps.write('.'))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
  gulp.watch(`${__dirname}/src/style/**/*.*`, ['css']);
  // gulp.watch(path.join(src, '**/*.*')).on('change', function (event) {
  gulp.watch([`${__dirname}/src/**/*.ts`, `${__dirname}/src/**/*.ts`, `${__dirname}/src/**/*.tsx`]).on('change', function (event) {  
    if (event.type === 'changed') {
      gulp.src(event.path, { base: path.resolve(src) })
        .pipe(webpack.closest(CONFIG_FILENAME))
        .pipe(webpack.init(webpackConfig))
        .pipe(webpack.props(webpackOptions))
        .pipe(webpack.watch(function (err, stats) {
          gulp.src(this.path, { base: this.base })
            .pipe(webpack.proxy(err, stats))
            .pipe(webpack.format({
              verbose: false,
              version: false
            }))
            .pipe(gulp.dest(dest));
        }));
    }
  });
});

gulp.task('copyIconFont', () => {
  gulp.src(`${__dirname}/iconfont/*.*`)
    .pipe(gulp.dest(`${__dirname}/dist/iconfont`));
});


gulp.task('copyFavicon', () => {
  gulp.src(`${__dirname}/favicon.ico`)
    .pipe(gulp.dest(`${__dirname}/dist`));
});

gulp.task('copyHtml', () => {
  gulp.src(`${__dirname}/index.html`)
    .pipe(gulp.dest(`${__dirname}/dist`));
});

gulp.task('start', shell.task(
  './node_modules/.bin/nodemon --exec ./node_modules/.bin/ts-node -- ./server.tsx'
));

gulp.task('dev', ['copyIconFont', 'copyFavicon', 'watch', 'start']);
gulp.task('default', ['css', 'copyIconFont', 'copyFavicon', 'copyHtml']);

// gulp.task('webpack', () => {
//   gulp.src(['server.tsx'])
//     .pipe(typescript())
//     .pipe(gulp.dest('dest/'))
// })
