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
    {
        path: 'money-rule',
        fullPath: '/mine/money-rule',
        name: 'moneyRule',
        label: '押金规则',
        component: () => import('../hall/components/money-rule')
    },
    {
        path: 'task-assistant',
        fullPath: '/mine/task-assistant',
        name: 'taskAssistant',
        label: '任务助手',
        component: () => import('../hall/components/task-assistant')
    },
]