/**
 * Created by zhangyuanyuan031 on 2016/12/7.
 */
import Vue from 'vue'
export function getLoginInfo() {
    return Vue.http.get("/mock/loginSuccess.json",{}).then((data)=> {
        console.log(data)
        return data
    }).catch((res)=> {
        return res
    })

}
