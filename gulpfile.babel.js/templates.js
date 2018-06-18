import gulp from 'gulp';
import { resolve } from 'path';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import pug from 'gulp-pug';
import changed from 'gulp-changed';
import gutil from 'gulp-util';
import puglint from 'gulp-pug-lint';
import htmlhint from 'gulp-htmlhint';

import { onError, paths, isProduction } from '../config';
import locals from '../src/data';

const bs = browserSync.get('main');

gulp.task('templates:compile', () => {
  gulp.src(resolve(paths.templates.srcDir, 'views', '**', '*.pug'))
    .pipe(isProduction ? gutil.noop() : changed(paths.buildDir, { extension: '.html' }))
    .pipe(plumber(onError))
    .pipe(pug({
      locals,
      pretty: !isProduction,
    }))
    .pipe(gulp.dest(paths.templates.buildDir))
    .pipe(bs.stream());
});

gulp.task('templates:lint', () => {
  gulp.src(resolve(paths.templates.srcDir, '**', '*.pug'))
    .pipe(puglint());
});

gulp.task('templates:lint', () => {
  gulp.src(resolve(paths.templates.buildDir, '**', '*.html'))
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter());
});

gulp.task('templates:watch', () => {
  gulp.watch(resolve(paths.templates.srcDir, '**', '*.pug'), ['templates:compile']);
});