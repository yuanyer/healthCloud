import IndexView from '../views/IndexView.vue'
export default [{
    path: '/',
    component: IndexView,
    beforeEnter: (to, from, next) => {
        next()
    }
}]
