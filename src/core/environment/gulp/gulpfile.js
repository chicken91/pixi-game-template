const {argv} = require('yargs');
const del = require('del');
if (argv.production || argv.p) {
    process.env.NODE_ENV = 'production';
}
if (argv.development) {
    process.env.NODE_ENV = 'development';
}
if (argv.mobile || argv.m || process.env.npm_config_mobile) {
    process.env.PLATFORM = 'mobile';
} else {
    process.env.PLATFORM = 'desktop';
}

module.exports = function (gulp) {
    const ROOT_DIR = process.cwd();
    const isMobile = process.env.PLATFORM === 'mobile';
    const ENV_DIR = `${ROOT_DIR}/src/core/environment`;
    const fs = require('fs');
    const path = require('path');
    const mkdirp = require('mkdirp');
    const webpack = require('webpack');
    const webpackStream = require('webpack-stream');
    const webpackConfig = require(`${ROOT_DIR}/webpack.config.js`);

    var merge = require('gulp-merge-json');

    const data_dir = path.join(ROOT_DIR, 'data');

    var audiosprite = require('gulp-audiosprite');
    var soundFolder = 'data/assets/sounds/sprite/';
    const soundFiles = [`${soundFolder}/*.wav`, `${soundFolder}/*.mp3`];

    const build_dir = webpackConfig.output.path;
    const json_files = [`${data_dir}/**/*.json`];
    const build_data_files = [`${data_dir}/**/*`, `!${data_dir}/layouts/**/*`, `!${data_dir}/layouts/`, `!${data_dir}/wrapper/**/*`, `!${data_dir}/wrapper/`];

    const layout_merge_files = [`${data_dir}/layouts/**/*.json`, `!${data_dir}/layouts/**/${isMobile ? '@desktop' : '@mobile'}/**/*.json`];
    const layout_output = isMobile ? 'main_layout_mobile.json' : 'main_layout_desktop.json'

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
        console.log("[buildSizeReport] start");
        const fileMap = {};
        let assetsPath = path.join(data_dir, 'assets');
        // getDirectoryFiles(assetsPath, fileMap);
        getDirectoryFiles(assetsPath, addToFileMap.bind(undefined, fileMap));

        fs.writeFile(`${data_dir}/size-report.json`, JSON.stringify(fileMap), err => {
            if (err) {
                console.log(err);
            }
        });
        console.log("[buildSizeReport] finish");
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

    gulp.task('merge:components', () => gulp.src(layout_merge_files)
        .pipe(merge({fileName: layout_output}))
        .pipe(gulp.dest(`${data_dir}`)))

    gulp.task('copy:minjson', () => gulp.src(json_files)
        .pipe((require('gulp-jsonmin'))())
        .pipe(gulp.dest(build_dir)));

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

    gulp.task('copy:js', () => gulp.src('src/core/environment/js/**/*')
        .pipe(gulp.dest(path.resolve(build_dir, 'js'))));

    gulp.task('build:index', (done) => {
        if (!fs.existsSync(build_dir)) {
            mkdirp(build_dir);
        }
        const fileName = 'index.html';
        const {gameName} = loadJson(`${data_dir}/config/config.json`);

        const indexHtml = loadFile(`${ENV_DIR}/html/${fileName}`)
            .replace('{{NAME}}', gameName);

        fs.writeFile(`${build_dir}/${fileName}`, indexHtml, err => {
            if (err) {
                console.log(err);
            }
            done();
        });
    });

    gulp.task('copy:assets', () => gulp.src(build_data_files)
        .pipe(gulp.dest(build_dir)));

    gulp.task('copy:data', gulp.series('merge:components', 'copy:assets'));

    gulp.task('build:default', gulp.series('build:size-report', 'build:index', 'copy:data'));

    gulp.task('build:webpack', (done) => {
        gulp.src('src/index.ts')
        .pipe(webpackStream(webpackConfig, webpack))
        .on('error', () => { /*error*/
        })
        .pipe(gulp.dest(build_dir));
        done();
    });

    gulp.task('default', gulp.series('build:default', 'build:webpack', 'copy:js'));
};