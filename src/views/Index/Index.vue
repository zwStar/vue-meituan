<template>
  <div class="wrapper" ref="scrollWrapper">
    <div class="home">
      <v-head title_head="美团外卖+">
      </v-head>
      <div class="guide">
        <router-link to="/location" class="location"><i class="iconfont">&#xe604;</i><span
          class="address">{{address}}</span><i
          class="iconfont">&#xe6d7;</i></router-link>
        <router-link to="/search" class="search"><i class="iconfont">&#xe7d1;</i><span>请输入商家 商品名</span></router-link>
      </div>
      <!--导航轮播部分-->
      <mt-nav></mt-nav>
      <!--附近商家-->
      <nearbyShops :indexScroll="indexScroll" :scrollWrapper="scrollWrapper"></nearbyShops>
    </div>
    <!--底部 主页 订单 我的-->
    <v-bottom></v-bottom>
  </div>
</template>

<script>
  import * as api from '@/api'
  import nearbyShops from './nearbyShops.vue'
  import mtNav from './nav.vue'
  import {mapMutations} from 'vuex'
  import '@/style/swiper.min.css'
  import '@/plugins/swiper.min.js'

  export default {
    data() {
      return {
        address: '',
        indexScroll: null,    //首页的better-scroll实例对象 传递给自组件
        scrollWrapper:null    //存放 scrollWrapper这个DOM元素 用于等附近商家列表加载后 初始化better-scroll
      }
    },
    mounted() {
      this.getLocation();   //定位
      let id = this.$route.query
      this.scrollWrapper = this.$refs.scrollWrapper;  //把DOM元素赋值 用于传递给子组件nearbyShops
      let lists = localStorage.getItem("suggestionLIsts");


//      lists.forEach(el => {
//        console.log(el.id)
//        console.log(id)
//        if (el.id === id) {
//          _this.RECORD_ADDRESS(el);
//        }
//      })
    },
    methods: {
      ...mapMutations(["RECORD_ADDRESS"]),
      getLocation() {
        let _this = this;
        api._get({
          url: "/v1/location"
        }).then(res => {
          let result = res.data;
          _this.address = result.address;
        })
      }
    },
    components: {
      nearbyShops,
      mtNav
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/common.scss";
  .wrapper {
    height: 100%;
    overflow: hidden;
  }
  .home {
    .guide {
      display: flex;
      .location, .search {
        height: 3.2rem;
        border-radius: 1.5rem;
        line-height: 3.2rem;
      }
      .location {
        display: flex;
        width: 12rem;
        background: rgb(166, 166, 166);
        font-size: 1.2rem;
        margin: 0 0.5rem;
        &:first-child {
          padding-left: 10px;
        }
        .iconfont {
          color: #fff;
          width: 1.5rem;
        }
        .address {
          flex: 1;
          font-size: 1.3rem;
          color: #fff;
        }
      }
      .search {
        flex: 1;
        background: rgb(237, 237, 237);

        .iconfont {
          display: inline-block;
          font-size: 1.5rem;
          padding-left: 10px;
          line-height: 3.5rem;
          vertical-align: top;
        }
        span {
          font-size: 1.3rem;
          display: inline-block;
          padding-left: 10px;
        }
      }
    }
  }
</style>
