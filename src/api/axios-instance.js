import axios from "axios";
import router from "@/router";

// 创建axios实例
const axiosInstance = axios.create({
    baseURL,
    timeout: 30000,
});

// 拦截请求、处理后发送请求
axiosInstance.interceptors.request.use(config => {
    const locale = localStorage.getItem('locale');
    const authorization = localStorage.getItem('token');
    config.headers['Accept-Language'] = locale || 'cn';
    config.headers['Authorization'] = authorization;
    return config;
}, error => {
    console.log(error);
});

// 拦截响应，处理后返回结果
axiosInstance.interceptors.response.use(res => {
    if (res.data.code === 50008) {  // 若未通过身份验证
        localStorage.removeItem('token');
        setTimeout(() => {
            router.replace({
                name: 'LoginIndex',
                label: '登陆首页'
            });
        }, 1500);
    }
    return res.data;
}, error => {
    console.log(error);
});

// 导出axios实例
export default axiosInstance;
