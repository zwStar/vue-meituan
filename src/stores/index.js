import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  address:"",    //当前位置
  suggestionLists:[]
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
