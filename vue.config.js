const chainWebpack = require('./chainWebpack.config.js');
const backgroundMode = process.env.BACKGROUND_MODE;

const config = {
    devServer: {
        writeToDisk: true,
        hot: false,
        disableHostCheck: true,
    },
    filenameHashing: false,
    pages: {
        options: {
            entry: 'src/options/index.js',
            template: 'public/index.html',
            filename: 'options.html',
            title: 'Options',
        },
        popup: {
            entry: 'src/popup/index.js',
            template: 'public/index.html',
            filename: 'popup.html',
            title: 'Popup',
        },
    },
    css: {
        extract: true,
    },
    chainWebpack,
}

if (backgroundMode === 'html') {
    config.pages['background'] = {
        entry: 'src/background/index.js',
        template: 'public/index.html',
        filename: 'background.html',
        title: 'Background',
    }
}

module.exports = config;
