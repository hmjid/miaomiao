import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import axios from 'axios'
Vue.prototype.axios =axios;

Vue.filter('setwh',(url,arg)=>{
	return url.replace(/w\.h/,arg);
})

import Scrollder from '@/components/Scrollder'
Vue.component('Scrollder',Scrollder)

import Loading from '@/components/Loading'
Vue.component('Loading',Loading)



Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
