/*
 * @Author: Jack
 * @Date: 2019-04-04 22:12:42
 * @LastEditors: Jack
 * @LastEditTime: 2019-11-05 18:10:39
 * @Description:
 */
import Vue from 'vue'
import '@/styles/normalize/base.scss' // global css
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './layout/Index'
import router from './router'
import store from './vuex/store'
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
