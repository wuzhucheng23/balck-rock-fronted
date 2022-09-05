import axiosInstance from '@/api/axios-instance'

const robot = {
    async robotList(params) {
        const url = '/api/robot/robotList'
        return await axiosInstance.get(url, {params})
    },
    async getList(params) {
        const url = '/api/robot/getList'
        return await axiosInstance.get(url, {params})
    },
    async addRobot(params) {
        const url = '/api/robot/addRobot'
        return await axiosInstance.post(url, params)
    },
    async transfer(params) {
        const url = '/api/user/transfer'
        return await axiosInstance.post(url, params)
    },
    async getRobotDesc(params) {
        const url = '/api/info/getRobotDesc'
        return await axiosInstance.get(url, {params})
    },
}

export default robot
