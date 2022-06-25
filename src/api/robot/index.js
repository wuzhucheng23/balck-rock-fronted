import axios from '@/plugins/axios'

const robot =  {
    async robotList (params) {
        const url = '/api/robot/robotList'
        return await axios.get(url, { params })
    },
    async getList (params) {
        const url = '/api/robot/getList'
        return await axios.get(url, { params })
    },
    async addRobot (params) {
        const url = '/api/robot/addRobot'
        return await axios.post(url, params )
    },
    async transfer (params) {
        const url = '/api/user/transfer'
        return await axios.post(url, params )
    },
    async getRobotDesc (params) {
        const url = '/api/info/getRobotDesc'
        return await axios.get(url, { params })
    },
}

export default robot
