<template>
    <div>
        <img src="../../../images/ajax-loader.gif"/>
        <div>这是登录页面</div>
        <label for="username">用户名:</label>
        <input type="text" id="username" v-model="username"/>
        <label for="pwd">密码</label>
        <input type="password" id="pwd" v-model="pwd"/>
        <button v-on:click="submit">提交</button>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                username:"",
                pwd:""
            }
        },
        methods:{
            submit(){
                this.$store.dispatch("login",{username:this.username,pwd:this.pwd,router:this.$router})
            }
        }
    }
</script>
