import gulp from 'gulp';
import clean from 'gulp-clean';
import { resolve } from 'path';

import { paths } from '../../config';

const files = [
  resolve(paths.scripts.destDir, 'site.js'),
  resolve(paths.styles.destDir, '*.css'),
];

gulp.task('utils:clean', () => gulp.src(files, { read: false }).pipe(clean()));
