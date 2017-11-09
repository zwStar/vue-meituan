<template>
  <div id="bottom">
    <span class="shopping-cart"><i class="iconfont icon-cart">&#xe66b;</i></span>
    <span class="deliver-fee">{{shipping_fee_tip}}</span>
    <span class="submit" v-if="totalPrice">{{totalPrice}}</span>
    <span class="submit" v-else-if="totalPrice< min_price">还差{{min_price - totalPrice}}</span>
    <span class="submit" v-else>{{totalPrice}}</span>
  </div>
</template>

<script>

  export default {
    props:['totalPrice', 'shipping_fee', 'min_price','min_price_tip','shipping_fee_tip']
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #bottom{
    width: 100%;
    line-height: 4.368rem;
    background: rgb(51,51,51);
    position:fixed;
    bottom:0;
    span{
      color:rgb(165,165,165);
    }
    .shopping-cart{
      position:absolute;
      top:-1.3rem;
      left:1rem;
      display: inline-block;
      width: 4.8rem;
      border-radius: 50%;
      background: rgb(102,102,102);
      text-align: center;
      .icon-cart{
        font-size:2.4rem;
        line-height:4.8rem;
      }
    }
    .deliver-fee{
      margin-left:10rem;
    }
    .submit{
      float: right;
      width: 9.556rem;
      height:100%;
      background:rgb(54,54,54);
      text-align: center;
    }
  }
</style>
