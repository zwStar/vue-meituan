<template>
  <div id="bottom">
    <ul>
      <router-link to="/index" tag="li">
        <div class="index">
          <img src="../assets/index-active.png" v-if="active ==='index'">
          <img src="../assets/index.png" v-else>
        </div>
        <span>首页</span>
      </router-link>

      <router-link to="/order" tag="li">
        <div class="order">
          <img src="../assets/order-active.png" v-if="active ==='order'">
          <img src="../assets/order.png" v-else>
        </div>
        <span>订单</span>
      </router-link>

      <router-link to="/home" tag="li">
        <div class="home">
          <img src="../assets/home-active.png" v-if="active ==='home'">
          <img src="../assets/home.png" v-else>
        </div>
        <span>我的</span>
      </router-link>

    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        active:'index',
      }
    },
    mounted(){
      this.active = this.$route.path.slice(1);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #bottom{
    width: 100%;
    position: fixed;
    bottom:0;
    left:0;
    z-index:999;      //保证底部在商家列表上层 当点击综合排序时  不会被遮罩挡住
    ul{
      display: flex;
      background: rgb(250,250,250);
      padding:0.3rem 0;
      li{
        text-align: center;
        flex:1;
        .index,.home,.order{
          width: 3rem;
          margin:0 auto;
          img{
            width: 100%;
          }
        }
      }
    }
  }
</style>
