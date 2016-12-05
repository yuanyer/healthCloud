/**
 * Created by zhangyuanyuan031 on 2016/12/5.
 */
import {login} from "../../apis/mylogin.api"
export default {
    actions: {
        login({commit}, options){
            console.log(options)
            login(options).then((req) => {
                let data = req.body.result;
                console.log(data);
                if (data.username == options.username && data.pwd == options.pwd) {
                    options.router.replace("/test")
                }else{
                    alert("没有成功")
                }
            })
        }
    }
}


