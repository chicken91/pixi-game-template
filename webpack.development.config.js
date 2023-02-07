const nodeModules = `${__dirname}/node_modules`;
const { merge } = require('webpack-merge');
const baseWebpackConfig = require(`${__dirname}/core/data/webpack/webpack.base.config`);
const developmentLibraries = [
    `${nodeModules}/fpsmeter/dist/fpsmeter.min.js`,
    `${nodeModules}/gsap/src/index.js`,
    `${nodeModules}/howler/dist/howler.core.min.js`
];

baseWebpackConfig.entry.unshift(...developmentLibraries);
const devWebpackConfig = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        open: true,
        contentBase: baseWebpackConfig.output.path,
        watchContentBase: true,
        port: 3000
    }
};

module.exports = merge(baseWebpackConfig, devWebpackConfig);