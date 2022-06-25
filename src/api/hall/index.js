import axios from '@/plugins/axios'

const hall =  {
    async grabOrder (params) {
        const url = '/api/order/grabOrder'
        return await axios.get(url, { params })
    },
    async buyProduct (params) {
        const url = '/api/order/buyProduct'
        return await axios.post(url, params )
    },
    async settlement (params) {
        const url = '/api/order/settlement'
        return await axios.post(url, params )
    },
    async grabOrderRule (params) {
        const url = '/api/info/grabOrderRule'
        return await axios.post(url, params )
    },
}

export default hall
