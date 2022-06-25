import router from "@/router";
import axios from "axios";

// 创建axios实例
const axiosInstance = axios.create({
    baseURL: ip,
    timeout: 30000,
});

// 拦截请求、处理后发送请求
axiosInstance.interceptors.request.use(config => {
    const locale = localStorage.getItem('locale')
    const authorization = localStorage.getItem('token')
    config.headers['Accept-Language'] = locale || 'en'
    config.headers['Authorization'] = authorization
    return config;
}, error => {
    console.log(error);
});

// 拦截响应，处理后返回结果
axiosInstance.interceptors.response.use(res => {
    if (res.data.code === 50008) {
        localStorage.removeItem('token')
        setTimeout(() => {
            router.replace({
                name: 'loginIndex',
                label: '登陆'
            })
        }, 1500);
    }
    return res.data;
}, error => {
    console.log(error);
});

// 导出axios实例
export default axiosInstance;
