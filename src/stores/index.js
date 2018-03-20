import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import cart from './modules/cart'
import address from './modules/address'
import restaurant from './modules/restaurant'

export default new Vuex.Store({
  modules: {
    cart,
    address,
    restaurant
  }
})
