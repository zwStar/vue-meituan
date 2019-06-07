<!--主页-->
<template>
  <div class="index" ref="scrollWrapper">
    <div class="main-container">
      <v-head title="美团外卖+"></v-head>
      <div class="guide-container">
        <router-link to="/location?fromIndex=true" class="location">
          <i class="iconfont">&#xe604;</i>
          <span class="address">{{address.address}}</span>
          <i class="iconfont">&#xe6d7;</i>
        </router-link>
        <router-link to="/search" class="search">
          <i class="iconfont">&#xe626;</i>
          <span>请输入商家 商品名</span>
        </router-link>
      </div>
      <!--导航轮播部分-->
      <v-nav></v-nav>
      <!--附近商家-->
      <div class="head">
        <span class="line"></span>
        <h2>附近商家</h2>
        <span class="line"></span>
      </div>
      <nearby-shops :scrollWrapper="scrollWrapper" v-if="locationReady"></nearby-shops>
    </div>
    <!--小购物车-->
    <little-cart>
    </little-cart>
    <!--主页底部-->
    <v-bottom></v-bottom>
  </div>
</template>

<script>
  import littleCart from '../../components/littleCart.vue'
  import nearbyShops from './nearby_shops.vue'
  import vNav from './nav.vue'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        scrollWrapper: null,    //存放 scrollWrapper这个DOM元素 用于等附近商家列表加载后 初始化better-scroll
      }
    },
    computed: {
      ...mapGetters(['address', 'locationReady'])
    },
    created() {
      let {lat, lng} = this.address;
      if (!lat || !lng) {      //如果没有定位 进行定位
        this.getLocation();   //定位
      }
    },
    methods: {
      getLocation() { //获取当前定位
        this.$store.dispatch('location');
      }
    },
    mounted() {
      this.scrollWrapper = this.$refs.scrollWrapper;  //把DOM元素赋值 用于传递给子组件nearbyShops
    },
    components: {
      'nearby-shops': nearbyShops,
      'v-nav': vNav,
      'little-cart': littleCart
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";
  .index {
    height: 100%;
    overflow: hidden;
  }
  .main-container {
    padding-bottom: 1rem;
    .guide-container {
      display: flex;
      .location, .search {
        display: flex;
        align-items: center;
        border-radius: 0.4rem;
        @include px2rem(height, 57);
      }
      .location {
        @include px2rem(width, 250);
        display: flex;
        margin: 0 0.2rem;
        background: rgb(166, 166, 166);
        .iconfont {
          color: #fff;
          font-size: 0.35rem;
        }
        i:first-child {
          padding-left: 8px;
        }
        .address {
          flex: 1;
          font-size: 0.3rem;
          color: #fff;
          @include px2rem(width, 180);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        i:last-child {
          padding-right: 8px;
        }
      }
      .search {
        flex: 1;
        background: rgb(237, 237, 237);
        margin-right: 0.2rem;
        display: flex;
        align-items: center;
        .iconfont {
          display: inline-block;
          padding-left: 10px;
          padding-top: 2px;
          font-size: 0.4rem;
        }
        span {
          font-size: 0.35rem;
          display: inline-block;
          padding-left: 10px;
        }
      }
    }
    /*标题*/
    .head {
      text-align: center;
      padding-bottom: 0.1rem;
      border-bottom: 1px solid $bottomLine;
      .line {
        vertical-align: middle;
        display: inline-block;
        @include px2rem(width, 70);
        height: 0;
        border-bottom: 1px solid #000;
      }
      h2 {
        font-size: 0.5rem;
        display: inline-block;
        margin: 0.2rem;
      }
    }
  }
</style>
