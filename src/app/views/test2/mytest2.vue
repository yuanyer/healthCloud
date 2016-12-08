<template>
    <div>
        <h2>test2 data is</h2>
        <span>{{ mydata }}</span>
        <ul>
            <li>
                <router-link :to="{path:'/test3',query:{ id: 'zhyuanyuan' }}">我是test2</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    import Test1 from '../../apis/test1.api'
    export default {
        data(){
            return {
                mydata:""
            }
        },
        created(){
           Test1().then(res => {
                let data= res.body;
                this.mydata=JSON.stringify(data)
           }).catch(res => {
                alert("请求有问题")
           })
        }
    }

</script>


