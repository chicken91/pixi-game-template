var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var webpack = require('webpack-stream');
const concat = require('gulp-concat');
var OUT_DIR = '../bin';


var srcHTML = './data/templates/index.html';
var srcCSS = './data/templates/style.css';
var srcAssets = './data/assets/*';
var pixiPath = './node_modules/pixi.js/dist/pixi.js';

gulp.task('copy:html', function() {
	gulp.src(srcHTML).pipe(gulp.dest(OUT_DIR));
});

gulp.task('copy:css', function() {
    gulp.src(srcCSS).pipe(gulp.dest(OUT_DIR));
});

gulp.task('copy:assets', function() {
    gulp.src(srcAssets).pipe(gulp.dest(OUT_DIR + '/assets/'));
});


gulp.task("ts:build", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("../bin/"));
});


gulp.task('webpack', function() {
	return gulp.src('../bin/')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('../bin/'));
});

gulp.task('build', ['ts:build'], function() {
  return gulp.src('../bin/')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('../bin/'));
});

gulp.task('build:concat', () => {
    return gulp.src(pixiPath).pipe(concat('bundle.js')).pipe(gulp.dest(OUT_DIR));
});

// default includes all
gulp.task('default', ['copy:html', 'copy:css', 'copy:assets', 'build']);