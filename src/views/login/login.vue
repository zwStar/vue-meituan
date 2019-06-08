<!--登录页-->
<template>
  <div id="login">
    <v-head goBack="true" title="登录">
    </v-head>
    <form action="" class="login-form">

      <label class="form-label" for="username">
        <span class="label">账号</span>
        <input id="username" type="text" placeholder="请输入用户名" v-model="username">
      </label>

      <label class="form-label" for="password">
        <span class="label">密码</span>
        <input
          id="password"
          :type="passwordVisible?'text':'password'"
          placeholder="请输入密码"
          v-model="password"
          @keyup.enter="login">

        <span @click="changeVisible">
          <i class="iconfont icon" v-if="!passwordVisible">&#xe60a;</i>
          <i class="iconfont icon" v-else>&#xe6d0;</i>
        </span>
      </label>

      <div class="button" @click.prevent="login();">
        <span>登录</span>
      </div>
      <span class="tip">未注册直接输入账号密码，自动注册！</span>
    </form>
    <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
  </div>
</template>

<script>
  import {login} from '@/api/user'
  import {setInfo} from '@/utils/auth'

  export default {
    data() {
      return {
        username: null,       //用户名
        password: null,       //密码
        passwordVisible: false, //显示密码
        alertText: '',
        showTip: false
      }
    },
    methods: {
      changeVisible() {
        this.passwordVisible = !this.passwordVisible;
      },
      login() {
        if (!this.username) {
          this.alertText = '用户名输入不合法';
          this.showTip = true;
          return;
        } else if (!this.password) {
          this.alertText = '密码不能为空';
          this.showTip = true;
          return;
        }
        login({username: this.username, password: this.password}).then((response) => {
          if (response.data.status === 200) {
            setInfo(this.username);
            this.$router.go(-1);
          } else {
            this.alertText = response.data.message;
            this.showTip = true;
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
    .login-form {
      margin-top: 2rem;
      .toRegister {
        position: absolute;
        right: 15px;
        font-size: 0.7rem;
        @include px2rem(line-height, 85);
        font-weight: bold;
      }

      .form-label {
        display: flex;
        line-height: 1rem;
        margin: 0 0.4rem;

        .label {
          font-size: 0.4rem;
          margin-right: 0.2rem;
        }

        .icon {
          font-size: 0.4rem;
        }

        input {
          flex: 1;
          font-size: 0.4rem;
        }

        ::-webkit-input-placeholder {
          font-size: 0.4rem;
        }

        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px white inset !important;
        }
        input:focus {
          outline: none;
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
