import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
//import socket from './plugins/socket' // colocamos las configuracion de socket
import '@mdi/font/css/materialdesignicons.css'
import VueOnlineProp from "vue-online-prop"
import CryptoJS from 'crypto-js'


//Vue.prototype.$socket = socket // con este le damos un nombre global al socket para acederelo this.$socket
Vue.prototype.$CryptoJS = CryptoJS
Vue.prototype.$keyCryp = '111222333444'
Vue.use(VueOnlineProp)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
