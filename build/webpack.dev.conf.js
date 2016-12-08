var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

/*begin changed*/

var webpackConfig = {
    module: {
        loaders: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: 'src/assets/favicon.ico',
            inject: true
        })
    ]
}

var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
webpackConfig.plugins.push(
    new BrowserSyncPlugin({
        port: 8000,
        //proxy: "test-api-health-cloud.pingan.com.cn",
        proxy: "localhost:3000",
        ui: {
            port: 8888,
            weinre: {
                port: 9090
            }
        },
        files:["/src/**/*.js", "/src/**/*.vue", "/src/**/*.css", "/src/**/*.less"],
        watchOptions: {
            ignoreInitial: true,
            ignored: '/node_modules/**/*.*'
        },
        logLevel: "debug",
        logPrefix: "我的项目测试log:",
        logConnections: true
        //startPath:"./index.html" //启动时开始目录
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
);


/*end changed*/

var allCfg = merge(baseWebpackConfig, webpackConfig)
module.exports = allCfg
