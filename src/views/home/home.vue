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
            <img src="http://p1.meituan.net/50.0.100/xianfu/9c1388ba5fbb367c1a93996f39c2fba94506.jpg">
          </div>
          <span>我的收藏</span>
        </li>
        <li>
          <div class="imgWrap">
            <img src="http://p1.meituan.net/50.0.100/xianfu/7ad7da19bfadd5e6081b7606025214254582.jpg">
          </div>
          <span>我的足迹</span>
        </li>
        <li>
          <div class="imgWrap">
            <img src="http://p0.meituan.net/50.0.100/xianfu/5d02f44df0f9f26ea0eca95957824bae4444.jpg">
          </div>
          <span>我的评价</span>
        </li>
        <li>
          <div class="imgWrap">
            <img src="http://p1.meituan.net/50.0.100/xianfu/bbae84a587711ac12badb9453406ad694851.jpg">
          </div>
          <span>我的好友</span>
        </li>
      </ul>
      <ul>
        <li>
          <div class="imgWrap">
            <img src="http://p1.meituan.net/50.0.100/xianfu/5c1bf832376403ca2ab22b8d8748e0fd5479.jpg">
          </div>
          <span>答谢记录</span>
        </li>
        <li>
          <div class="imgWrap">
            <img src="http://p0.meituan.net/50.0.100/xianfu/a813bff1813024b05ff45422deac24bd4276.jpg">
          </div>
          <span>我的地址</span>
        </li>
      </ul>
    </div>
    <div class="assets">
      <h3>我的资产</h3>
      <ul>
        <li>
          <div class="imgWrap">
            <img src="http://p1.meituan.net/50.0.100/xianfu/a361ce97f9f00f2715bb960a789d925e2315.jpg">
          </div>
          <span>红包</span>
        </li>
        <li>
          <div class="imgWrap">
            <img src="http://p0.meituan.net/50.0.100/xianfu/875f13a76045b7f6862a2b7149babec32329.jpg">
          </div>
          <span>代金券</span>
        </li>
        <li>
          <div class="imgWrap">
            <img src="http://p1.meituan.net/50.0.100/xianfu/2c14b3425c7bf1f3d63d11f47a7ef9ea2230.jpg">
          </div>
          <span>钱包</span>
        </li>
        <li>
          <div class="imgWrap">
            <img src="http://p0.meituan.net/50.0.100/xianfu/7b3e3fb4fc9b45dcda74d7e916f025ea2878.jpg">
          </div>
          <span>余额</span>
        </li>
      </ul>
    </div>
    <div class="intro">
        <h3>更多推荐</h3>
        <ul>
          <li>
            <div class="imgWrap">
              <img src="http://p0.meituan.net/50.0.100/xianfu/cf5ddfcae114ed8d7d147d51064532252477.jpg">
            </div>
            <span>邀请有奖</span>
          </li>
          <li>
           <div class="imgWrap">
             <img src="http://p1.meituan.net/50.0.100/xianfu/55748d5fa531a057258f68d029fe20542466.jpg">
           </div>
            <span>商家入驻</span>
          </li>
          <li>
            <div class="imgWrap">
              <img src="http://p1.meituan.net/50.0.100/xianfu/317aabdd31dfcfa1739149089a2e041a2780.jpg">
            </div>
            <span>帮助与反馈</span>
          </li>
          <li>
           <div class="imgWrap">
             <img src="http://p0.meituan.net/50.0.100/xianfu/55454d4faaed6ad212b2b8a929edef372425.jpg">
           </div>
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
    height:6.53rem;
    color:#000;
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
        .imgWrap{
          width: 3rem;
          height: 3rem;
          margin:0.3rem auto;
          img{
            width:100%;
            height:100%;
          }
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
        .imgWrap{
          width: 3rem;
          height: 3rem;
          margin:0.3rem auto;
          img{
            width:100%;
            height:100%;
          }
        }
      }
    }
  }
</style>
