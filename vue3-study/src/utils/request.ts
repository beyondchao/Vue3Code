//进行axios二次封装：使用请求和响应拦截器
import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/modules/user";


let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});
//request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  //请求回调,设置请求头携带token
  let userStore = useUserStore();
  config.headers.token = userStore.token;
  // console.log("📤 发送请求:", {
  //   url: config.url,
  //   method: config.method,
  //   data: config.data,
  //   headers: config.headers
  // });
  return config;
});

request.interceptors.response.use(
  (response) => {
    //成功回调
    // console.log("✅ 响应成功:", response.data)
    return response.data;
  },
  async (error) => {
    //失败回调，处理http网络错误
    //定义变量存储网络错误信息
    // console.log("❌ 请求错误详情:", {
    //   status: error.response?.status,
    //   data: error.response?.data,
    //   message: error.message
    // })
    let message = "";
    let status = error.response?.status;
    
    // 判断是否为 logout 请求
    const isLogoutRequest = error.config?.url?.includes('/logout');
    
    switch (status) {
      case 400:
        message = "请求参数错误";
        break;
      case 401:
        message = "TOKEN过期，请重新登录";
        // TOKEN过期或无效
        let userStore = useUserStore();
        // 如果不是logout请求本身失败，则调用logout
        // 如果是logout请求本身失败，直接清除状态（避免死循环）
        if (!isLogoutRequest) {
          await userStore.logout();
        } else {
          userStore.token = "";
          userStore.username = "";
          userStore.avatar = "";
          // 直接清除localStorage避免状态不同步
          localStorage.removeItem("token");
        }
        // 跳转登录页
        window.location.href = "/login";
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
