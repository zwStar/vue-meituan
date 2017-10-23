<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      keepAlive:false
    }
  }
}
</script>

<style>
  @import "./style/common.scss";
  #app{
    width:100%;
    height:100%;
  }
</style>
