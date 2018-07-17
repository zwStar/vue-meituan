<template>
  <div class="error">
    <v-head title="出错" goBack="true" bgColor="#f4f4f4"></v-head>
    <div class="info-container">
      <img src="http://xs01.meituan.net/waimai_i/img/error-404.399c57c1.png">
      <span class="tip">找不到此页面</span>
      <router-link class="redirect-index" to="/index"><span>回到首页</span></router-link>
    </div>
    <div class="service"><span>美团外卖客服：10109777</span></div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin";

  .error {
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
      .tip {
        display: block;
        margin: 0.1rem;
        font-size: 0.35rem;
      }
      .redirect-index {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 1rem;
        margin: 0.3rem 0;
        background: $mtYellow;
        span {
          font-size: 0.3rem;
        }
      }
    }
    .service {
      width: 100%;
      position: absolute;
      bottom: 10px;
      left: 0;
      text-align: center;
      span {
        font-size: 0.3rem;
        text-decoration: underline;
      }
    }
  }
</style>
