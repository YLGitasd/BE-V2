// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import '../element-variables.scss'
import vueECharts from 'vue-echarts'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI, {size: 'small'})
Vue.component('vueEcharts', vueECharts)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
