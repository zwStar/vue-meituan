import {_get,_post,_put} from './index'

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

//新增收货地址
export const add_Address = (data) =>{
  let req = {
    data:{...data}
  };
  req.url = 'admin/address'
  return _post(req);
};

//获取收货地址
export const get_Address = () =>{
  let req = {};
  req.url = 'admin/address'
  return _get(req);
};

//添加进购物车
export const add_shopping_cart = (data)=>{
  let req = {
    data:{...data}
  };
  req.url = 'v1/cart'
  return _post(req);
}

//从购物车减少商品数量
export const reduce_shopping_cart = (data)=>{
  let req = {
    data:{...data}
  };
  req.url = 'v1/cart'
  return _put(req);
}

//获取订单
export const get_order = (data)=>{
  let req = {
    data:{...data}
  };
  req.url = 'v1/order'
  return _get(req);
}
