export default [
    {
        path: 'index',
        fullPath: '/robot/index',
        name: 'robotIndex',
        label: '机器人',
        component: () => import('./components/index')
    },
    {
        path: 'my-robot',
        fullPath: '/robot/my-robot',
        name: 'myRobot',
        label: '我的机器人',
        component: () => import('./components/my-robot')
    },
    {
        path: 'robot-withdraw',
        fullPath: '/robot/robot-withdraw',
        name: 'robotWithdraw',
        label: '机器人提现',
        component: () => import('./components/robot-withdraw')
    },
    {
        path: 'robot-deposit',
        fullPath: '/robot/robot-deposit',
        name: 'robotDeposit',
        label: '机器人转入',
        component: () => import('./components/robot-deposit')
    },
    {
        path: 'robot-detail',
        fullPath: '/robot/robot-detail',
        name: 'robotDetail',
        label: '机器人详情',
        component: () => import('./components/robot-detail')
    },
    {
        path: 'robot-buy',
        fullPath: '/robot/robot-buy',
        name: 'robotBuy',
        label: '机器买入',
        component: () => import('./components/robot-buy')
    },
]