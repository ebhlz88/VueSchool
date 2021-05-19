import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import studentslist from './components/studentslist.vue'
import postcomp from './components/postcomp.vue'
import delet from './components/delet.vue'
import fees from './components/fees.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter);
const routes=[
  {path:'/studentslist',component:studentslist},
  {path:'/post',component:postcomp},
  {path:"/delet",component:delet},
  {path:"/fees",component:fees}

]
const router=new VueRouter({
  routes
})
Vue.config.productionTip = false
new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
