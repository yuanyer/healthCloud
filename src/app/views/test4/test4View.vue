<template>
    <div>
        <div>test4 page</div>
        <div>参数</div>
        <span>
            {{ param }}
        </span>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                param:this.$router.currentRoute.params
            }
        },
        created(){
            console.log(this.$router.currentRoute)
        }
    }
</script>
