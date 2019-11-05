/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {notification} from 'antd';
import {routerRedux} from 'dva/router';
import setting from '../../config/defaultSettings';

const codeMessage = {
  200: '请求成功',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台队列',
  204: '删除数据成功',
  400: '请求失败',
  401: 'token失效',
  403: '禁止访问',
  404: '请求失败',
  406: '请求方式错误',
  500: '服务器错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时'
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const {response, data} = error;
  if(response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const {status, url} = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText
    });
    if(data && data.code === '400') {
      // const res = JSON.parse(localStorage.getItem('currentUser'));
      // res.token = '';
      // localStorage.setItem({currentUser: res});
      // console.log(localStorage.getItem('currentUser'));
      // window.location.reload();
      const redirect = window.location.href;
      if(redirect) {
        window.location.href = `/user/login#${redirect}`;
      } else {
        window.location.href = '/user/login';
      }
      // routerRedux.replace({
      //   pathname: '/user/login',
      //   search: {
      //     redirect: window.location.href
      //   }
      // });
    }
  } else if(!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常'
    });
  }
  // response.code = data.code;
  return data;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include' // 默认请求是否带上cookie
});
// request拦截器, 改变url 或 options.
request.interceptors.request.use(async (url, options) => {
  const token = localStorage.getItem('token');
  const {requestSetting} = setting;
  if(token !== 'undefined' && token !== null) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    headers[requestSetting.applicationNameKey] = requestSetting.applicationName;
    headers[requestSetting.tokenName] = token;
    return (
      {
        url,
        options: {...options, headers}
      }
    );
  }
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  headers[requestSetting.applicationNameKey] = requestSetting.applicationName;
  return (
    {
      url,
      options: {...options, headers}
    }
  );
});

// // response拦截器, 处理response
request.interceptors.response.use(response => response);
export default request;
