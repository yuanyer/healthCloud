<template>
    <div>
        我是test3
        <span>
            {{ test1 }}
        </span>
        <span>
            {{ test2 }}
        </span>
        <span>
            query part
        </span>
        <span>
            {{ query }}
        </span>

        <h2>
            <router-link to="/test4/zhyuanyuan">项目中传参数也可以这么做</router-link>
        </h2>

    </div>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        data(){
            return {
                query : this.$router.currentRoute.query
            }
        },
        computed:{
            ...mapState({
                test1(state){
                    return state.Test2AndTest3.testData1
                },
                test2(state){
                    return state.Test2AndTest3.testData2
                }
            })
        },
        created(){
            console.log( this.$router.currentRoute.query )
            this.$store.dispatch("test2Action")
            this.$store.dispatch("test3Action")
        }
    }

</script>
