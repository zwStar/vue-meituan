import config from '../config'
import router from '@/router'
const baseURL = config.baseURL;
console.log(baseURL)
const axios = require('axios').create({
  baseURL: baseURL,            //api请求的baseURL
  timeout: 10000,
  withCredentials: true, // 允许跨域 cookie
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  transformResponse: [function (data) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      data = {};
    }
    console.log('data',data)
    if (data.status === 401) {
      localStorage.removeItem('mt-username');
      router.push('/login');
    }

    return data;
  }]
})

/*
// 添加响应拦截器
axios.interceptors.response.use((response) =>{
  // 对响应数据做点什么
  console.log('axios',response)
  if(response.data.status === 401){

  }

  return response;
});
*/

// get
export const _get = (req) => {
  console.log('req.data', req.data);
  return axios.get(req.url, {params: req.data})
}

// post
export const _post = (req) => {
  return axios({method: 'post', url: `/${req.url}`, data: req.data})
}

//patch
export const _put = (req) => {
  return axios({method: 'put', url: `/${req.url}`, data: req.data})
}
