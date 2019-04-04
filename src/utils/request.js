import axios from 'axios'
//导入mint-ui轮播组件
import { Indicator } from 'mint-ui';
const request = axios.create({
    baseURL: '/api',
    timeout: 5000,
   // headers: {'X-Custom-Header': 'foobar',}
})
request.interceptors.request.use(config=>{
    Indicator.open('加载中...');
    return config
},error=>{
    Indicator.open('加载失败');
})

// http响应拦截器
request.interceptors.response.use(res => {// 响应成功关闭loading
    Indicator.close();
    return res
   }, error => {
    Indicator.close()
   })
export default request