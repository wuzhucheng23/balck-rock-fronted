import axios from '@/plugins/axios'

const hall = {
    async grabOrder(params) {
        const url = '/api/order/grabOrder'
        return await axios.get(url, {params})
    },
    async buyProduct(params) {
        const url = '/api/order/buyProduct'
        return await axios.post(url, params)
    },
    async settlement(params) {
        const url = '/api/order/settlement'
        return await axios.post(url, params)
    },
    async grabOrderRule(params) {
        const url = '/api/info/grabOrderRule'
        return await axios.post(url, params)
    },
    async goodList(params) {
        const url = '/api/home/goodList'
        return await axios.get(url, {params})
    },
    async depositCont(params) {
        const url = '/api/info/depositCont'
        return await axios.get(url, {params})
    },
    async getSubList(params) {
        const url = '/api/order/getSubList'
        return await axios.get(url, {params})
    },
    async getSubItem(params) {
        const url = '/api/order/getSubItem'
        return await axios.get(url, {params})
    },
    async subscribe(params) {
        const url = '/api/order/subscribe'
        return await axios.get(url, {params})
    },
    async unSubscribe(params) {
        const url = '/api/order/unSubscribe'
        return await axios.get(url, {params})
    },
    async cateItem(params) {
        const url = '/api/home/cateItem'
        return await axios.get(url, {params})
    },
    async buyAutoTask(params) {
        const url = '/api/order/buyAutoTask'
        return await axios.get(url, {params})
    },
    async autoTaskList(params) {
        const url = '/api/order/autoTaskList'
        return await axios.get(url, {params})
    },
    async autoBuy(params) {
        const url = '/api/order/autoBuy'
        return await axios.get(url, {params})
    },
}

export default hall
