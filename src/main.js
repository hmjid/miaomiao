import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import axios from 'axios'
Vue.prototype.axios =axios;

Vue.filter('setWH',(url , arg)=>{
    return url.replace(/w\.h/,arg);
});

import Scrollder from '@/components/Scrollder'
Vue.component('Scrollder',Scrollder)

import Loading from '@/components/Loading'
Vue.component('Loading',Loading)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
