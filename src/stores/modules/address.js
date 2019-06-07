import * as types from '../mutation-types'
import {location} from '@/api/location'

const state = {
  lat: '', // 当前位置纬度
  lng: '', // 当前位置经度
  address: {
    address: '定位中...',
    lat: '',
    lng: '',
  },
  locationReady: false,   //定位是否完成
  deliveryAddress: {}
};

const getters = {
  address: state => state.address,
  locationReady: state => state.locationReady,
  deliveryAddress: state => state.deliveryAddress
};

const actions = {
  clearAddress({commit}) {
    commit(types.CLEAR_ADDRESS);
  },
  location({commit}) {
    location().then((response) => {
      if (response.data.status === 200) {
        let data = response.data.data;
        commit(types.RECORD_ADDRESS, {address: data.address, ...data.location}); //保存title 和 经纬度到VUEX中
        commit(types.LOCATION_READY, true);    //定位完成 拉取商店
      }
    })
  },
  recordAddress({commit}, address) {
    commit(types.RECORD_ADDRESS, address); //保存title 和 经纬度到VUEX中
    commit(types.LOCATION_READY, true);    //定位完成 拉取商店
  },
  locationReady({commit}, boolean) {
    commit(types.LOCATION_READY, boolean);    //定位完成 拉取商店
  },
  recodeDeliveryAddress({commit}, address) {
    commit(types.RECORD_DELIVERY_ADDRESS, address);    //定位完成 拉取商店
  },
  failLocation({commit}) {      //定位失败
    commit(types.FAIL_LOCATION);
  }
};

const mutations = {
  [types.CLEAR_ADDRESS](state) {
    let address = {address: '定位中...', lat: '', lng: ''};
    state.address = {...address};
  },
  [types.RECORD_ADDRESS](state, address) {
    state.address = {...address}
  },
  //定位完成拉取附近餐馆
  [types.LOCATION_READY](state, boolean) {
    state.locationReady = boolean;
  },
  [types.RECORD_DELIVERY_ADDRESS](state, address) {
    state.deliveryAddress = {...address};
  },
  [types.FAIL_LOCATION](state) {
    let address = {address: '定位失败...', lat: '', lng: ''}
    state.address = {...address};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
