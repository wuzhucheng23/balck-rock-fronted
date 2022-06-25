export default [
    {
        path: 'index',
        fullPath: '/login/index',
        name: 'loginIndex',
        label: '登陆',
        component: () => import('./components/index')
    },
    {
        path: 'register',
        fullPath: '/login/register',
        name: 'register',
        label: '注册',
        component: () => import('./components/register')
    },
    {
        path: 'forget-password',
        fullPath: '/login/forget-password',
        name: 'forgetPassword',
        label: '忘记密码',
        component: () => import('./components/forget-password')
    },
]