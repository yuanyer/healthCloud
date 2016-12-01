// import 'utils/fontset'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import MintUI from 'mint-ui'
import FastClick from 'fastclick'
import '../assets/iconfont/iconfont.css'
import '../styles/common.less'
import '../styles/border.less'
import '../styles/mint-override.less'
import App from './index.vue'
import httpconfig from '../utils/httpconfig'
import 'utils/filters'
import 'utils/fontset'
import {Loading} from 'components'
import {isFunction, isPrd} from 'utils'
import {setBarTitle, checkLogin} from 'utils/appUtil'
import {checkSignParams} from 'utils/channelInfoHandlers'

Vue.use(Vuex)

const logger = createLogger({
    collapsed: false,
    transformer (state) {
        return state
    },
    mutationTransformer (mutation) {
        return mutation.type
    }
})

export default function ({router = {}, stores, urlTables}) {
    Vue.use(VueRouter)
    Vue.use(MintUI)
    FastClick.attach(document.body)
    const Router = new VueRouter({
        mode: 'hash',
        // base: __dirname,
        routes: router.routes
    })

    Router.beforeEach((to, from, next) => {
        Loading.close()
        if (to.meta.title && to.meta.title !== from.meta.title) {
            setBarTitle(to.meta.title)
        }

        if (to.meta.channelCheck) {
            if (!checkSignParams(to)) {
                next(to.meta.channelCheck.fail)
                return
            }
        }

        if (to.meta.auth) {
            const hasLogin = checkLogin()
            if (hasLogin) {
                next()
                return
            }

            if (isFunction(to.meta.auth.fail)) {
                to.meta.auth.fail(next)
            } else {
                next(to.meta.auth.fail)
            }
        } else {
            next()
        }
    })

    if (router.beforeEach) {
        router.beforeEach.forEach(f => {
            if (isFunction(f)) {
                Router.beforeEach(f)
            }
        })
    }

    const store = new Vuex.Store({
        modules: {
            ...stores
        },
        strict: process.env.NODE_ENV !== 'production',
        plugins: isPrd() ? [] : [logger]
    })

    httpconfig(urlTables)

    App.store = store
    new Vue({
        router: Router,
        render: h => h(App)
    }).$mount('#app')
    window.router = Router
}
