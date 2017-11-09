<template>
  <div id="store-detail">
    <div class="bg"></div>
    <div class="main">
      <div class="logo">
        <img :src="poi_info.pic_url">
      </div>
      <h2 class="name">{{poi_info.name}}</h2>
      <div class="score">
        <Star :score="poi_info.wm_poi_score"></Star>
        <span>{{poi_info.wm_poi_score}}</span></div>
      <span
        class="deliver-info">{{poi_info.min_price_tip}}  | {{poi_info.shipping_fee_tip}} | {{poi_info.delivery_time_tip}}</span>
      <div class="active-lists">
        <ul>
          <li v-for="item in poi_info.discounts2">
            <i class="icon"
               :style="{backgroundImage:'url('+ item.icon_url+')'}"></i>
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
  import Star from '../../components/star.vue'

  export default {
    components: {
      Star
    },
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
      close() {
        this.$emit('update:showFlag', false);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../style/mixin.scss';

  #store-detail {
    position: absolute;
    top: 4.5rem;
    left: 0;
    width: 100vw;
    height: calc(100vh - 4.5rem);
    background: rgba(10, 8, 8, 0.4);
    z-index: 99;
    .main {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -60%);
      width: 29rem;
      height: 36.65rem;
      background: rgba(142, 143, 148,0.6);
      padding-top: 2rem;
      overflow: auto;
      .logo {
        width: 5.19rem;
        height: 5.19rem;
        margin: 2rem auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        color: #fff;
        text-align: center;
      }
      .score {
        margin: 1rem 0;
        text-align: center;
        span {
          color: #dcd7d6;
        }
      }
      .deliver-info {
        display: block;
        color: #dcd7d6;
        margin: 1rem 0;
        text-align: center;
      }
      .active-lists {
        padding: 2rem 0;
        margin: 0 0.5rem;
        border-top: 1px solid $mtGrey;
        border-bottom: 1px solid $mtGrey;
        ul {
          li {
            color: #fff;
            margin: 0.5rem;
            i {
              display: inline-block;
              width: 1.5rem;
              height: 1.5rem;
              background-size: cover;
              vertical-align: middle;
              margin-right: 0.5rem;
            }
          }
        }
      }
      .announcement {
        margin-top: 1rem;
        color: #fff;
        h2{
          text-align: center;
          font-size:1.3rem;
        }
        p {
          margin: 1rem 1rem;
          line-height: 1.5rem;
        }
      }
    }
    /*背景虚化层*/
    .bg{
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -60%);
      width: 29rem;
      height: 36.65rem;
      background:url("http://p1.meituan.net/aichequan/e597d736e85846ee41d55440a5a86ad9193992.png.webp") no-repeat;
      filter: blur(5px);
    }
    .close {
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translateX(-50%);
      .icon-close {
        display: inline-block;
        font-size: 4rem;
        color: #fff;
      }
    }
  }
</style>
