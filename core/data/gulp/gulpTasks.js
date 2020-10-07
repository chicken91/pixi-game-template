const rootDirectory = process.cwd();
const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const webpack = require('webpack');
const webpackConfig = require(`${rootDirectory}/webpack.config.js`);
const webpackStream = require('webpack-stream');
const merge = require('gulp-merge-json');
const audiosprite = require('gulp-audiosprite');
const yargs = require('yargs');

process.env.NODE_ENV = yargs.argv.env || 'development';
process.env.PLATFORM = yargs.argv.platform || 'desktop';
const isMobile = process.env.PLATFORM === 'mobile';
const dataDirectory = path.join(rootDirectory, 'data');
const soundFolder = 'data/assets/sounds/sprite/';
const soundFiles = [`${soundFolder}/*.wav`, `${soundFolder}/*.mp3`];
const buildDirectory = webpackConfig.output.path;
const dataCopyFiles = [`${dataDirectory}/**/*`, `!${dataDirectory}/layouts/**/*`, `!${dataDirectory}/layouts/`];
const layoutFiles = [`${dataDirectory}/layouts/**/*.json`, `!${dataDirectory}/layouts/**/${isMobile ? '@desktop' : '@mobile'}/**/*.json`];
const layoutMergedName = isMobile ? 'main_layout_mobile.json' : 'main_layout_desktop.json';


const buildOutputDirectory = (resolve) => {
    fs.existsSync(buildDirectory) || mkdirp.sync(buildDirectory);
    resolve();

}
const buildWebpackOutput = (resolve) => {
    gulp.src('src/index.ts')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(buildDirectory)).on('finish', () => resolve())
}

exports.buildOutputDirectory = buildOutputDirectory;
exports.buildWebpackOutput = buildWebpackOutput;



