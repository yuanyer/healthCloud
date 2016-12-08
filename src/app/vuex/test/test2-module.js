/**
 * Created by zhyy on 2016/12/8.
 */

import Test2 from '../../apis/test2.api'
import Test3 from '../../apis/test3.api'

export default {
    state:{
        testData1:{},
        testData2:{}
    },
    mutations:{
        test1Mutation(state,obj){
            state.testData1 = obj
        },
        test2Mutation(state,obj){
            state.testData2 = obj
        }
    },
    actions:{
        test2Action({commit}){
            Test2().then(res=>{
                console.log(res.body)
                commit("test1Mutation",res.body)
            })
        },
        test3Action({commit}){
            Test3().then(res => {
                console.log(res.body)
                commit("test2Mutation",res.body)
            })
        }
    }
}
