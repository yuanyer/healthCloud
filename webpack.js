/**
 * Created by zhangyuanyuan031 on 2016/12/2.
 */

"use strict";
//引用库文件
let path = require('path'), webpack = require('webpack'), fs = require("fs"),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');
//臭探所有入口文件
let env = process.env.NODE_ENV || "development";

console.log("开启模式: \x1b[32m" + env + "\x1b[0m" + "模式……");

//臭探ctrl+s 要监听文件
let aResource = ["./src/**/*.js","./src/**/*.vue","./src/**/*.css","./src/**/*.less"];

//入口文件

let enter={
    app:'./src/app/index.js',
    "clent-mytest":"webpack-hot-middleware/client"
};

let obj = {
    // devtool: 'cheap-module-eval-source-map',
    app: enter,
    output: {
        path: path.join(__dirname, "/webapp"),
        filename: '[name].js',
        publicPath: "/hmcp-hp"
    },
    plugins: [
        // 将代码中的process.env.NODE_ENV替换为production，方便webpack压缩代码
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(env)
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.css','.vue',"less"],  //自动补全识别后缀
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue',
            'src': path.resolve(__dirname, './src'),
            'assets': path.resolve(__dirname, './src/assets'),
            'components': path.resolve(__dirname, './src/components'),
            'utils': path.resolve(__dirname, './src/utils')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, './node_modules')]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: path.resolve(__dirname, 'node_modules/'),
                query: {
                    presets: ['es2015']
                },
                include: path.resolve(__dirname)
            },
            {
                test: require.resolve('zepto'),
                loader: 'exports?window.$!script'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    }

   /* module: {
        preLoaders: [{
            test: /\.vue$/,
            loader: 'eslint',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            loader: 'eslint',
            include: projectRoot,
            exclude: /node_modules/
        }],
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
    },*/

};


//设置全局模式
fs.writeFileSync("./config/temp.js", "var env='" + env + "';module.exports=env;");
if (env === 'production') {
    obj.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        })
    );
    //去掉测试代码
    delete  enter["clent-mytest"];
} else {
    obj.plugins.push(
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
            files: aResource,
            watchOptions: {
                ignoreInitial: true,
                ignored: '/node_modules/**/*.*'
            },
            logLevel: "debug",
            logPrefix: "我的项目测试log:",
            logConnections: true
            //startPath:"./index.html" //启动时开始目录
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()

    );
    // 开启sourcemap
    obj.devtool = "source-map";
}
module.exports = obj;




