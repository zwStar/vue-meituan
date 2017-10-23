<template>
  <div class="location">
    <v-head goBack="true" title_head="选择收货地址"></v-head>
    <Search placeholder="请输入收货地址" :fun_click="fun_click"></Search>
    <div class="location_now" v-if="!suggestionLists.length">
      <i class="iconfont">&#xe793;</i><span>点击定位当前位置</span>
    </div>
    <div class="suggestionLists" v-else>
      <ul>
        <router-link tag="li" :to="{name:'Home',query:{id:item.id}}" v-for="item in suggestionLists" key="item.id">
          <h3>{{item.title}}</h3>
          <span>{{item.address}}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as api from '@/api'
  import {mapMutations} from 'vuex'
  import Search from '@/components/search.vue'

  export default {
    components: {
      Search
    },
    data() {
      return {
        suggestionLists: []
      }
    },
    methods: {
      fun_click(val) {
        let _this = this;
        api._get({
          url: "/v1/suggestion",
          data: {location: val}
        }).then(res => {
          console.log(res)
          let result = res.data;
          _this.suggestionLists = result.data.data;
          //_this.RECORD_SUGGESTION(result.data.data);
          localStorage.setItem("suggestionLists", JSON.stringify(result.data.data))
          console.log("setItem")
          console.log(JSON.parse(localStorage.getItem("suggestionLists")))
        })
      },
      ...mapMutations([
        'RECORD_SUGGESTION'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin";

  .location {
    height: 100vh;
    background: rgb(244, 244, 244);
    .location_now {
      height: 3.55rem;
      background: #fff;
      margin-top: 1.3rem;
      text-align: center;
      .iconfont {
        display: inline-block;
        font-size: 1.8rem;
        margin-right: 8px;
        color: $mtYellow;
      }
      span {
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 3.55rem;
      }
    }
    //推荐列表样式
    .suggestionLists {
      ul {
        li {
          border-bottom: 1px solid rgb(231, 231, 231);
          height: 6.18rem;
          background: #fff;
          font-size: 1.1rem;
          padding-left: 1rem;
          h3 {
            margin-bottom: 1rem;
            padding-top: 1rem;
          }
          span {
            color: rgb(163, 163, 163);
          }
        }
      }
    }
  }
</style>
