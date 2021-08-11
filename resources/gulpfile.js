const { task, src, dest } = require('gulp');
const del = require('del');
const gulpIf = require('gulp-if');
const combine = require('gulp-jsoncombine');
const getData = require('./src/helpers/getData');

const srcPath = 'src/resources/**/*.json';
const outPath = '../backend/src/data/seed-data';
const outFile = 'userProjectData.json';

task('default', async () => {
  await del(`${outPath}/${outFile}`, { force: true });
  return src(srcPath)
    .pipe(gulpIf('*.json', combine(outFile, getData)))
    .pipe(dest(outPath));
});
