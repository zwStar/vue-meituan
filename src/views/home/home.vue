<template>
  <div id="home">
    <v-head title_head="我的" goBack="true"></v-head>
    <div id="userInfo">
      <div class="avatar">
        <img src="../../assets/my.png">
      </div>
      <span class="login">登录/注册</span>
    </div>
    <div class="myFunction">
      <ul>
        <li>
          <div class="imgWrap">
            <img src="../../assets/我的收藏.jpg">
          </div>
          <span>我的收藏</span>
        </li>
        <li>
          <div class="imgWrap">
            <img src="../../assets/我的收藏.jpg">
          </div>
          <span>我的足迹</span>
        </li>
        <li>
          <div class="imgWrap">
            <img src="../../assets/我的收藏.jpg">
          </div>
          <span>我的评价</span>
        </li>
        <li>
          <div class="imgWrap">
            <img src="../../assets/我的收藏.jpg">
          </div>
          <span>我的好友</span>
        </li>
      </ul>
      <ul>
        <li>
          <div class="imgWrap">
            <img src="../../assets/我的收藏.jpg">
          </div>
          <span>答题记录</span>
        </li>
        <li>
          <div class="imgWrap">
            <img src="../../assets/我的收藏.jpg">
          </div>
          <span>我的地址</span>
        </li>
      </ul>
    </div>
    <div class="assets">
      <h3>我的资产</h3>
      <ul>
        <li>
          <i class="iconfont icon">&#xe6e5;</i>
          <span>红包</span>
        </li>
        <li>
          <i class="iconfont icon">&#xe6e5;</i>
          <span>代金券</span>
        </li>
        <li>
          <i class="iconfont icon">&#xe6e5;</i>
          <span>钱包</span>
        </li>
        <li>
          <i class="iconfont icon">&#xe6e5;</i>
          <span>余额</span>
        </li>
      </ul>
    </div>
    <div class="intro">
        <h3>更多推荐</h3>
        <ul>
          <li>
            <i class="iconfont icon">&#xe6e5;</i>
            <span>邀请有奖</span>
          </li>
          <li>
            <i class="iconfont icon">&#xe6e5;</i>
            <span>商家入驻</span>
          </li>
          <li>
            <i class="iconfont icon">&#xe6e5;</i>
            <span>帮助与反馈</span>
          </li>
          <li>
            <i class="iconfont icon">&#xe6e5;</i>
            <span>在线客服</span>
          </li>
        </ul>
    </div>
    <v-bottom></v-bottom>
  </div>
</template>

<script>

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/mixin.scss";
  #home{
    height:100%;
    background: rgb(244,244,244);
  }
  #userInfo{
    height:8.53rem;
    color:red;
    display: flex;
    align-items: center;
    background: #fff;
    .avatar{
      width: 10rem;
      text-align: center;
      border:1px solid #fff;
      border-radius: 25%;

    }
    .login{
      line-height: 8.53rem;
      font-size:1.6rem;
    }
  }
  .myFunction{
    margin-top:1rem;
    background: #fff;
    ul{
      @include clearfix;
      li{
        width: 25%;
        height:5.35rem;
        float:left;
        text-align: center;
        margin:0.5rem 0;
        i.icon{
          display: block;
          margin-bottom: 1rem;
          font-size:3rem;
          color:$mtYellow;
        }
      }
    }
  }
  .assets,.intro{
    margin-top:1rem;
    background: #fff;
    h3{
      font-size:1.5rem;
      margin-left:1rem;
      padding-top:1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid $bottomLine;
    }
    ul{
      display: flex;
      padding:1rem 0;
      li{
        flex:1;
        text-align: center;
        i{
          display: block;
          font-size: 3rem;
          margin-bottom: 1rem;
        }
      }
    }
  }
</style>
