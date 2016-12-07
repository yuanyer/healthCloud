/**
 * Created by zhangyuanyuan031 on 2016/12/7.
 */
import {login} from "../../apis/mylogin.api"
export default {
    actions: {
        login({commit}, options){
            login(options).then((req) => {
                let data = req.body.result;
                console.log(data);
                if (data.username == options.username && data.pwd == options.pwd) {
                    options.router.replace("/test1")
                }else{
                    alert("没有成功")
                }
            })
        }
    }
}
