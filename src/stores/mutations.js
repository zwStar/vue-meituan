import {
  ADD_CART,
  RECORD_ADDRESS,
  RECORD_SUGGESTION
} from './mutation-types'

export default {
  //加入购物车
  [ADD_CART](state,{food_id,price,name}){
    console.log("food_id",food_id)
    console.log("price",price)
    console.log("name",name)
    let cart = state.cartList;
    // state.totalPrice += price;
    cart.totalPrice += price;
    if(cart[food_id]){
      cart[food_id].num++;
    }else{
      cart[food_id] = {
        num:1,
        name:name,
        price:price
      }
    }
  },
  // 记录当前经度纬度
  [RECORD_ADDRESS](state, {location,title}) {
    console.log(location.lat)
    console.log(location.lng)
    console.log(title)
    state.latitude = latitude;
    state.longitude = longitude;
    state.address = title;
  },
  //推荐地址列表
  [RECORD_SUGGESTION](state,lists){
    state.suggestionLists = lists;
  }
}
