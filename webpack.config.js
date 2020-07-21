const merge = require('webpack-merge');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const nodeModules = `${__dirname}/node_modules`;
const baseConfig = require(`${__dirname}/src/core/environment/webpack/base.config`);
const ROOT_DIR = process.cwd();

const libraries = [];
if (isProduction) {
    libraries.push(`${nodeModules}/gsap/src/minified/TweenMax.min.js`);
    libraries.push(`${nodeModules}/howler/dist/howler.min.js`);
    libraries.push(`${nodeModules}/pixi.js/dist/pixi.min.js`);
    libraries.push(`${__dirname}/lib/PIXI.TextInput.min.js`);
    console.log("PRODUCTION");
} else {
    libraries.unshift(`${nodeModules}/fpsmeter/dist/fpsmeter.min.js`);
    libraries.push(`${nodeModules}/gsap/src/uncompressed/TweenMax.js`);
    libraries.push(`${nodeModules}/howler/dist/howler.min.js`);
    libraries.push(`${nodeModules}/pixi.js/dist/pixi.js`);
    libraries.push(`${__dirname}/lib/PIXI.TextInput.js`);
    console.log("DEVELOP");
}

const excludedClasses = [
    // /{className}\w+/,
];

baseConfig.plugins.push(
    new webpack.DefinePlugin({
        __BUILDNAME__: JSON.stringify("index")
    }));

baseConfig.entry = {
    ["index"]: [
        `${ROOT_DIR}/src/index.ts`
    ]
};

baseConfig.entry["index"].unshift(...libraries);


module.exports = merge(baseConfig, {
    module: {
        rules: (() => excludedClasses.map(regexp => ({ test: regexp, use: 'null-loader' })))()
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
});