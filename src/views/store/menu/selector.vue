<template>
  <div id="selector">
    <span class="reduce"><i class="iconfont icon-reduce">&#xe60d;</i></span>
    <span class="number"></span>
    <span class="add"><i class="iconfont icon-add">&#xe600;</i></span>
  </div>
</template>

<script>
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../style/mixin.scss";
  #selector{
    .reduce,.add{
      display: inline-block;
      width: 2.184rem;
      border-radius: 50%;
      background: $mtYellow;
      text-align: center;
    }
    .icon-reduce,.icon-add{
      font-size:1.6rem;
      line-height:2.184rem;
    }
  }
</style>
