const webpack = require('webpack');
const path = require('path');
const nodeEnv = process.env.NODE_ENV || 'development';
const platform = process.env.PLATFORM || 'desktop';
const rootDirectory = process.cwd();
const buildDirectory = path.resolve(rootDirectory, "bin/");
const isProduction = nodeEnv === 'production';

const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ __PROD__: isProduction, __PLATFORM__: `"${platform}"`, __DEV__: !isProduction }),
    new webpack.ProvidePlugin({ PIXI: 'pixi.js' })
];
if (isProduction) {
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true, debug: !isProduction }));
}

const webpackModule = {
    entry: [`${rootDirectory}/src/index.ts`],
    context: rootDirectory,
    mode: isProduction ? 'production' : 'development',
    output: {
        path: buildDirectory,
        publicPath: "/",
        filename: `[name].js`
    },
    devtool: isProduction ? 'none' : 'source-map',
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.js$/, use: 'source-map-loader' },
            { test: /\.ts$/, use: `ts-loader`, exclude: /node_modules/ },
            { test: /\.html$/, use: "dot-loader" },
            { test: /.(png|jpg)$/, use: 'file-loader?name=img/[name].[ext]' }]
    },
    devServer: {
        open: true,
        contentBase: buildDirectory,
        watchContentBase: true,
        port: 3000
    },
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    plugins
};

module.exports = webpackModule;