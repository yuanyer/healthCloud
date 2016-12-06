/**
 * Created by zhangyuanyuan031 on 2016/12/5.
 */

import Vue from 'vue'
import {gPath} from 'utils'
let path=gPath();
export function login(parame) {
    return Vue.http.get(Vue.getUrl({
        url:path+"/mock/login.do",
        mockUrl:"/login.json",
        mock:true
    }),parame).then((data)=>{
        return data
    }).catch((res)=>{
        return res
    })
}



