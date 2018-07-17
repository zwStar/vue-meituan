<template>
  <div class="loading-container">
    <span class="loading"></span>
  </div>
</template>

<script>
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../style/mixin";
  .loading-container {
    @include loading;
    height:100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    .loading{
      position:absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
    }
  }
</style>
