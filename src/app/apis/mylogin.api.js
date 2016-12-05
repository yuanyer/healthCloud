/**
 * Created by zhangyuanyuan031 on 2016/12/5.
 */

import Vue from 'vue'

export function login(parame) {
    return Vue.http.get(Vue.getUrl({
        url:"/mock/login.do",
        mockUrl:"/login.json",
        mock:true
    }),parame).then((data)=>{
        return data
    }).catch((res)=>{
        return res
    })
}



