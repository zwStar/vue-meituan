import {_get, _post, _put} from './index'

export const sendLogin = (data) => {
  let req = {
    data
  };
  req.url = 'admin/login'
  return _post(req);
}
//获取某个商家具体信息
export const getRestaurant = (data) => {
  let req = {
    data
  };
  req.url = 'v1/restaurant'
  return _get(req);
}
//获取一定数量的商家
export const getRestaurants = (data) => {
  let req = {
    data
  };
  req.url = 'v1/restaurants'
  return _get(req);
}

//新增收货地址
export const addAddress = (data) => {
  let req = {
    data
  };
  req.url = 'admin/address'
  return _post(req);
};

//获取收货地址
export const getAddress = (data) => {
  let req = {data};
  req.url = 'admin/address'
  return _get(req);
};

//添加进购物车
export const addShoppingCart = (data) => {
  let req = {
    data
  };
  req.url = 'v1/cart'
  return _post(req);
}

//从购物车减少商品数量
export const reduceShoppingCart = (data) => {
  let req = {
    data
  };
  req.url = 'v1/cart'
  return _put(req);
}

//获取订单
export const getOrder = (data) => {
  let req = {
    data
  };
  req.url = 'v1/order'
  return _get(req);
}
