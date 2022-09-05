export default [
    {
        path: 'robot-index',
        fullPath: '/robot/robot-index',
        name: 'RobotIndex',
        label: '机器人首页',
        component: () => import('@/views/robot/components/robot-index')
    },
    {
        path: 'my-robot',
        fullPath: '/robot/my-robot',
        name: 'MyRobot',
        label: '我的机器人',
        component: () => import('@/views/robot/components/my-robot')
    },
    {
        path: 'robot-withdraw',
        fullPath: '/robot/robot-withdraw',
        name: 'RobotWithdraw',
        label: '机器人提现',
        component: () => import('@/views/robot/components/robot-withdraw')
    },
    {
        path: 'robot-deposit',
        fullPath: '/robot/robot-deposit',
        name: 'RobotDeposit',
        label: '机器人转入',
        component: () => import('@/views/robot/components/robot-deposit')
    },
    {
        path: 'robot-detail',
        fullPath: '/robot/robot-detail',
        name: 'RobotDetail',
        label: '机器人详情',
        component: () => import('@/views/robot/components/robot-detail')
    },
    {
        path: 'robot-buy',
        fullPath: '/robot/robot-buy',
        name: 'RobotBuy',
        label: '机器买入',
        component: () => import('@/views/robot/components/robot-buy')
    },
]
