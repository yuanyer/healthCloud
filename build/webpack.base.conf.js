'use strict'
var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

/*begin changed*/
// 设置环境
var fs = require("fs"),Glob = require("glob").Glob;
fs.writeFileSync("./config/temp.js", "module.exports='" + env + "'");

let mergeFiles=(rm,search,isRouter)=>{
    if(fs.existsSync(rm))
        fs.unlinkSync(rm);

    let routerFiles = new Glob(search, {sync: true}).found;
    if(routerFiles.length > 0){
        let content=[],importFiles=[];
        routerFiles.forEach(item=>{
            let relativePath;
            if(isRouter){
                relativePath=item.replace("./src/app/routers/","");
            }else{
                relativePath=item.replace("./src/app/vuex/","");
            }
            let routerName=relativePath.split("/")[0];
            importFiles.push("import " + routerName + " from './"+relativePath+"'");
            content.push("..."+routerName);
        })
        if(isRouter){
            fs.writeFileSync(rm,importFiles.join(";") + "; export default [" +content.join(", ") + "]")
        }else{
            fs.writeFileSync(rm,importFiles.join(";") + "; export default {" +content.join(", ") + "}")
        }
    }
};

mergeFiles("./src/app/routers/index.js","./src/app/routers/**/index.js",true);
mergeFiles("./src/app/vuex/index.js","./src/app/vuex/**/index.js");

/*end changed*/

module.exports = {
    entry: {
        app: './src/app/index.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue', "css", "less"],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'utils': path.resolve(__dirname, '../src/utils')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: useCssSourceMap
        }),
        postcss: [
            require('autoprefixer')({
                browsers: ['last 2 versions']
            })
        ]
    }
}
