import {_get, _post, _delete} from './index'

//获取用户所有地址
export const getAllAddress = (data) => {
  let req = {
    data,
    url: 'admin/all_address'
  };
  return _get(req);
}

//获取指定收货地址
export const getAddress = (data) => {
  let req = {
    data,
    url: 'admin/address'
  }
  return _get(req)
}

//添加收获地址
export const add_address = (data) => {
  let req = {
    data,
    url: 'admin/address'
  }
  return _post(req);
}

export const updateAddress = (data) =>{
  let req = {
    data,
    url: 'admin/update_address'
  }
  return _post(req)
}

//删除收货地址
export const deleteAddress = (data) => {
  let req = {
    data,
    url: 'admin/address'
  }
  return _delete(req)
}

//登录
export const login = (data) => {
  let req = {
    data,
    url: 'admin/user_login'
  }
  return _post(req);
}

//获取用户信息
export const userInfo = (data) => {
  let req = {
    data,
    url: 'admin/user_info'
  }
  return _get(req);
}

//改变用户头像
export const changeAvatar = (data) => {
  let req = {
    data,
    url: 'admin/change_avatar'
  }
  return _post(req)
}

//获取我的评论
export const comment = (data) => {
  let req = {
    data,
    url: 'v1/my_comment'
  }
  return _get(req);
}

export const deleteComment = (data) => {
  let req = {
    data,
    url: 'v1/comment'
  }
  return _delete(req);
}

