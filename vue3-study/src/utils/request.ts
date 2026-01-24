//进行axios二次封装：使用请求和响应拦截器
import axios from "axios";
import { ElMessage } from "element-plus";
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});
//request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
    config.headers.token = "123"
  return config;
});

request.interceptors.response.use(
  (response) => {
    //成功回调
    console.log(response.data)
    return response.data;
  },
  (error) => {
    //失败回调，处理http网络错误
    //定义变量存储网络错误信息
    let message = "";
    let status = error.response.status;
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "无权访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器错误";
        break;
      default:
        message = "网络出现问题";
        break;
    }
    ElMessage({
      type: "error",
      message,
    });

    return Promise.reject(error);
  },
);
export default request;
