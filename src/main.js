import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 引入全局样式
import '@/theme/global-reset.css'
import '@/theme/global-class.css'

// 引入vant组件库
import '@/plugins/vant-ui'

// 引入api
import * as api from '@/api'
Vue.prototype.$api = api

// 引入工具函数
import utils from './utils'
Vue.prototype.$utils = utils

// 引入公共组件
import '@/components'

// 引入vue-video-player
import '@/plugins/vue-video-player'

// 引入设备检测插件
import '@/plugins/vue-device-detector'

// 引入i18n
import i18n from "@/plugins/vue-i18n";

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
