<template>
<div class="home-view">
    <cell is-link title="家庭联系人" @click.native="skip('/optLogin')"></cell>
</div>
</template>
<script>
import {Cell, MessageBox} from 'mint-ui'
import {ls} from 'utils'

const TOKEN_NAME = 'SYSTEM_TOKEN'
export default {
    components: {
        Cell, MessageBox
    },
    methods: {
        skip (path, input) {
            if (input) {
                MessageBox.prompt(' ', '输入参数').then(({value}) => {
                    path = path.replace(/:[^/\s]+/, value)
                    this.$router.push(path)
                })
            } else {
                this.$router.push(path)
            }
        },
        token () {
            MessageBox.prompt(' ', '输入Token').then(({value}) => {
                ls.put(TOKEN_NAME, value)
            })
        }
    }
}
</script>
