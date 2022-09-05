import axiosInstance from '@/api/axios-instance'

const login = {
    async registered(params) {
        const url = '/api/auth/registered'
        return await axiosInstance.post(url, params)
    },
    async login(params) {
        const url = '/api/auth/login'
        return await axiosInstance.post(url, params)
    },
    async smsVerify(params) {
        const url = '/api/auth/smsVerify'
        return await axiosInstance.post(url, params)
    },
    async overtimeSms(params) {
        const url = '/api/auth/overtimeSms'
        return await axiosInstance.post(url, params)
    },
    async resetPwd(params) {
        const url = '/api/auth/resetPwd'
        return await axiosInstance.post(url, params)
    },
    async emailVerify(params) {
        const url = '/api/auth/emailVerify'
        return await axiosInstance.post(url, params)
    },
    async changePwd(params) {
        const url = '/api/auth/changePwd'
        return await axiosInstance.post(url, params)
    },
    async getAreaCode(params) {
        const url = '/api/info/getAreaCode'
        return await axiosInstance.get(url, {params})
    },
}

export default login
