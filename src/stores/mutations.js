import {
  RECORD_ADDRESS,
  RECORD_SUGGESTION
} from './mutation-types'

export default {
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
    console.log(lists)
    state.suggestionLists = lists;
  }
}
