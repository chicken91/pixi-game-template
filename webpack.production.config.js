const nodeModules = `${__dirname}/node_modules`;
const baseWebpackConfig = require(`${__dirname}/core/data/webpack/webpack.base.config`);
const productionLibraries = [
    `${nodeModules}/gsap/src/index.js`,
    `${nodeModules}/howler/dist/howler.core.min.js`,
    `${nodeModules}/pixi.js/dist/pixi.min.js`,
    `${__dirname}/core/lib/PIXI.TextInput.min.js`
];

baseWebpackConfig.entry.unshift(...productionLibraries);

module.exports = baseWebpackConfig;