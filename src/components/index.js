import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breatCrumb from './common/bread-crumb'

// 所有自定义组件的插件
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside) // 注册 左侧导航组件
    Vue.component('layout-header', layoutHeader) // 注册 头部组件
    Vue.component('bread-crumb', breatCrumb) // 注册面包屑组件
  }
}
