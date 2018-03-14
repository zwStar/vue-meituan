<template>
  <div class="star_container">
    <i class="iconfont star active" v-for="item in score" @click="makeScore(item)">&#xe70a;</i>
    <i class="iconfont star no_active" v-for="item in (5 - score)" @click="makeScore(item + score)">&#xe70a;</i>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        score:4
      }
    },
    methods:{
      makeScore(score){
        this.score = score;
        this.$emit('makeScore', score);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin";
  .star_container{
    display: flex;
    justify-content: center;
    @include px2rem(height,140);
    margin:0 0.5rem;
    padding:0.5rem 0;
    border-top:1px solid $mtGrey;
    text-align: center;
    .star{
      margin:0 0.1rem;
    }
    .active{
      color:$mtYellow;
    }
    .no_actvie{
      color:#999;
    }
  }
</style>
