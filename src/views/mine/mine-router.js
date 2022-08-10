export default [
    {
        path: 'index',
        fullPath: '/mine/index',
        name: 'mineIndex',
        label: '我的',
        component: () => import('./components/index')
    },
    {
        path: 'personal-certificate',
        fullPath: '/mine/personal-certificate',
        name: 'personalCertificate',
        label: '个人认证',
        component: () => import('./components/personal-certificate')
    },
    {
        path: 'bank-account',
        fullPath: '/mine/bank-account',
        name: 'bankAccount',
        label: '银行账户',
        component: () => import('./components/bank-account')
    },
    {
        path: 'add-bank-card',
        fullPath: '/mine/add-bank-card',
        name: 'addBankCard',
        label: '添加银行卡',
        component: () => import('./components/add-bank-card')
    },
    {
        path: 'setting-up',
        fullPath: '/mine/setting-up',
        name: 'settingUp',
        label: '设置',
        component: () => import('./components/setting-up')
    },
    {
        path: 'language-set',
        fullPath: '/mine/language-set',
        name: 'languageSet',
        label: '语言设置',
        component: () => import('./components/language-set')
    },
    {
        path: 'earning-recode',
        fullPath: '/mine/earning-recode',
        name: 'earningRecode',
        label: '收益记录',
        component: () => import('./components/earning-recode')
    },
    {
        path: 'shipping-address',
        fullPath: '/mine/shipping-address',
        name: 'shippingAddress',
        label: '收货地址',
        component: () => import('./components/shipping-address')
    },
    {
        path: 'order-recode',
        fullPath: '/mine/order-recode',
        name: 'orderRecode',
        label: '订单记录',
        component: () => import('./components/order-recode')
    },
    {
        path: 'update-name',
        fullPath: '/mine/update-name',
        name: 'updateName',
        label: '修改用户名',
        component: () => import('./components/update-name')
    },
    {
        path: 'deposit-record',
        fullPath: '/mine/deposit-record',
        name: 'depositRecord',
        label: '押金记录',
        component: () => import('./components/deposit-record')
    },
    {
        path: 'deposit-manage',
        fullPath: '/mine/deposit-manage',
        name: 'depositManage',
        label: '押金管理',
        component: () => import('./components/deposit-manage')
    },
    {
        path: 'vip-introduce',
        fullPath: '/mine/vip-introduce',
        name: 'vipIntroduce',
        label: 'vip介绍',
        component: () => import('./components/vip-introduce')
    },
    {
        path: 'pay-deposit',
        fullPath: '/mine/pay-deposit',
        name: 'payDeposit',
        label: '缴纳押金',
        component: () => import('./components/pay-deposit')
    },
    {
        path: 'withdraw-deposit',
        fullPath: '/mine/withdraw-deposit',
        name: 'withdrawDeposit',
        label: '提取押金',
        component: () => import('./components/withdraw-deposit')
    },
]