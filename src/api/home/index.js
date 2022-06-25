import axios from '@/plugins/axios'

const home =  {
    async getShowContent (params) {
        const url = '/api/home/getShowContent'
        return await axios.get(url, { params })
    },
    async profile (params) {
        const url = '/api/user/profile'
        return await axios.get(url, { params })
    },
    async getTopupAdds (params) {
        const url = '/api/user/getTopupAdds'
        return await axios.get(url, { params })
    },
    async topup (params) {
        const url = '/api/user/topup'
        return await axios.post(url, params )
    },
    async upload (params) {
        const url = '/api/common/upload'
        return await axios.post(url, params )
    },
    async withdrawal (params) {
        const url = '/api/user/withdrawal'
        return await axios.post(url, params )
    },
    async getRechargeList (params) {
        const url = '/api/user/getRechargeList'
        return await axios.get(url, { params } )
    },
    async wallets (params) {
        const url = '/api/user/wallets'
        return await axios.get(url, { params } )
    },
    async editWallet (params) {
        const url = '/api/user/editWallet'
        return await axios.post(url, params )
    },
    async getDetails (params) {
        const url = '/api/team/getDetails'
        return await axios.get(url, {params} )
    },
    async getDesc (params) {
        const url = '/api/info/getDesc'
        return await axios.get(url, {params} )
    },
    async activitys (params) {
        const url = '/api/home/activitys'
        return await axios.get(url, {params} )
    },
    async activityDetails (params) {
        const url = '/api/home/activityDetails'
        return await axios.get(url, {params} )
    },
    async recharge (params) {
        const url = '/api/info/recharge'
        return await axios.get(url, {params} )
    },
    async withDraw (params) {
        const url = '/api/info/withDraw'
        return await axios.get(url, {params} )
    },
}

export default home
