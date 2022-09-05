export default [
    {
        path: 'login-index',
        fullPath: '/login/login-index',
        name: 'LoginIndex',
        label: '登陆首页',
        component: () => import('@/views/login/components/login-index')
    },
    {
        path: 'register-account',
        fullPath: '/login/register-account',
        name: 'RegisterAccount',
        label: '注册账号',
        component: () => import('@/views/login/components/register-account')
    },
    {
        path: 'forget-password',
        fullPath: '/login/forget-password',
        name: 'ForgetPassword',
        label: '忘记密码',
        component: () => import('@/views/login/components/forget-password')
    },
]
