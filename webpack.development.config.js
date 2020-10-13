const nodeModules = `${__dirname}/node_modules`;
const baseWebpackConfig = require(`${__dirname}/core/data/webpack/webpack.base.config`);
const developmentLibraries = [
    `${nodeModules}/fpsmeter/dist/fpsmeter.min.js`,
    `${nodeModules}/gsap/src/index.js`,
    `${nodeModules}/howler/dist/howler.core.min.js`,
    `${nodeModules}/pixi.js/dist/pixi.js`,
    `${__dirname}/core/lib/PIXI.TextInput.js`
];

baseWebpackConfig.entry.unshift(...developmentLibraries);

module.exports = baseWebpackConfig;