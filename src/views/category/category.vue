<template>
  <div class="wrapper" ref="scrollWrapper">
    <div id="food_type">
      <v-head :title_head="type" goBack="true" bgColor="#f4f4f4"></v-head>
      <nearbyShops :ready="'true'" :scrollWrapper="scrollWrapper"></nearbyShops>
    </div>
  </div>
</template>

<script>
  import nearbyShops from '@/views/Index/nearbyShops'

  export default {
    data() {
      return {
        scrollWrapper: null,
        type:''
      }
    },
    mounted() {
      this.type = this.$route.query.type;
      this.scrollWrapper = this.$refs.scrollWrapper;  //把DOM元素赋值 用于传递给子组件nearbyShops
      this.$store.dispatch('locationReady', true);
    },
    components: {
      nearbyShops
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wrapper {
    height: 100%;
    overflow: hidden;
  }

</style>
