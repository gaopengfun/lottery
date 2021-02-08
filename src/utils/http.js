import axios from 'axios';
import qs from 'qs';

// axios 配置
let instance = axios.create({
  baseURL: process.env.BASE_PATH,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
});

// http request 拦截器
instance.interceptors.request.use(
  config => {
    /**
     * 此处可添加定制请求
     * 比如: 添加头信息
     */
    config.headers.Authorization = 'ZHIXUE';
    return Promise.resolve(config);
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
instance.interceptors.response.use(
  response => {
    /**
     * 此处可统一处理通信返回信息
     */
    return Promise.resolve(response);
  },
  error => {
    return Promise.reject(error);
  }
);


/**
 * 封装 Get 方法，对应 Get 请求
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时携带的参数
 */
function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装 Post 方法，对应 Post 请求
 * @param {String} url 请求的url地址
 * @param {Object} params 请求时携带的参数
 */
function post (url, params = {}) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, qs.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export { get, post };
