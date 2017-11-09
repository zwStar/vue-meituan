<template>
  <div id="order">
    <v-head goBack="true" title_head="订单"></v-head>
    <div class="toLogin-wrap" v-if="!username">
      <div class="avatar">
        <i class="iconfont icon">&#xe623;</i>
      </div>
      <span class="tip">您还没有登录，请登录后查看订单</span>
      <router-link to="/login">
        <span class="toLogin">登录/注册</span>
      </router-link>
    </div>
    <div class="main" v-else>
      <span class="tip">最近三个月没有订单哦</span>
    </div>
    <v-bottom></v-bottom>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        username:null
      }
    },
    mounted(){
      this.username = localStorage.getItem('username')
      console.log(this.username)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";

  #order {
    .toLogin-wrap {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
      .avatar {
        text-align: center;
        .icon {
          font-size: 6rem;
          color: rgb(214, 214, 214);
        }
      }
      .tip {
        display: block;
        color: rgb(155, 153, 151);
        margin: 2rem 0;
        text-align: center;
      }
      .toLogin {
        display: inline-block;
        background: $mtYellow;
        width: 10rem;
        height: 3rem;
        font-size: 1.5rem;
        line-height: 3rem;
        border-radius: 0.2rem;
      }
    }

  }
</style>
