<!--我的收藏-->
<template>
  <div class="collection">
    <v-head title="我的收藏" goBack="true" bgColor="#f4f4f4"></v-head>
    <div class="info-container">
      <img src="../../../assets/nothing.png">
      <span class="text">没有收藏的你一定是个假吃货</span>
    </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  .collection {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    .info-container {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 3rem;
        height: 3rem;
      }
      .text {
        display: block;
        font-size: 0.35rem;
      }
    }
  }
</style>
