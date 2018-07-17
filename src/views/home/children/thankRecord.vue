<!--答谢记录-->
<template>
  <div class="thank">
    <v-head title="答谢记录" goBack="true" bgColor="#f4f4f4"></v-head>
    <div class="info-container">
      <img src="../../../assets/nothing.png">
      <span class="tip">没有答谢记录呢</span>
      <p class="text">一分也是爱，一角也是情</p>
    </div>
  </div>
</template>

<script>
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .thank {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    .info-container{
      text-align: center;
      position:absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      img{
        width:3rem;
        height:3rem;
      }
      .tip{
        display: block;
        font-size:0.35rem;
      }
      .text{
        font-size:0.3rem;
        color:#333;
        margin-top:0.3rem;
      }
    }
  }
</style>
