const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';
const platform = process.env.PLATFORM || 'desktop';
const ROOT_DIR = process.cwd();
const outDir = path.resolve(ROOT_DIR, "bin/");

const isProduction = nodeEnv === 'production';
const isMobile = platform === 'mobile';

const plugins = [new webpack.NoEmitOnErrorsPlugin(), new webpack.DefinePlugin({
    __PROD__: isProduction, __PLATFORM__: `"${platform}"`, __MOBILE__: isMobile, __DESKTOP__: !isMobile, __DEV__: !isProduction
}), new webpack.ProvidePlugin({
    PIXI: 'pixi.js'
}), new WebpackOnBuildFinishPlugin(onFinish)];
if (isProduction) {
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true, debug: !isProduction
    }));

    plugins.push(new UglifyJsPlugin({
        uglifyOptions: {
            parse: {
                // parse options
            }, compress: {
                // compress options
                sequences: true, booleans: true, loops: true, unused: true, drop_console: true, unsafe: true, passes: 2
            }, output: {
                // output options
            }, sourceMap: false, nameCache: null, // or specify a name cache object
            toplevel: false, warnings: false
        }
    }));
}

const entry = {
    ["game"]: [`${ROOT_DIR}/src/index.ts`]
};

const baseModule = {
    context: ROOT_DIR, entry, mode: isProduction ? 'production' : 'development', output: {
        path: outDir, publicPath: "/", filename: `[name].js`
    }, devtool: isProduction ? 'none' : 'source-map', module: {
        rules: [{
            enforce: 'pre', test: /\.js$/, use: 'source-map-loader'
        }, {
            test: /\.ts$/, use: `ts-loader`, exclude: /node_modules/
        }, {
            test: /\.html$/, use: "dot-loader"
        }, {
            test: /.(png|jpg)$/, use: 'file-loader?name=img/[name].[ext]'
        }]
    }, devServer: {
        open: true, contentBase: outDir, watchContentBase: true, port: process.env.PORT || 3000
    },

    node: {
        setImmediate: false, dgram: 'empty', fs: 'empty', net: 'empty', tls: 'empty', child_process: 'empty'
    },

    plugins
};

function onFinish(stats) {
}

function WebpackOnBuildFinishPlugin(callback) {
    this.callback = callback;
}

WebpackOnBuildFinishPlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', this.callback);
};

module.exports = baseModule;