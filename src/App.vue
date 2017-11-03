<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'app',
    data() {
      return {
        keepAlive: false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "./style/common.scss";

  #app {
    width: 100%;
    height: 100%;
  }
</style>
