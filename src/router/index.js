import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import loginRouter from '@/views/login/login-router'
import homeRouter from '@/views/home/home-router'
import hallRouter from '@/views/hall/hall-router'
import robotRouter from '@/views/robot/robot-router'
import serviceRouter from '@/views/service/service-router'
import mineRouter from '@/views/mine/mine-router'

const routes = [
  {
    path: '/',
    redirect: '/login/index'
  },
  {
    path: '/login',
    fullPath: '/login',
    name: 'login',
    label: '登陆路由',
    component: () => import('@/views/login/login-view'),
    redirect: '/login/index',
    children: loginRouter
  },
  {
    path: '/home',
    fullPath: '/home',
    name: 'home',
    label: '首页路由',
    component: () => import('@/views/home/home-view'),
    redirect: '/home/index',
    children: homeRouter
  },
  {
    path: '/hall',
    fullPath: '/hall',
    name: 'hall',
    label: '大厅路由',
    component: () => import('@/views/hall/hall-view'),
    redirect: '/hall/index',
    children: hallRouter
  },
  {
    path: '/robot',
    fullPath: '/robot',
    name: 'robot',
    label: '机器人路由',
    component: () => import('@/views/robot/robot-view'),
    redirect: '/robot/index',
    children: robotRouter
  },
  {
    path: '/service',
    fullPath: '/service',
    name: 'service',
    label: '客服路由',
    component: () => import('@/views/service/service-view'),
    redirect: '/service/index',
    children: serviceRouter
  },
  {
    path: '/mine',
    fullPath: '/mine',
    name: 'mine',
    label: '我的路由',
    component: () => import('@/views/mine/mine-view'),
    redirect: '/mine/index',
    children: mineRouter
  }
]

const router = new VueRouter({
  routes
})

export default router
