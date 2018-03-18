<template>
  <div id="login">
    <v-head goBack="true" title_head="登录">

    </v-head>
    <form action="" class="login_form">
      <div class="userName">
        <label for="userName">账号</label>
        <input id="userName" type="text" placeholder="请输入手机号" v-model="username">
      </div>
      <div class="passWord">
        <label for="passWord">密码</label>
        <input id="passWord" type="password" placeholder="请输入密码" v-model="password" v-if="!passwordVisible"
               @keyup.enter="login()">
        <input id="passWord" type="text" placeholder="请输入密码" v-model="password" v-else @keyup.enter="login()">
        <span @click="changeVisible()">
          <i class="iconfont icon" v-if="!passwordVisible">&#xe60a;</i>
          <i class="iconfont icon" v-else>&#xe6d0;</i>
        </span>
      </div>
      <div class="button" @click.prevent="login();">
        <span>登录</span>
      </div>
      <span class="tip">未注册直接输入账号密码，自动注册！</span>
    </form>
  </div>
</template>

<script>
  import {login} from '@/api/user'

  export default {
    data() {
      return {
        username: null,
        password: null,
        passwordVisible: false
      }
    },
    methods: {
      changeVisible() {
        this.passwordVisible = !this.passwordVisible;
      },
      login() {
        if (!this.username) {
          console.log("用户名输入不合法")
          return;
        } else if (!this.password) {
          console.log("密码输入不合法");
          return;
        }
        login({username: this.username, password: this.password}).then((response) => {
          if (response.data.status === 1) {
            localStorage.setItem('mt-username', this.username);
            this.$router.go(-1);
          }
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/mixin.scss";

  #login {
    .login_form {
      margin-top: 2rem;
      .toRegister {
        position: absolute;
        right: 15px;
        font-size: 0.7rem;
        @include px2rem(line-height, 85);
        font-weight: bold;
      }
      .userName, .passWord {
        margin: 0.4rem 0.6rem;
        border-bottom: 1px solid $bottomLine;
        label, ::-webkit-input-placeholder {
          font-size: 0.4rem;
        }
        input {
          font-size: 0.4rem;
          width: 70%;
          margin-left: 0.8rem;
        }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        }
        input:focus {
          outline: none;
        }
      }
      .passWord {
        span {
          .icon {
            font-size: 0.5rem;
          }
        }
      }
      .button {
        text-align: center;
        margin-top: 0.1rem;
        span {
          display: block;
          margin: 0 auto;
          color: #fff;
          width: 90%;
          font-size: 0.5rem;
          @include px2rem(line-height, 85);
          background: $mtYellow;
          border-radius: 0.3rem;
        }
      }
      .tip {
        font-size: 0.4rem;
        display: block;
        text-align: center;
        margin-top: 0.5rem;
      }
    }

  }
</style>
