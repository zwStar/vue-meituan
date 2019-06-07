<!--我的好友-->
<template>
  <div class="friend">
    <div class="container">
      <v-head title="我的好友" goBack="true" bgColor="#f4f4f4"></v-head>
      <h3 class="title">和好友一起玩转“全新”外卖</h3>
      <div class="img-container">
        <img src="../../../assets/friend_img.png" class="img">
      </div>
      <div class="main-info">
        <h3>绑定即可与好友共享</h3>
        <p>好友头条 | 偷好友红包 | 好友评价</p>
        <div class="bind">
          <i class="iconfont icon-weChart">&#xe630;</i>
          <span>绑定微信 寻找好友</span>
        </div>
        <div class="allow-item">
          <span class="selected" v-if="allowItem" @click="allowItem=false;"><i class="iconfont">&#xe6da;</i></span>
          <span class="select" v-else @click="allowItem=true;"></span>
          <span class="text">同意 &lt;<strong>信息授权使用协议</strong>&lt; </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        allowItem: true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../style/mixin";

  .friend {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    background: #fff;
    overflow-y: auto;
    .title {
      font-weight: 600;
      font-size: 0.5rem;
      margin-top: 1.5rem;
      text-align: center;
    }
    .img-container {
      margin: 0.4rem 0;
      text-align: center;
      .img {
        width: 6rem;
        height: auto;
      }
    }
    .main-info {
      h3:nth-of-type(1) {
        text-align: center;
        font-size: 0.4rem;
        color: #333;
      }
      p:nth-of-type(1) {
        text-align: center;
        font-size: 0.4rem;
        margin: 0.2rem 0;
      }
    }
    .bind {
      width: 70%;
      line-height: 1rem;
      border-radius: 5px;
      margin: 0.4rem auto;
      text-align: center;
      background: rgb(101, 190, 48);
      .icon-weChart {
        color: #fff;
        font-size: 0.4rem;
      }
      span {
        color: #fff;
        font-size: 0.4rem;
      }
    }

    .allow-item {
      text-align: center;
      padding-bottom: 2rem;
      .text {
        color:#b3b3b3;
        font-size: 0.4rem;
        strong {
          text-decoration: underline;
        }
      }
      .select, .selected {
        display: inline-block;
        @include px2rem(width, 40);
        @include px2rem(height, 40);
        border-radius: 50%;
      }
      .select {
        border: 1px solid #e9e8ea;
        vertical-align: middle;
      }
      .selected {
        text-align: center;
        background: $mtYellow;
        @include px2rem(line-height, 35);
        .iconfont {
          font-size: 0.5rem;
        }
      }
    }
  }
</style>
