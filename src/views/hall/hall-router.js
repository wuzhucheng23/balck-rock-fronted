export default [
    {
        path: 'index',
        fullPath: '/hall/index',
        name: 'hallIndex',
        label: '大厅',
        component: () => import('./components/index')
    },
    {
        path: 'grab-order',
        fullPath: '/hall/grab-order',
        name: 'grabOrder',
        label: '抢单',
        component: () => import('./components/grab-order')
    },
    {
        path: 'commit-order',
        fullPath: '/hall/commit-order',
        name: 'commitOrder',
        label: '提交订单',
        component: () => import('./components/commit-order')
    },
]