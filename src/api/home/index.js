import axiosInstance from '@/api/axios-instance'

const home = {
    async getShowContent(params) {
        const url = '/api/home/getShowContent'
        return await axiosInstance.get(url, {params})
    },
    async profile(params) {
        const url = '/api/user/profile'
        return await axiosInstance.get(url, {params})
    }
}

export default home
