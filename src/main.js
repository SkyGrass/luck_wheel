import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
import lottery from 'vue-lottery'
Vue.use(lottery)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
