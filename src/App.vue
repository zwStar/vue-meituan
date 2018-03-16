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
  import {mapGetters, mapMutations} from 'vuex'
  import BScroll from 'better-scroll'
  import routerPath from "./stores/modules/routerPath";

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
    methods: {
      ...mapMutations(['UPDATE_CART']),
    },
    mounted() {
      let cartList = localStorage.getItem('cartList');
      if (cartList)
        this.UPDATE_CART({cartList})
    },
    watch: {
      $route(val) {     //监听路由变化 控制后退路径选择
        let pathList = this.routerPath;
        let fullPath = val.fullPath;
        let arrIndex = 0;

        if (fullPath.indexOf('pay')!== -1)
          return;

        let isExit = pathList.find((value, index) => {
          if (value === fullPath) {
            arrIndex = index;
            return true;
          } else
            return false;
        })
        if (isExit) {   //如果该地址存在
          pathList.splice(arrIndex, 1);
        }
        pathList.push(fullPath);
        this.$store.dispatch('savePath',pathList);
      }
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
