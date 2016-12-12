/**
 * Created by zhyy on 2016/12/4.
 *
 * 打包文件
 */


require('./check-versions')()
require('shelljs/global')
// process.env.NODE_ENV = 'test'

console.log("开启模式: \x1b[32m" + env.NODE_ENV + "\x1b[0m" + "模式……")

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log(
    '  Tip:\n' +
    '  Built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', config.build.assetsRoot)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

// webpackConfig.output.publicPath = 'http://ofxtpy1bg.bkt.clouddn.com/'
webpackConfig.output.publicPath = './'

webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n')
})


