import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import './style/index.less' // 引入初始化样式

import axios from 'axios'
Vue.prototype.$http = axios // 给Vue对象的原型竖向赋值 那么所有vue实例自动拥有$http
axios.defaults.baseURl = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册elementUI组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
