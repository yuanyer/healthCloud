/**
 * Created by zhangyuanyuan031 on 2016/12/6.
 */
import IndexView from '../../views/IndexView.vue'
export default [{
    path: '/',
    component: IndexView,
    beforeEnter: (to, from, next) => {
        next()
    }
}]
