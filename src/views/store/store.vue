<!--商店主页-->
<template>
  <div id="store">
    <!--skeleton-screen-loading-->
    <div class="skeleton-loading" v-if="!poi_info.name">
      <img src="../../assets/restaurant.jpg">
    </div>
    <!--头部商家信息-->
    <div class="head-container">
      <!--头部-->
      <v-head :title="poi_info.name" goBack="true" color="#fff" bgColor="#333" more="true"></v-head>
      <!--商家信息-->
      <div class="store-info">
        <div class="logo">
          <img :src="poi_info.pic_url">
        </div>
        <div class="deliver-info">
          <span>{{poi_info.min_price_tip}}  | {{poi_info.shipping_fee_tip}} | {{poi_info.delivery_time_tip}}</span>
          <p><i class="iconfont icon-broadcast">&#xe62d;</i>{{poi_info.bulletin}}</p>
        </div>
      </div>
      <!--活动列表-->
      <div class="actives">
        <ul :style=" 'transform: translateY('+ positionY % discountsLength * -0.9 +'rem)'">
          <li v-for="(item, index) in poi_info.discounts2" :key="index">
            <i class="icon"
               :style="{backgroundImage:'url('+ item.icon_url+')'}"></i>
            <span>{{item.info}}</span>
          </li>
        </ul>
        <span class="active-number" @click="showStoreDetail();">{{discountsLength}}个活动 > </span>
      </div>
    </div>
    <!--导航 有3个路由  点菜 评价 和商家-->
    <div class="nav">
      <router-link :to="{path:'/store/menu',query:{id:restaurant_id}}" class="menu" active-class="active">
        <span class="active">点菜</span>
      </router-link>
      <router-link :to="{path:'/store/comment',query:{id:restaurant_id}}" class="comment" active-class="active">
        <span>评价</span>
      </router-link>
      <router-link :to="{path:'/store/seller',query:{id:restaurant_id}}" class="seller" active-class="active">
        <span>商家</span>
      </router-link>
    </div>
    <!--商家详细信息 当点击活动列表右侧的 > 箭头时显示 -->
    <transition name="fade">
      <store-detail
        class="store-detail"
        v-show="showDetail"
        :showFlag.sync="showDetail"
        :poi_info="poi_info">
      </store-detail>
    </transition>
    <!--点菜 评价 和商家-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

  import StoreDetail from './store_detail.vue'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        showDetail: false, //商家详情显示
        restaurant_id: 0,   //商店id
        positionY: 0,         //活动滚动
      }
    },
    computed: {
      ...mapGetters(['poi_info']),
      discountsLength() { //打折列表数量
        return this.poi_info.discounts2 ? this.poi_info.discounts2.length : 0;
      }
    },
    methods: {
      //商家详情显示
      showStoreDetail() {
        this.showDetail = true;
      }
    },
    created() {
      //根据路由query获得商店id
      this.restaurant_id = this.$route.query.id;
      //根据商店id获取店家信息
      this.$store.dispatch('getRestaurant', this.restaurant_id);
      //活动列表不停滚动播放
      this.timer = setInterval(() => {
        this.positionY++;
      }, 4000);
    },
    components: {
      'store-detail': StoreDetail
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";

  #store {
    height: 100%;
    display: flex;
    flex-direction: column;
    /* skeleton-screen-loading样式*/
    .skeleton-loading {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1001;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .head-container {
      background: rgb(51, 51, 51);
      #head {
        background: rgb(51, 51, 51);
      }
      .store-info {
        display: flex;
        margin-top: 0.2rem;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid $mtGrey;
        .logo {
          @include px2rem(width, 82);
          @include px2rem(height, 82);
          margin: 0 0.2rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .deliver-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          span, p {
            color: $mtGrey;
            font-size: 0.35rem;
            margin-top: 0.1rem;
          }
          p {
            @include px2rem(width, 500);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .icon-broadcast {
              display: inline-block;
              font-size: 0.4rem;
              margin-right: 0.1rem;
              vertical-align: middle;
            }
          }
        }
      }
      /*活动列表样式*/
      .actives {
        @include px2rem(height, 70);
        @include px2rem(line-height, 70);
        overflow: hidden;
        margin: 0 0.2rem;
        position: relative;
        ul {
          transition: all 2s;
          li {
            display: flex;
            align-items: center;
            .icon {
              display: inline-block;
              @include px2rem(width, 30);
              @include px2rem(height, 30);
              background-size: cover;
              /*vertical-align: middle;*/
              margin-right: 0.1rem;
            }
            span {
              font-size: 0.3rem;
            }
          }
        }
        span {
          color: $mtGrey;
          display: inline-block;
        }
        .active-number {
          font-size: 0.3rem;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
    /* nav样式*/
    .nav {
      display: flex;
      flex-shrink: 0;
      .menu, .seller, .comment {
        flex: 1;
        text-align: center;
        @include px2rem(line-height, 80);
        font-size: 0.4rem;
        span {
          display: inline-block;
        }
        &.active {
          span {
            color: $mtYellow;
            margin-bottom: 0.1rem;
            border-bottom: 3px solid $mtYellow;
          }
        }
      }
    }
  }

  /* 详情框显示动画 */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  @keyframes load {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-50px);
    }
    100% {
      transform: translateY(0px);
    }
  }

</style>
