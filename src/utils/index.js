import {environment} from '../../config/config'
import flag from '../../config/temp'

/**
 * 格式化时间方法
 * @param date 时间对象
 * @param fmt MM DD HH MM ss QQ SS
 * @returns {*}
 */
export function dateFormat(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export function equipment() {
    var ua = navigator.userAgent,
        android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    // Android
    if (android) {
        return "android";
    }
    if (ipad || iphone || ipod) {
        return "ios";
    }
    return "pc"
}


/**
 * 根据不同的包攻取不同的访问路径
 * @param protocol 协议
 * @param port 端口
 * @returns {*} gPath 公共的访问路径
 */
export function gPath(protocol = "http", port) {
    let path;
    if (equipment() === "ios") {
        protocol = "https";
    }
    switch (flag) {
        case "test":
            port = port || environment.test.port;
            path = protocol + "://" + environment.test.domain + ":" + port + "/";
            break;
        case "production":
            port = port || environment.product.port;
            path = protocol + "://" + environment.product.domain + ":" + port + "/";
            break;
        default:
            port = port || environment.develop.port;
            path = protocol + "://" + environment.develop.domain + ":" + port + "/";
            break;
    }
    return path;
}

export function isPrd() {
    return process.env.NODE_ENV === 'production'
}

// localStorage
export const ls = {
    put (key, value) {
        if (!key || !value) {
            return
        }
        window.localStorage[key] = JSON.stringify(value)
    },
    get (key) {
        if (!key) {
            return null
        }
        const vTemp = window.localStorage[key]
        if (!vTemp) {
            return null
        }
        return JSON.parse(window.localStorage[key])
    }
}

export const isArray = Array.isArray

export function isString(val) {
    return typeof val === 'string'
}

export function isBoolean(val) {
    return val === true || val === false
}

export function isFunction(val) {
    return typeof val === 'function'
}

export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

export function isPlainObject(obj) {
    return isObject(obj) && Object.prototype.toString.call(obj) === '[object Object]'
}




