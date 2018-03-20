<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    name: 'app',
    data() {
      return {
        keepAlive: false
      }
    },
    computed: {
      ...mapGetters(['routerPath'])
    },
    mounted() {
      let cartList = localStorage.getItem('cartList');
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
