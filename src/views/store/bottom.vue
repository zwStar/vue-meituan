<template>
  <div id="bottom">
    <span class="shopping-cart"><i class="iconfont icon-cart">&#xe66b;</i></span>
    <span class="deliver-fee">免配送费</span>
    <span class="submit">12元起送</span>
  </div>
</template>

<script>
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
