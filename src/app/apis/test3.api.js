/**
 * Created by zhangyuanyuan031 on 2016/12/7.
 */
import Vue from 'vue'
export default function () {
    return Vue.http.get("/mock/test3.json").then(data=>data).then(res => res)
}
