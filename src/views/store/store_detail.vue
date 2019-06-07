<!--商店详情页-->
<template>
  <div id="store-detail">
    <div class="main">
      <div class="logo">
        <img :src="poi_info.pic_url">
      </div>
      <h2 class="name">{{poi_info.name}}</h2>
      <div class="score">
        <v-star :score="poi_info.wm_poi_score"></v-star>
        <span>{{poi_info.wm_poi_score}}</span></div>
      <span
        class="deliver-info">{{poi_info.min_price_tip}}  | {{poi_info.shipping_fee_tip}} | {{poi_info.delivery_time_tip}}</span>
      <div class="active-lists">
        <ul>
          <li v-for="(item, index) in poi_info.discounts2" :key="index">
            <i class="icon"
               :style="{backgroundImage:'url('+ item.icon_url+')'}">
            </i>
            <span>{{item.info}}</span>
          </li>
        </ul>
      </div>
      <div class="announcement">
        <h2>商家公告</h2>
        <p>{{poi_info.bulletin}}</p>
      </div>
    </div>

    <div class="close" @click="close();">
      <i class="iconfont icon-close">&#xe625;</i>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showFlag: {
        type: Boolean,
        default: false
      },
      poi_info: {
        type: Object
      }
    },
    methods: {
      close() {   //关闭详情页
        this.$emit('update:showFlag', false);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../style/mixin.scss';

  #store-detail {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(10, 8, 8, 0.4);
    z-index: 99;
    .main {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -60%);
      @include px2rem(width, 650);
      @include px2rem(height, 850);
      background: #151515;
      overflow: auto;
      .logo {
        @include px2rem(width, 125);
        @include px2rem(height, 120);
        margin: 0.8rem auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        color: #fff;
        font-size: 0.4rem;
        text-align: center;
      }
      .score {
        margin: 0.1rem 0;
        text-align: center;
        span {
          font-size: 0.4rem;
          color: #dcd7d6;
        }
      }
      .deliver-info {
        font-size: 0.4rem;
        display: block;
        color: #dcd7d6;
        margin: 0.3rem 0;
        text-align: center;
      }
      .active-lists {
        padding: 0.2rem 0;
        margin: 0 0.1rem;
        border-top: 1px solid $mtGrey;
        border-bottom: 1px solid $mtGrey;
        ul {
          li {
            color: #fff;
            margin: 0.2rem;
            i {
              display: inline-block;
              @include px2rem(width, 35);
              @include px2rem(height, 35);
              background-size: cover;
              vertical-align: middle;
              margin-right: 0.1rem;
            }
            span {
              font-size: 0.3rem;
            }
          }
        }
      }
      .announcement {
        margin-top: 0.5rem;
        color: #fff;
        h2 {
          text-align: center;
          font-size: 0.3rem;
        }
        p {
          font-size: 0.3rem;
          margin: 0.3rem;
        }
      }
    }
    .close {
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%);
      .icon-close {
        display: inline-block;
        font-size: 1rem;
        color: #fff;
      }
    }
  }
</style>
