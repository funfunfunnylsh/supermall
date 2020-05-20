
import axios from "axios";

// 本接口为测试接口,真实接口请联系coderwhy001
const url = "http://152.136.185.210:8000/api/n3";

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: url,
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}


