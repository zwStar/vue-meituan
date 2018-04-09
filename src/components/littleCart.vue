<template>
  <!--购物车-->
  <router-link id="cart" to="/cart">
    <span><i class="iconfont">&#xe641;</i></span>
    <span class="num" v-if="num">{{num}}</span>
  </router-link>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['cartList']),
      num() {
        let totalNum = 0;
        Object.values(this.cartList).forEach(value=>{
          totalNum += value.totalNum;
        })
        return totalNum;
      }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../style/mixin";
  /*那辆购物车部分*/
  #cart {
    position: fixed;
    right: 0;
    bottom: 3rem;
    border: 1px solid $mtGrey;
    text-align: center;
    border-radius: 50%;
    background: #fff;
    @include px2rem(width, 96);
    @include px2rem(line-height, 91);
    .iconfont {
      font-size: 0.8rem;
    }
    .num {
      border-radius: 50%;
      font-size: 0.30rem;
      color: #fff;
      text-align: center;
      position: absolute;
      @include px2rem(width, 30);
      @include px2rem(line-height, 30);
      background: red;
      top: 0;
      right: 5px;
    }
  }
</style>
