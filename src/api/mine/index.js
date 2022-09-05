import axiosInstance from '@/api/axios-instance'

const mine = {
    async profile(params) {
        const url = '/api/user/profile'
        return await axiosInstance.get(url, {params})
    },
    async userCount(params) {
        const url = '/api/user/userCount'
        return await axiosInstance.get(url, {params})
    },
    async tranRecord(params) {
        const url = '/api/user/tranRecord'
        return await axiosInstance.get(url, {params})
    },
    async setpp(params) {
        const url = '/api/user/setpp'
        return await axiosInstance.post(url, params)
    },
    async resetPwd(params) {
        const url = '/api/auth/resetPwd'
        return await axiosInstance.post(url, params)
    },
    async orderList(params) {
        const url = '/api/order/orderList'
        return await axiosInstance.get(url, {params})
    },
    async vipRules(params) {
        const url = '/api/info/vipRules'
        return await axiosInstance.get(url, {params})
    },
    async intention(params) {
        const url = '/api/user/intention'
        return await axiosInstance.post(url, params)
    },
    async recharge(params) {
        const url = '/api/info/recharge'
        return await axiosInstance.get(url, {params})
    },
    async topup(params) {
        const url = '/api/user/topup'
        return await axiosInstance.post(url, params)
    },
    async upload(params) {
        const url = '/api/common/upload'
        return await axiosInstance.post(url, params)
    },
    async getRechargeList(params) {
        const url = '/api/user/getRechargeList'
        return await axiosInstance.get(url, {params})
    },
    async getTopupAdds(params) {
        const url = '/api/user/getTopupAdds'
        return await axiosInstance.get(url, {params})
    },
    async withdrawal(params) {
        const url = '/api/user/withdrawal'
        return await axiosInstance.post(url, params)
    },
    async withDraw(params) {
        const url = '/api/info/withDraw'
        return await axiosInstance.get(url, {params})
    },
    async wallets(params) {
        const url = '/api/user/wallets'
        return await axiosInstance.get(url, {params})
    },
    async editWallet(params) {
        const url = '/api/user/editWallet'
        return await axiosInstance.post(url, params)
    },
    async getDetails(params) {
        const url = '/api/team/getDetails'
        return await axiosInstance.get(url, {params})
    },
    async getDesc(params) {
        const url = '/api/info/getDesc'
        return await axiosInstance.get(url, {params})
    },
    async activitys(params) {
        const url = '/api/home/activitys'
        return await axiosInstance.get(url, {params})
    },
    async activityDetails(params) {
        const url = '/api/home/activityDetails'
        return await axiosInstance.get(url, {params})
    },
    async depositCont(params) {
        const url = '/api/info/depositCont'
        return await axiosInstance.get(url, {params})
    },
    async getTurnGoodList(params) {
        const url = '/api/turn/getTurnGoodList'
        return await axiosInstance.get(url, {params})
    },
    async getTurnNumList(params) {
        const url = '/api/turn/getTurnNumList'
        return await axiosInstance.get(url, {params})
    },
    async myTurnList(params) {
        const url = '/api/turn/myTurnList'
        return await axiosInstance.get(url, {params})
    },
    async startTurn(params) {
        const url = '/api/turn/startTurn'
        return await axiosInstance.get(url, {params})
    },
    async buyTurnNum(params) {
        const url = '/api/turn/buyTurnNum'
        return await axiosInstance.post(url, params)
    },
    async sign(params) {
        const url = '/api/user/sign'
        return await axiosInstance.post(url, params)
    },
    async getSignRecord(params) {
        const url = '/api/user/getSignRecord'
        return await axiosInstance.get(url, {params})
    },
    async getSignDesc(params) {
        const url = '/api/info/getSignDesc'
        return await axiosInstance.get(url, {params})
    },
    async getTurnDesc(params) {
        const url = '/api/info/getTurnDesc'
        return await axiosInstance.get(url, {params})
    },
}

export default mine
