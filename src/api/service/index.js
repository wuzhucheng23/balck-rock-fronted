import axios from '@/plugins/axios'

const service =  {
    async getFaq (params) {
        const url = '/api/info/getFaq'
        return await axios.get(url, { params })
    },
    async getCustomer (params) {
        const url = '/api/info/getCustomer'
        return await axios.get(url, { params })
    },
}

export default service
