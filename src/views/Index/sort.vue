<template>
  <div id="sort">
    <ul>
      <li v-for="list in lists" :class="list === sortBy ? 'active' :''">{{list}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        sortBy:'',
        lists:['综合排序','速度最快','评分最高','起送价最低']
      }
    },
    mounted(){
      this.sortBy = this.$store.state.sortBy;
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";
  #sort{
    width: 100%;
    background: #fff;
    position:absolute;
    @include px2rem(top, 80);
    left:0;
    z-index:1000;
    ul{
      li{
        color:rgb(119,120,103);
        font-size:0.3rem;
        @include px2rem(line-height,90);
        border-top:1px solid $mtGrey;
        padding-left:0.1rem;
        &.active{
          color:$mtYellow;
        }
      }
    }

  }
</style>
