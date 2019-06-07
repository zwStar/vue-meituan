<template>
  <div class="wrapper" ref="scrollWrapper">
    <div id="food-type">
      <v-head :title="type" goBack="true" bgColor="#f4f4f4"></v-head>
      <nearby-shops :ready=true :scrollWrapper="scrollWrapper"></nearby-shops>
    </div>
  </div>
</template>

<script>
  import nearbyShops from '@/views/index/nearby_shops'

  export default {
    data() {
      return {
        scrollWrapper: null,
        type: ''
      }
    },
    mounted() {
      this.type = this.$route.query.type || '美食';
      this.scrollWrapper = this.$refs.scrollWrapper;  //保存DOM元素 用于传递给子组件nearbyShops初始化better-scroll
      this.$store.dispatch('locationReady', true);
    },
    components: {
      'nearby-shops': nearbyShops
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wrapper {
    height: 100%;
    overflow: hidden;
  }
</style>
