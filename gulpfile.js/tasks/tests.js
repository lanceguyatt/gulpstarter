const { resolve } = require('path');
const gulp = require('gulp');
const pump = require('pump');

const stylelint = require('gulp-stylelint');
const eslint = require('gulp-eslint');
const htmlhint = require('gulp-htmlhint');

const { paths } = require('../../config');

const tests = {
  scripts(done) {
    pump(
      [
        gulp.src([
          resolve('**', '*.js'),
          '!node_modules/**']
        ),
        eslint(),
        eslint.format(),
      ],
      done
    );
  },

  styles(done) {
    pump(
      [
        gulp.src(resolve(paths.styles.srcDir, '*.css')),
        stylelint({
          reporters: [
            {
              formatter: 'string',
              console: true,
            }
          ]
        }),
      ],
      done
    );
  },

  templates(done) {
    pump(
      [
        gulp.src(resolve(paths.destDir, '**', '*.html')),
        htmlhint('.htmlhintrc'),
        htmlhint.reporter(),
      ],
      done
    );
  },

};

module.exports = tests;
