/* eslint-disable @typescript-eslint/no-var-requires */
const { task, src, dest } = require('gulp');
const del = require('del');
const gulpIf = require('gulp-if');
const combine = require('gulp-jsoncombine');
const getData = require('./src/helpers/getData');

const srcPath = 'src/resources/**/*.json';
const outPath = 'src/data/seed-data';

task('default', async () => {
  await del(outPath);
  return src(srcPath)
    .pipe(gulpIf('*.json', combine('userProjectData.json', getData)))
    .pipe(dest(outPath));
});
