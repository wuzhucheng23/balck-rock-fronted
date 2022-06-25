import Vue from 'vue'

// 底部导航栏
import TabBar from './tab-bar'
Vue.component('tab-bar', TabBar)

// 顶部导航栏
import NavBar from './nav-bar'
Vue.component('nav-bar', NavBar)

// 回到顶部
import BackTop from './back-top'
Vue.component('back-top', BackTop)

// 结果弹窗
import ResultDialog from './result-dialog'
Vue.component('result-dialog', ResultDialog)
