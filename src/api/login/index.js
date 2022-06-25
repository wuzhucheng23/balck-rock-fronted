import axios from '@/plugins/axios'

const login =  {
    async registered (params) {
        const url = '/api/auth/registered'
        return await axios.post(url, params )
    },
    async login (params) {
        const url = '/api/auth/login'
        return await axios.post(url, params )
    },
    async smsVerify (params) {
        const url = '/api/auth/smsVerify'
        return await axios.post(url, params )
    },
    async overtimeSms (params) {
        const url = '/api/auth/overtimeSms'
        return await axios.post(url, params )
    },
    async resetPwd (params) {
        const url = '/api/auth/resetPwd'
        return await axios.post(url, params )
    },
    async emailVerify (params) {
        const url = '/api/auth/emailVerify'
        return await axios.post(url, params )
    },
    async changePwd (params) {
        const url = '/api/auth/changePwd'
        return await axios.post(url, params )
    },
}

export default login
