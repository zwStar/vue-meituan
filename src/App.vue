<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted() {
      let cartList = localStorage.getItem('cartList'); //获取购物车信息 因为加购物车可以不用登录 所以用localStorage保存着 页面加载时更新到vuex中
      cartList = JSON.parse(cartList)
      if (cartList)
        this.$store.dispatch('updateCart', {cartList})
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./style/common.scss";
  @import "./style/mixin.scss";

  #app {
    width: 100%;
    height: 100%;
  }
</style>
