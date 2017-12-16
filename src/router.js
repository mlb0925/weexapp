/**
 * Created by zwwill on 2017/8/29.
 */
import Router from 'vue-router'
import ViewHome from './assets/views/home.vue'
import ViewMy from './assets/views/my.vue'
import ViewAll from './assets/views/all.vue'
import Viewdemo from './assets/views/demo.vue'
import Viewwebvive from './page/webview.vue'
import ViewTopbvive from './assets/views/top.vue'
import ViewNetwork from './assets/views/network.vue'

Vue.use(Router)


export default new Router({
    // mode: 'abstract',
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: ViewHome },
        { path: '/my', component: ViewMy },
        { path: '/demo', component: Viewdemo },
        { path: '/all', component: ViewAll },
        { path: '/webview', component: Viewwebvive },
        { path: '/top', component: ViewTopbvive },
        { path: '/network', component: ViewNetwork }
    ]
})