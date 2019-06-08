<template>
  <div id="star">
    <span class="on" v-for="item in  on" :key="'on' + item"></span>
    <span class="half" v-for="item in half" :key="'half' + item"></span>
    <span class="off" v-for=" item in (5 - on - half)" :key="'off' + item"></span>
  </div>
</template>

<script>
  export default {
    props:{
      score:{
        type:Number,
        default:0
      }
    },
    computed:{
      on(){
        return  parseInt(this.score);
      },
      half(){
        return this.score - this.on >=0.5 ? 1 : 0;
      },
      off(){
        return 5 - this.on - this.half;
      }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../style/mixin.scss";
  #star{
    @include px2rem(width, 140);
    display: inline-block;
    font-size:0;
    .on,.half,.off{
      display: inline-block;
      @include px2rem(width, 20);
      @include px2rem(height, 20);
      margin-right:3px;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .on{
      background-image: url("../assets/star24_on@2x.png");
    }
    .half{
      background-image: url("../assets/star24_half@2x.png");
    }
    .off{
        background-image: url("../assets/star24_off@2x.png");
    }
  }
</style>
