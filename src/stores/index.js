import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  address:'',    //当前位置
  suggestionLists:[],
  sortBy:'综合排序'     //当前排序方式 默认综合排序
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
