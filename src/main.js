import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import studentslist from './components/studentslist.vue'
import postcomp from './components/postcomp.vue'
import delet from './components/delet.vue'
import fees from './components/fees.vue'
import teacherpost from './components/teacherpost.vue'
import searchteacher from './components/searchteacher.vue'
import calc from './components/calc.vue'
import results from './components/results.vue'
import login from './components/login.vue'

import './plugins/echarts.js'


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter);
const routes=[
  {path:'/studentslist',component:studentslist,},
  {path:'/post',component:postcomp},
  {path:"/delet",component:delet},
  {path:"/fees",component:fees},
  {path:"/teacher",component:teacherpost},
  {path:"/tsearch",component:searchteacher},
  {path:"/calc",component:calc},
  {path:"/result",component:results},
  {path:"/login",component:login},
 

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
