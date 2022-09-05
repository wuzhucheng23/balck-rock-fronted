import Vue from 'vue';
import App from './App.vue';
import router from './router';  // 引入路由
import store from './store';    // 引入仓库
import i18n from './locale';    // 引入多语言
import '@/api';  // 引入api
import '@/components';   // 引入全局组件
import '@/plugins';  // 引入相关插件
import '@/style';    // 引入主题样式
import '@/utils';    // 引入工具函数

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
