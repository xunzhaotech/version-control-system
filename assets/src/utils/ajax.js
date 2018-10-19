import axios from 'axios';
import apimap from 'utils/apimap';
import cloneDeep from 'lodash/cloneDeep';

/**
 * 
 * @param {apimap文件中的key} api 
 * @param {参数和方法*} options 
 * @api {
 *    method: String,
 *    [params]: [params]
 * }  
 */
export default function ajax(api, options) {
  options = options ? options : {};
  let url = apimap[api];
  let method = 'GET';
  if(options.method) {
    method = options.method.toUpperCase();
  }
  options.method && delete options.method;
  let data = cloneDeep(options);
  let arr = ['DELETE', 'PUT', 'POST'];

  let obj = {
    method,
    url
  };

  if(method !== 'GET') {
    obj.data = data;
  } else {
    obj.params = data;
  }

  obj.headers = {
    'Content-type': 'application/json;charset=UTF-8',
  };
  return axios(obj)
    .then((json) => {
      let res = json.data;
        if(res.code == 301) {
          message.warn('登录已失效，请重新登录')
          location.hash = '#/';
          return res;
        } else {
        return res;
      }
    });

}
