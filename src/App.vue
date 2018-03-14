<template>
  <div id="app">
   <!-- <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    name: 'app',
    data() {
      return {
        keepAlive: false
      }
    },
    methods: {
      ...mapMutations(['UPDATE_CART']),
    },
    mounted(){
      let cartList = localStorage.getItem('cartList');
      if(cartList)
        this.UPDATE_CART({cartList})
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
