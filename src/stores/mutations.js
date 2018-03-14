import {add_shopping_cart, reduce_shopping_cart} from '@/api/request'
import {
  ADD_CART,
  REDUCE_CART,
  UPDATE_CART,
  RECORD_ADDRESS,
  RECORD_SUGGESTION,
  RECORD_DELIVERY_ADDRESS,
  RECORD_RESTAURANT,
  FETCH_RESTAURANT,
  EMPTY_CART
} from './mutation-types'

export default {
  //加入购物车
  [ADD_CART](state, {restaurant_id,restaurant_name,restaurant_pic_url,food_id,price,name,foods_pic}) {
    let cart = state.cartList;
    let restaurant;
    if (!cart[restaurant_id]) { //如果该商店还没有添加任何商品 进行初始化
      restaurant = cart[restaurant_id] = {
        totalPrice: 0,   //总价格
        totalNum: 0,      //总数量
        restaurant_name,   //餐馆名
        restaurant_pic_url  //餐馆图片
      };
    } else {
      restaurant = cart[restaurant_id];
      // restaurant.name = restaurant_name;
    }
    restaurant.totalPrice = (Number(restaurant.totalPrice) + Number(price)).toFixed(2);   //计算总价格
    restaurant.totalNum++;    //数量加一
    if (restaurant[food_id]) {    //如果该食物已经在保存了  数量加1
      restaurant[food_id].num++;
    } else {
      restaurant[food_id] = {   //初始化该食物
        name,
        price,
        foods_pic,
        num: 1,
        id: food_id,
      }
    }
    //数据存入后台
    /*  add_shopping_cart({food_id}).then((result)=>{
        console.log(result)
      })*/
    //触发更新
    state.cartList = {...cart}
    localStorage.setItem('cartList', JSON.stringify(state.cartList));
  },
  //减购物车
  [REDUCE_CART](state, {restaurant_id, food_id}) {
    let cart = state.cartList;
    let restaurant = cart[restaurant_id];
    //修改购物车总价格
    restaurant.totalPrice = Number((restaurant.totalPrice - restaurant[food_id].price).toFixed(2));
    restaurant.totalNum--;
    if (restaurant.totalNum === 0) {
      delete(cart[restaurant_id]);
    } else if (restaurant[food_id].num === 1) {
      delete(restaurant[food_id]);
    } else {
      restaurant[food_id].num--;
    }
    state.cartList = {...cart};
    localStorage.setItem('cartList', JSON.stringify(state.cartList));
  },

  //更新购物车记录
  [UPDATE_CART](state, {cartList}) {
    state.cartList = {...JSON.parse(cartList)};
  },
  // 记录当前经度纬度
  [RECORD_ADDRESS](state, {location, title}) {
    console.log(location.lat)
    console.log(location.lng)
    console.log(title)
    state.latitude = latitude;
    state.longitude = longitude;
    state.address = title;
  },
  //推荐地址列表
  [RECORD_SUGGESTION](state, lists) {
    state.suggestionLists = lists;
  },
  [RECORD_DELIVERY_ADDRESS](state, address) {
    state.delivery_address = {...address};
  },
  //记录当前定位
  [RECORD_ADDRESS](state, address) {
    state.address = {...address}
  },





}
