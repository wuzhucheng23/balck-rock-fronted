import axiosInstance from '@/api/axios-instance'

const service = {
    async getFaq(params) {
        const url = '/api/info/getFaq'
        return await axiosInstance.get(url, {params})
    },
    async getCustomer(params) {
        const url = '/api/info/getCustomer'
        return await axiosInstance.get(url, {params})
    },
}

export default service
