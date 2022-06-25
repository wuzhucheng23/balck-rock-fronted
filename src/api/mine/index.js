import axios from '@/plugins/axios'

const mine =  {
    async profile (params) {
        const url = '/api/user/profile'
        return await axios.get(url, { params })
    },
    async userCount (params) {
        const url = '/api/user/userCount'
        return await axios.get(url, { params })
    },
    async getAddress (params) {
        const url = '/api/user/getAddress'
        return await axios.get(url, { params })
    },
    async tranRecord (params) {
        const url = '/api/user/tranRecord'
        return await axios.get(url, { params })
    },
    async auth (params) {
        const url = '/api/user/auth'
        return await axios.post(url, params )
    },
    async setpp (params) {
        const url = '/api/user/setpp'
        return await axios.post(url, params )
    },
    async addBank (params) {
        const url = '/api/user/addBank'
        return await axios.post(url, params )
    },
    async resetPwd (params) {
        const url = '/api/auth/resetPwd'
        return await axios.post(url, params )
    },
    async addAddress (params) {
        const url = '/api/user/addAddress'
        return await axios.post(url, params )
    },
    async orderList (params) {
        const url = '/api/order/orderList'
        return await axios.get(url, { params } )
    },
    async getBank (params) {
        const url = '/api/user/getBank'
        return await axios.get(url, { params } )
    },
    async updateUser (params) {
        const url = '/api/user/updateUser'
        return await axios.post(url, params  )
    },
}

export default mine
