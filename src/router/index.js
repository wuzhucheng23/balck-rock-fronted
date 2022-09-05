import Vue from 'vue'
import VueRouter from 'vue-router'
import loginChildren from '@/router/login'
import homeChildren from '@/router/home'
import hallChildren from '@/router/hall'
import robotChildren from '@/router/robot'
import serviceChildren from '@/router/service'
import mineChildren from '@/router/mine'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        fullPath: '/login',
        name: 'Login',
        label: '登陆模块',
        component: () => import('@/views/login/login-view'),
        redirect: '/login/login-index',
        children: loginChildren
    },
    {
        path: '/home',
        fullPath: '/home',
        name: 'Home',
        label: '首页模块',
        component: () => import('@/views/home/home-view'),
        redirect: '/home/home-index',
        children: homeChildren
    },
    {
        path: '/hall',
        fullPath: '/hall',
        name: 'Hall',
        label: '大厅模块',
        component: () => import('@/views/hall/hall-view'),
        redirect: '/hall/hall-index',
        children: hallChildren
    },
    {
        path: '/robot',
        fullPath: '/robot',
        name: 'Robot',
        label: '机器人模块',
        component: () => import('@/views/robot/robot-view'),
        redirect: '/robot/robot-index',
        children: robotChildren
    },
    {
        path: '/service',
        fullPath: '/service',
        name: 'Service',
        label: '客服模块',
        component: () => import('@/views/service/service-view'),
        redirect: '/service/service-index',
        children: serviceChildren
    },
    {
        path: '/mine',
        fullPath: '/mine',
        name: 'Mine',
        label: '我的模块',
        component: () => import('@/views/mine/mine-view'),
        redirect: '/mine/mine-index',
        children: mineChildren
    }
]

const router = new VueRouter({
    routes
})

export default router
