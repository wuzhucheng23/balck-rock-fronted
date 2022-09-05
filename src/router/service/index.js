export default [
    {
        path: 'service-index',
        fullPath: '/service/service-index',
        name: 'ServiceIndex',
        label: '客服首页',
        component: () => import('@/views/service/components/service-index')
    },
    {
        path: 'problem-detail',
        fullPath: '/service/problem-detail',
        name: 'ProblemDetail',
        label: '问题详情',
        component: () => import('@/views/service/problem-detail')
    }
]
