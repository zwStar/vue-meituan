<template>
  <div id="store-detail">
    <div class="main">
      <div class="logo">
        <img src="http://p0.meituan.net/xianfu/daeccca3bbf336fadede17ae6c13974f80427.jpg">
      </div>
      <h2 class="name">麦当当的店</h2>
      <div class="score">
        <Star :score="4.6"></Star>
        <span>4.6分</span></div>
      <span class="deliver-info">起送￥11 | 配送 ￥0 | 31分钟</span>
      <div class="active-lists">
        <ul>
          <li>
            <i class="icon"
               :style="{backgroundImage:'url(http://p1.meituan.net/xianfu/9c997ecce6150671b8459738a26f8bd9767.png)'}"></i>新用户立减2元
          </li>
        </ul>
      </div>
      <div class="announcement">
        <h2>商家公告</h2>
        <p>(原大学生粗粮坊)做你身边最快的外卖！</p>
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
    props:{
      showFlag:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      close(){
        console.log("close")
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
    height: 100vh;
    background: rgba(10, 8, 8, 0.4);
    z-index: 99;
    .main {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -60%);
      width: 29rem;
      height: 36.65rem;
      background: rgb(21, 21, 21);
      padding-top: 2rem;
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
          color: #9f9f9e;
        }
      }
      .deliver-info {
        display: block;
        color: #9f9f9e;
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
            color: #9f9f9e;
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
        text-align: center;
        color: #fff;
        p{
          margin:1rem 0;
        }
      }
    }
    .close {
      position: absolute;
      top: 75%;
      left: 50%;
      transform: translateX(-50%);
      .icon-close {
        display: inline-block;
        font-size: 4rem;
        color:#fff;
      }
    }
  }
</style>
