import Vue from 'vue';
import TabBar from '@/components/global-components/tab-bar';
import NavBar from '@/components/global-components/nav-bar';
import BackTop from '@/components/global-components/back-top';
import ResultDialog from '@/components/global-components/result-dialog';

// 注册全局组件
Vue.component('tab-bar', TabBar);   // 底部导航栏
Vue.component('nav-bar', NavBar);   // 顶部导航栏
Vue.component('back-top', BackTop); // 回到顶部
Vue.component('result-dialog', ResultDialog);   // 结果弹窗
