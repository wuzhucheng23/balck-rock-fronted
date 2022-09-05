export default [
    {
        path: 'mine-index',
        fullPath: '/mine/mine-index',
        name: 'MineIndex',
        label: '我的首页',
        component: () => import('@/views/mine/components/mine-index')
    },
    {
        path: 'vip-introduce',
        fullPath: '/mine/vip-introduce',
        name: 'VipIntroduce',
        label: 'vip介绍',
        component: () => import('@/views/mine/components/vip-introduce')
    },
    {
        path: 'account-recharge',
        fullPath: '/mine/account-recharge',
        name: 'AccountRecharge',
        label: '账户充值',
        component: () => import('@/views/mine/components/account-recharge')
    },
    {
        path: 'recharge-confirm',
        fullPath: '/mine/recharge-confirm',
        name: 'RechargeConfirm',
        label: '充值确认',
        component: () => import('@/views/mine/components/recharge-confirm')
    },
    {
        path: 'account-recode',
        fullPath: '/mine/account-recode',
        name: 'AccountRecode',
        label: '账户记录',
        component: () => import('@/views/mine/components/account-recode')
    },
    {
        path: 'account-withdraw',
        fullPath: '/mine/account-withdraw',
        name: 'AccountWithdraw',
        label: '账户提现',
        component: () => import('@/views/mine/components/account-withdraw')
    },
    {
        path: 'wallet-manage',
        fullPath: '/mine/wallet-manage',
        name: 'WalletManage',
        label: '钱包管理',
        component: () => import('@/views/mine/components/wallet-manage')
    },
    {
        path: 'add-wallet',
        fullPath: '/mine/add-wallet',
        name: 'AddWallet',
        label: '添加钱包',
        component: () => import('@/views/mine/components/add-wallet')
    },
    {
        path: 'edit-wallet',
        fullPath: '/mine/edit-wallet',
        name: 'EditWallet',
        label: '编辑钱包',
        component: () => import('@/views/mine/components/edit-wallet')
    },
    {
        path: 'invite-friend',
        fullPath: '/mine/invite-friend',
        name: 'InviteFriend',
        label: '邀请好友',
        component: () => import('@/views/mine/components/invite-friend')
    },
    {
        path: 'my-team',
        fullPath: '/mine/my-team',
        name: 'MyTeam',
        label: '我的团队',
        component: () => import('@/views/mine/components/my-team')
    },
    {
        path: 'company-introduction',
        fullPath: '/mine/company-introduction',
        name: 'CompanyIntroduction',
        label: '公司简介',
        component: () => import('@/views/mine/components/company-introduction')
    },
    {
        path: 'problem-help',
        fullPath: '/mine/problem-help',
        name: 'ProblemHelp',
        label: '问题帮助',
        component: () => import('@/views/mine/components/problem-help')
    },
    {
        path: 'problem-solving',
        fullPath: '/mine/problem-solving',
        name: 'ProblemSolving',
        label: '问题解答',
        component: () => import('@/views/mine/components/problem-solving')
    },
    {
        path: 'activity-center',
        fullPath: '/mine/activity-center',
        name: 'ActivityCenter',
        label: '活动中心',
        component: () => import('@/views/mine/components/activity-center')
    },
    {
        path: 'activity-detail',
        fullPath: '/mine/activity-detail',
        name: 'ActivityDetail',
        label: '活动详情',
        component: () => import('@/views/mine/components/activity-detail')
    },
    {
        path: 'rotary-lottery',
        fullPath: '/mine/rotary-lottery',
        name: 'RotaryLottery',
        label: '转盘抽奖',
        component: () => import('@/views/mine/components/rotary-lottery')
    },
    {
        path: 'lottery-rules',
        fullPath: '/mine/lottery-rules',
        name: 'LotteryRules',
        label: '抽奖规则',
        component: () => import('@/views/mine/components/lottery-rules')
    },
    {
        path: 'sign-in',
        fullPath: '/mine/sign-in',
        name: 'SignIn',
        label: '每日签到',
        component: () => import('@/views/mine/components/sign-in')
    },
    {
        path: 'sign-in-rules',
        fullPath: '/mine/sign-in-rules',
        name: 'SignInRules',
        label: '签到规则',
        component: () => import('@/views/mine/components/sign-in-rules')
    },
    {
        path: 'deposit-manage',
        fullPath: '/mine/deposit-manage',
        name: 'DepositManage',
        label: '押金管理',
        component: () => import('@/views/mine/components/deposit-manage')
    },
    {
        path: 'money-rule',
        fullPath: '/mine/money-rule',
        name: 'MoneyRule',
        label: '押金规则',
        component: () => import('@/views/mine/components/money-rule')
    },
    {
        path: 'pay-deposit',
        fullPath: '/mine/pay-deposit',
        name: 'PayDeposit',
        label: '缴纳押金',
        component: () => import('@/views/mine/components/pay-deposit')
    },
    {
        path: 'withdraw-deposit',
        fullPath: '/mine/withdraw-deposit',
        name: 'WithdrawDeposit',
        label: '提取押金',
        component: () => import('@/views/mine/components/withdraw-deposit')
    },
    {
        path: 'deposit-record',
        fullPath: '/mine/deposit-record',
        name: 'DepositRecord',
        label: '押金记录',
        component: () => import('@/views/mine/components/deposit-record')
    },
    {
        path: 'order-recode',
        fullPath: '/mine/order-recode',
        name: 'OrderRecode',
        label: '订单记录',
        component: () => import('@/views/mine/components/order-recode')
    },
    {
        path: 'earning-recode',
        fullPath: '/mine/earning-recode',
        name: 'EarningRecode',
        label: '收益记录',
        component: () => import('@/views/mine/components/earning-recode')
    },
    {
        path: 'setting-up',
        fullPath: '/mine/setting-up',
        name: 'SettingUp',
        label: '设置',
        component: () => import('@/views/mine/components/setting-up')
    },
    {
        path: 'language-set',
        fullPath: '/mine/language-set',
        name: 'LanguageSet',
        label: '语言设置',
        component: () => import('@/views/mine/components/language-set')
    }
]
