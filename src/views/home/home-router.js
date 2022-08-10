export default [
    {
        path: 'index',
        fullPath: '/home/index',
        name: 'homeIndex',
        label: '首页',
        component: () => import('./components/index')
    },
    {
        path: 'recharge',
        fullPath: '/home/recharge',
        name: 'recharge',
        label: '充值',
        component: () => import('./components/recharge')
    },
    {
        path: 'recharge-confirm',
        fullPath: '/home/recharge-confirm',
        name: 'rechargeConfirm',
        label: '充值确认',
        component: () => import('./components/recharge-confirm')
    },
    {
        path: 'withdraw',
        fullPath: '/home/withdraw',
        name: 'withdraw',
        label: '提现',
        component: () => import('./components/withdraw')
    },
    {
        path: 'recode',
        fullPath: '/home/recode',
        name: 'recode',
        label: '记录',
        component: () => import('./components/recode')
    },
    {
        path: 'wallet',
        fullPath: '/home/wallet',
        name: 'wallet',
        label: '钱包',
        component: () => import('./components/wallet')
    },
    {
        path: 'add-wallet',
        fullPath: '/home/add-wallet',
        name: 'addWallet',
        label: '添加钱包',
        component: () => import('./components/add-wallet')
    },
    {
        path: 'edit-wallet',
        fullPath: '/home/edit-wallet',
        name: 'editWallet',
        label: '编辑钱包',
        component: () => import('./components/edit-wallet')
    },
    {
        path: 'my-team',
        fullPath: '/home/my-team',
        name: 'myTeam',
        label: '我的团队',
        component: () => import('./components/my-team')
    },
    {
        path: 'invite-friend',
        fullPath: '/home/invite-friend',
        name: 'inviteFriend',
        label: '邀请好友',
        component: () => import('./components/invite-friend')
    },
    {
        path: 'introduction',
        fullPath: '/home/introduction',
        name: 'introduction',
        label: '简介',
        component: () => import('./components/introduction')
    },
    {
        path: 'help',
        fullPath: '/home/help',
        name: 'help',
        label: '帮助',
        component: () => import('./components/help')
    },
    {
        path: 'activity',
        fullPath: '/home/activity',
        name: 'activity',
        label: '活动',
        component: () => import('./components/activity')
    },
    {
        path: 'problem-solving',
        fullPath: '/home/problem-solving',
        name: 'problemSolving',
        label: '问题解答',
        component: () => import('./components/problem-solving')
    },
    {
        path: 'activity-detail',
        fullPath: '/home/activity-detail',
        name: 'activityDetail',
        label: '活动详情',
        component: () => import('./components/activity-detail')
    },
    {
        path: 'lottery',
        fullPath: '/home/lottery',
        name: 'lottery',
        label: '抽奖',
        component: () => import('./components/lottery')
    },
    {
        path: 'lottery-rules',
        fullPath: '/home/lottery-rules',
        name: 'lotteryRules',
        label: '抽奖规则',
        component: () => import('./components/lottery-rules')
    },
    {
        path: 'sign-in',
        fullPath: '/home/sign-in',
        name: 'signIn',
        label: '签到',
        component: () => import('./components/sign-in')
    },
    {
        path: 'sign-in-rules',
        fullPath: '/home/sign-in-rules',
        name: 'signInRules',
        label: '签到规则',
        component: () => import('./components/sign-in-rules')
    },
    {
        path: 'problem-detail',
        fullPath: '/home/problem-detail',
        name: 'problemDetail',
        label: '问题详情',
        component: () => import('./components/problem-detail')
    }
]
