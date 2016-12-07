/**
 * Created by zhangyuanyuan031 on 2016/12/7.
 */
import {getLoginInfo} from '../../apis/login-success.api'
export default {
    state:{
        name:"",
        pwd:""
    },
    mutations:{
        setState(state,obj){
            state.name=obj.name;
            state.pwd=obj.pwd
        }
    },
    actions:{
        loginSuccess({commit,state},options){
            getLoginInfo().then(data => {
                let res=data.body;
                commit("setState",res);
                console.log(state)
            }).catch(res=>{
                console.log(res)
            })
        }
    }
}

