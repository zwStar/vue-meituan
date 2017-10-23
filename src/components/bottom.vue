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
    methods:{

    },
    mounted(){
      this.active = this.$route.path.slice(1);
      console.log("this.active"+this.active)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #bottom{
    width: 100%;
    position: absolute;
    bottom:0;
    left:0;
    ul{
      display: flex;
      li{
        text-align: center;
        flex:1;
        .index,.home,.order{

        }
      }
    }
  }
</style>
