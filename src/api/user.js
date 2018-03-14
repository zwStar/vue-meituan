import {_get, _post, _put} from './index'

//获取地址
export const getAddress = (data) => {
  let req = {
    data,
    url: 'admin/address'
  };
  return _get(req);
}

//添加收获地址
export const add_address = (data) => {
  let req = {
    data,
    url: 'admin/address'
  }
  return _post(req);
}

//登录
export const login = (data) => {
  let req = {
    data,
    url: 'admin/user_login'
  }
  return _post(req);
}
