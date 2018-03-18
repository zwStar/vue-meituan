import {_get, _put} from './index'

//获取一定数量的商家
export const getRestaurants = (data) => {
  let req = {
    data: data,
    url: 'v1/restaurants'
  };
  return _get(req);
}


//获取某个商家具体信息
export const getRestaurant = (data) => {
  let req = {
    url: `v1/restaurant/${data.restaurant_id}`
  };
  return _get(req);
}

//获取食物
export const getFoods = (data) => {
  let req = {
    url: `v1/food/${data.restaurant_id}`
  };
  return _get(req);
}

//从购物车减少商品数量
export const reduceShoppingCart = (data) => {
  let req = {
    data,
    url: 'v1/cart'
  };
  return _put(req);
}

//输入关键词搜索餐馆
export const searchRestaurant = (data) => {
  let req = {
    data,
    url: 'v1/search/restaurant'
  }
  return _get(req);
}

//获取评论
export const restaurantComment = (data) => {
  let req = {
    data,
    url: 'v1/comment'
  };
  return _get(req);
}

