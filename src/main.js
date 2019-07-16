import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Trend from 'vuetrend'
import VueAnalytics from 'vue-analytics'
import infiniteScroll from "vue-infinite-scroll";

Vue.use(infiniteScroll);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(Trend)

Vue.use(VueAnalytics, {
  id: 'UA-143664405-1',
  router,
  autoTracking: {
    pageviewOnLoad: false
  }
})  