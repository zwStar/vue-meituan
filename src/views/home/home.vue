<!--我的页面-->
<template>
  <div id="home">
    <v-head title="我的" goBack="true"></v-head>
    <div id="user-info">
      <label class="avatar" for="file">
        <img :src="avatar">
        <input id="file" type="file" @change="fileUpload($event)" style="display: none;">
      </label>
      <router-link v-if="!username" class="login" to="/login">登录/注册</router-link>
      <span v-else class="username">{{username}}</span>
    </div>
    <div class="fun-container">
      <ul>
        <li v-for="(item,index) in myFunList" :key="index" @click="routerChange(item.url)">
          <div class="img-wrap">
            <img :src="item.picUrl">
          </div>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="assets">
      <h3>我的资产</h3>
      <ul>
        <li v-for="(item,index) in myAssetsList" :key="index">
          <div class="img">
            <img :src="item.picUrl">
          </div>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="intro">
      <h3>更多推荐</h3>
      <ul>
        <li v-for="(item,index) in introList" :key="index">
          <div class="img">
            <img :src="item.picUrl">
          </div>
          <span>{{item.name}}</span>
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
        showTip: false,
        myFunList: [
          {
            url: '/home/collection',
            picUrl: 'http://p1.meituan.net/50.0.100/xianfu/9c1388ba5fbb367c1a93996f39c2fba94506.jpg',
            name: '我的收藏'
          },
          {
            url: '/home/footprint',
            picUrl: 'http://p1.meituan.net/50.0.100/xianfu/7ad7da19bfadd5e6081b7606025214254582.jpg',
            name: '我的足迹'
          },
          {
            url: '/home/comment',
            picUrl: 'http://p0.meituan.net/50.0.100/xianfu/5d02f44df0f9f26ea0eca95957824bae4444.jpg',
            name: '我的评价'
          },
          {
            url: '/home/friend',
            picUrl: 'http://p1.meituan.net/50.0.100/xianfu/bbae84a587711ac12badb9453406ad694851.jpg',
            name: '我的好友'
          },
          {
            url: '/home/thank',
            picUrl: 'http://p1.meituan.net/50.0.100/xianfu/5c1bf832376403ca2ab22b8d8748e0fd5479.jpg',
            name: '答谢记录'
          },
          {
            url: '/home/address',
            picUrl: 'http://p0.meituan.net/50.0.100/xianfu/a813bff1813024b05ff45422deac24bd4276.jpg',
            name: '我的地址'
          }],
        myAssetsList: [
          {
            name: '红包',
            picUrl: 'http://p1.meituan.net/50.0.100/xianfu/a361ce97f9f00f2715bb960a789d925e2315.jpg',
          },
          {
            name: '代金券',
            picUrl: 'http://p0.meituan.net/50.0.100/xianfu/875f13a76045b7f6862a2b7149babec32329.jpg',
          },
          {
            name: '钱包',
            picUrl: 'http://p1.meituan.net/50.0.100/xianfu/2c14b3425c7bf1f3d63d11f47a7ef9ea2230.jpg',
          },
          {
            name: '余额',
            picUrl: 'http://p0.meituan.net/50.0.100/xianfu/7b3e3fb4fc9b45dcda74d7e916f025ea2878.jpg'
          }
        ],
        introList: [
          {
            picUrl: 'http://p0.meituan.net/50.0.100/xianfu/cf5ddfcae114ed8d7d147d51064532252477.jpg',
            name: '邀请有奖'
          },
          {
            picUrl: 'http://p1.meituan.net/50.0.100/xianfu/55748d5fa531a057258f68d029fe20542466.jpg',
            name: '商家入驻'
          },
          {
            picUrl: 'http://p1.meituan.net/50.0.100/xianfu/317aabdd31dfcfa1739149089a2e041a2780.jpg',
            name: '帮助与反馈'
          },
          {
            picUrl: 'http://p0.meituan.net/50.0.100/xianfu/55454d4faaed6ad212b2b8a929edef372425.jpg',
            name: '在线客服'
          },
        ]
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
                changeAvatar({pic_url}).then(() => {
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

  #user-info {
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

  .fun-container {
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
        .img {
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
        .img {
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
