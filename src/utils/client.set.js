/**
 * Created by ZHANGYUANYUAN031 on 2016-08-15.
 * 客户端公共设置
 */
"use strict";
let gWidth = document.body.clientWidth, gPicWidth = 750, gmax = gWidth / gPicWidth * 20;
if (gmax > 14) gmax = 14;
gmax = parseInt(gmax);
document.body.style.fontSize = gmax + "px";
document.documentElement.style.fontSize = gmax + "px";
export function fontSize() {
    return gmax
}

