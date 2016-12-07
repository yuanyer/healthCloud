<template>
    <div>
        <div>
            <label>用户名：</label><span>{{ name }}</span>
            <label>密码：</label><span>{{ pwd }}</span>
        </div>
        <ul>
            <li>
                <router-link to="/test2">success</router-link>
            </li>
        </ul>
        <button v-on:click="clickme">点一下</button>
    </div>
</template>
<script>
    import {mapActions,mapState} from 'vuex'
    export default {
        computed:mapState({
            name(state){
                return state.LoginSuccess.name
            },
            pwd(state){
             return state.LoginSuccess.pwd
            }
        }),
        methods:{
            ...mapActions(["loginSuccess"]),
            clickme(){
                this.$router.replace("/test2")
            }
        },
        created(){
            this.$store.dispatch("loginSuccess")
        }
    }


</script>

