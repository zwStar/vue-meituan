import * as types from '../mutation-types'

const state = {
  routerPath: ['/index'],      //路由路径
}

//getters
const getters = {
  routerPath: state => state.routerPath
}

const actions = {
  savePath({commit}, path) {
    commit(types.SAVE_PATH, path);
  },
  resetPath({commit}){
    commit(types.SETSET_PATH);
  }
}

const mutations = {
  [types.SAVE_PATH](state,path) {
    console.log('path')
  },
  [types.RESET_PATH](state){
    state.routerPath = ['/index'];
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}
