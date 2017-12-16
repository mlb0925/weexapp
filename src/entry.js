/**
 * Created by zwwill on 2017/8/28.
 */
import App from './App.vue'
import router from './router'
// import { sync } from 'vuex-router-sync'
import * as filters from './filters'
import mixins from './mixins'

//在入口文件中引入文件并将变量挂到全局
import defines from './defines'
Object.keys(defines).forEach((key)=>{
    Vue.prototype[key] = defines[key]
})

// sync the router with the vuex store.
// this registers `store.state.route`
// sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)

import VueResource from 'vue-resource'
Vue.use(VueResource)
// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
new Vue(Vue.util.extend({ el: '#root', router }, App));

router.push('/');
