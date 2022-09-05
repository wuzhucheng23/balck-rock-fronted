import axiosInstance from '@/api/axios-instance'

const hall = {
    async grabOrder(params) {
        const url = '/api/order/grabOrder'
        return await axiosInstance.get(url, {params})
    },
    async buyProduct(params) {
        const url = '/api/order/buyProduct'
        return await axiosInstance.post(url, params)
    },
    async goodList(params) {
        const url = '/api/home/goodList'
        return await axiosInstance.get(url, {params})
    },
    async getSubList(params) {
        const url = '/api/order/getSubList'
        return await axiosInstance.get(url, {params})
    },
    async subscribe(params) {
        const url = '/api/order/subscribe'
        return await axiosInstance.get(url, {params})
    },
    async unSubscribe(params) {
        const url = '/api/order/unSubscribe'
        return await axiosInstance.get(url, {params})
    },
    async cateItem(params) {
        const url = '/api/home/cateItem'
        return await axiosInstance.get(url, {params})
    },
    async buyAutoTask(params) {
        const url = '/api/order/buyAutoTask'
        return await axiosInstance.get(url, {params})
    },
    async autoTaskList(params) {
        const url = '/api/order/autoTaskList'
        return await axiosInstance.get(url, {params})
    },
    async autoBuy(params) {
        const url = '/api/order/autoBuy'
        return await axiosInstance.get(url, {params})
    },
}

export default hall
