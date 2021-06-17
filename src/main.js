import 'mdb-vue-ui-kit/css/mdb.min.css'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import studentslist from './components/studentslist.vue'
import postcomp from './components/postcomp.vue'
import fees from './components/fees.vue'
import teacherpost from './components/teacherpost.vue'
import searchteacher from './components/searchteacher.vue'
import calc from './components/calc.vue'
import results from './components/results.vue'
import login from './components/login.vue'
import home from './components/home.vue'





import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter);
const routes=[
  {path:'/studentdetail/:searchitem',component:studentslist,props:true},
  {path:'/post',component:postcomp},
  {path:"/teacher",component:teacherpost},
  {path:"/tsearch",component:searchteacher},
  {path:"/calc",component:calc},
  {path:"/login",component:login},
  {path:'/studentslist/:name',component:postcomp,props:true},
  {path:"/",component:home},
  {path:"/fee/:roll",component:fees,props:true},
  {path:"/result/:searchroll",component:results,props:true},
 

]
const router=new VueRouter({
  routes
})

import store from './store/index.js'
Vue.config.productionTip = false
new Vue({
  router: router,
  store,
  render: h => h(App),
}).$mount('#app')
