<!--我的页面-->
<template>
  <div id="home">
    <v-head title_head="我的" goBack="true"></v-head>
    <div id="userInfo">
      <label class="avatar" for="file">
        <img :src="avatar">
        <input id="file" type="file" @change="fileUpload($event)" style="display: none;">
      </label>
      <router-link v-if="!username" class="login" to="/login">登录/注册</router-link>
      <span v-else class="username">{{username}}</span>
    </div>
    <div class="myFunction">
      <ul>
        <li @click="routerChange('/home/collection')">
          <div class="imgWrap">
            <img src="http://p1.meituan.net/50.0.100/xianfu/9c1388ba5fbb367c1a93996f39c2fba94506.jpg">
          </div>
          <span>我的收藏</span>
        </li>
        <li @click="routerChange('/home/footprint')">
          <div class="imgWrap">
            <img src="http://p1.meituan.net/50.0.100/xianfu/7ad7da19bfadd5e6081b7606025214254582.jpg">
          </div>
          <span>我的足迹</span>
        </li>
        <li @click="routerChange('/home/comment')">
          <div class="imgWrap">
            <img src="http://p0.meituan.net/50.0.100/xianfu/5d02f44df0f9f26ea0eca95957824bae4444.jpg">
          </div>
          <span>我的评价</span>
        </li>
        <li @click="routerChange('/home/friend')">
          <div class="imgWrap">
            <img src="http://p1.meituan.net/50.0.100/xianfu/bbae84a587711ac12badb9453406ad694851.jpg">
          </div>
          <span>我的好友</span>
        </li>
      </ul>
      <ul>
        <li tag="li" to="/home/thank">
          <div class="imgWrap">
            <img src="http://p1.meituan.net/50.0.100/xianfu/5c1bf832376403ca2ab22b8d8748e0fd5479.jpg">
          </div>
          <span>答谢记录</span>
        </li>
        <li to="/home/address" tag="li">
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
    <router-view></router-view>
    <v-loading v-show="loading"></v-loading>
    <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
  </div>
</template>

<script>
  import {userInfo, changeAvatar} from '@/api/user'
  import {getInfo} from '@/utils/auth'
  import {uploadToken, upload} from '@/api/upload'
  import config from '@/config'

  export default {
    data() {
      return {
        username: null,
        avatar: 'http://i.waimai.meituan.com/static/img/default-avatar.png',
        loading: false,
        alertText: '',
        showTip: false
      }
    },
    methods: {
      fileUpload(event) {
        this.loading = true;
        let file = event.target.files[0];
        if (file.size > 1024 * 1024 * 3) {    //只能传2M以内照片
          this.alertText = '上传失败，只能传2M以内图片'
          this.showTip = true;
        } else {
          uploadToken().then((response) => {
            if (response.data.status === 200) {
              let data = {token: response.data.uptoken, file}
              upload(data).then((upResponse) => {
                let pic_url = config.domain + upResponse.data.key
                this.avatar = pic_url;
                this.loading = false;
                changeAvatar({pic_url}).then((updateResponse) => {
                })     //更新到数据库
              })
            } else {
              this.alertText = response.data.message
              this.showTip = true;
            }
          })
        }
      },
      routerChange(url) {
        if (this.username) {
          this.$router.push(url);
        } else {
          this.$router.push('/login');
        }
      }
    },
    mounted() {
      this.username = getInfo();
      if (this.username) {
        userInfo().then((response) => {
          this.avatar = response.data.data.avatar;
          console.log('resss', response.data.data)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/mixin.scss";

  #home {
    height: 100%;
    background: rgb(244, 244, 244);
  }

  #userInfo {
    @include px2rem(height, 200);
    color: #000;
    display: flex;
    align-items: center;
    background: #fff;
    .avatar {
      @include px2rem(width, 115);
      @include px2rem(height, 115);
      text-align: center;
      margin: 0 0.8rem;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #333;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login {
      font-size: 0.45rem;
    }
    .username {
      font-size: 0.5rem;
    }
  }

  .myFunction {
    margin-top: 0.3rem;
    background: #fff;
    ul {
      @include clearfix;
      li {
        width: 25%;
        @include px2rem(height, 145);
        float: left;
        text-align: center;
        margin: 0.2rem 0;
        .imgWrap {
          @include px2rem(width, 70);
          @include px2rem(height, 70);
          margin: 0.1rem auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        span {
          font-size: 0.35rem;
        }
      }
    }
  }

  .assets, .intro {
    margin-top: 0.2rem;
    background: #fff;
    h3 {
      font-size: 0.5rem;
      margin-left: 0.3rem;
      padding-top: 0.3rem;
      padding-bottom: 0.2rem;
      border-bottom: 1px solid $bottomLine;
    }
    ul {
      display: flex;
      padding: 0.3rem 0;
      li {
        flex: 1;
        text-align: center;
        .imgWrap {
          @include px2rem(width, 55);
          @include px2rem(height, 55);
          margin: 0.1rem auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        span {
          font-size: 0.35rem;
        }
      }
    }
  }

  .intro {
    padding-bottom: 1rem;
  }
</style>
