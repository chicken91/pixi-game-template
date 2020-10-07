const { buildOutputDirectory, buildWebpackOutput } = require(`./gulpTasks`);

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

function loadFile(path) {
    return fs.readFileSync(path, 'utf8');
}

function loadJson(path) {
    return JSON.parse(loadFile(path));
}

var run = require('gulp-run-command').default

function generateExports(path) {
    const command = `node ./node_modules/create-ts-index/dist/cti entrypoint create ${path}`
    console.log(command)
    return run(command);
}

function replaceFiles(path, name) {
    const outFile = loadFile(`${path}/entrypoint.ts`)
        .split('\\').join('/')

    fs.writeFile(`${path}/${name}.ts`, outFile, err => {
        if (err) {
            console.log(err);
        }
    });

    try {
        fs.unlinkSync(`${path}/entrypoint.ts`)
    } catch (err) {
        console.error(err)
    }
}

function buildSizeReport() {
    const fileMap = {};
    let assetsPath = path.join(dataDirectory, 'assets');
    getDirectoryFiles(assetsPath, addToFileMap.bind(undefined, fileMap));

    if (!fs.existsSync(buildDirectory)) {
        mkdirp(buildDirectory);
    }
    fs.writeFile(`${buildDirectory}/size-report.json`, JSON.stringify(fileMap), err => {
        if (err) {
            console.log(err);
        }
    });
}

function addToFileMap(fileMap, file, stat) {
    fileMap[file] = stat.size / 1000;
}

function getDirectoryFiles(directoryPath, fileCallback) {
    let fileList = fs.readdirSync(directoryPath);
    for (let file of fileList) {
        let filePath = path.join(directoryPath, file);
        let stat = fs.lstatSync(filePath);
        if (stat.isDirectory()) {
            getDirectoryFiles(filePath, fileCallback)
        }
        if (stat.isFile()) {
            fileCallback(file, stat);
        }
    }
}

gulp.task('merge:components', () => gulp.src(layoutFiles)
  .pipe(merge({fileName: layoutMergedName}))
  .pipe(gulp.dest(`${buildDirectory}`)));

gulp.task('entry', generateExports('./src'));

gulp.task('audiosprite', () => gulp.src(soundFiles)
  .pipe(audiosprite({
      format: 'howler', export: "ogg,m4a,mp4", output: "template_audio"
  }))
  .pipe(gulp.dest('data/assets/sounds')));

gulp.task('entryReplace', () => {
    replaceFiles('./src', 'index')
});

gulp.task('build:size-report', (done) => {
    buildSizeReport();
    done();
});

gulp.task('build:index', (done) => {
    if (!fs.existsSync(buildDirectory)) {
        mkdirp(buildDirectory);
    }
    const fileName = 'index.html';
    const {gameName} = loadJson(`${dataDirectory}/config.json`);

    const indexHtml = loadFile(`${rootDirectory}/core/data/html/${fileName}`)
      .replace('{{NAME}}', gameName);

    fs.writeFile(`${buildDirectory}/${fileName}`, indexHtml, err => {
        if (err) {
            console.log(err);
        }
        done();
    });
});

gulp.task('copy:assets', () => gulp.src(dataCopyFiles)
  .pipe(gulp.dest(buildDirectory)));

gulp.task('copy:data', gulp.series('merge:components', 'copy:assets'));



gulp.task('buildOutputDirectory', buildOutputDirectory);
gulp.task('buildWebpackOutput', buildWebpackOutput);

gulp.task(
  'default',
  gulp.series(
    'buildOutputDirectory',
    gulp.parallel(
      'buildWebpackOutput',
      'build:index',
      'build:size-report',
      'copy:data'
    )
  )
);