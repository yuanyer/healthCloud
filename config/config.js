/**
 * Created by ZHANGYUANYUAN031 on 2016-08-23.
 * 配制文件
 */
"use strict";
module.exports = {
    version:"1.5.0",//版本名称
    webapp: "webapp", //生成打包目录
    zip:"zip",//打包目录
    packName:"hmcp-hp",//打包文件名
    environment: {
        develop: { //开发环境个人开发用
            port: "80",
            domain: "localhost"
        },
        test: { //测试环境
            port: "80",
            domain: "test-api-health-cloud.pingan.com.cn"
        },
        product: { //生产环境
            port: "80",
            domain: "api-health-cloud.pingan.com.cn"
        }
    }
};
