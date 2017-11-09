<template>
  <div id="star">
    <span class="on" v-for="item in  on"></span>
    <span class="half" v-for="item in half"></span>
    <span class="off" v-for=" item in (5 - on - half)"></span>
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
    data(){
      return {
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
  #star{
    width: 4rem;
    display: inline-block;
    font-size:0;
    .on,.half,.off{
      display: inline-block;
      width: 0.7rem;
      height:0.7rem;
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
