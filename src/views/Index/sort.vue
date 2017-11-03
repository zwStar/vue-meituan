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
        lists:['综合排序','速度最快','评分最高','起送价最低','配送费最低','人均高到低','人均低到高']
      }
    },
    mounted(){
      this.sortBy = this.$store.state.sortBy;
      console.log(this.sortBy)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";
  #sort{
    width: 100%;
    background: #fff;
    position:absolute;
    top:4rem;
    left:0;
    z-index:1000;
    ul{
      li{
        color:rgb(119,120,103);
        font-size:1.3rem;
        line-height: 4rem;
        border-top:1px solid $mtGrey;
        padding-left:0.3rem;
        &.active{
          color:$mtYellow;
        }
      }
    }

  }
</style>
