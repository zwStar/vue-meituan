import {_get,_post} from './index'

export const sendLogin = (username, password)=>{
  let req = {
    data:{}
  };
  req.data.username = username;
  req.data.password = password;
  req.url = 'admin/login'
  return _post(req);
}
//获取某个商家具体信息
export const getRestaurant = (restaurant_id) =>{
  let req = {
    data:{}
  };
  req.data.restaurant_id = restaurant_id
  req.url = 'v1/restaurant'
  return _get(req);
}
//获取一定数量的商家
export const getRestaurants = (pageNum,limit,sort) =>{
  let req = {
    data:{}
  };
  req.url = 'v1/restaurants'
  return _get(req);
}
