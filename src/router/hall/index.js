export default [
    {
        path: 'hall-index',
        fullPath: '/hall/hall-index',
        name: 'HallIndex',
        label: '大厅首页',
        component: () => import('@/views/hall/components/hall-index')
    },
    {
        path: 'grab-order',
        fullPath: '/hall/grab-order',
        name: 'GrabOrder',
        label: '抢单',
        component: () => import('@/views/hall/components/grab-order')
    },
    {
        path: 'commit-order',
        fullPath: '/hall/commit-order',
        name: 'CommitOrder',
        label: '提交订单',
        component: () => import('@/views/hall/components/commit-order')
    },
    {
        path: 'task-assistant',
        fullPath: '/mine/task-assistant',
        name: 'TaskAssistant',
        label: '任务助手',
        component: () => import('@/views/hall/components/task-assistant')
    },
]
