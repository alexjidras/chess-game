module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    configureWebpack: config => {
        config.entry.app = [
            './src/renderer/main.js'
        ];
    }
}