/**
 * Created by zhangyuanyuan031 on 2016/12/7.
 */
import Vue from 'vue'
export default function () {
    return Vue.http.get("/mock/test2.json").then(data=>{
        return data
    }).catch(res=>{
        return res
    })
}
