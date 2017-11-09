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
        <input id="passWord" type="password" placeholder="请输入密码" v-model="password" v-if="!passwordVisible" @keyup.enter="login()">
        <input id="passWord" type="text"  placeholder="请输入密码" v-model="password" v-else @keyup.enter="login()">
        <span @click="changeVisible()">
          <i class="iconfont icon" v-if="!passwordVisible">&#xe60a;</i>
          <i class="iconfont icon" v-else >&#xe6d0;</i>
        </span>
      </div>
      <div class="button" @click.prevent="login();">
        <span>登录</span>
      </div>
      <span class="question">未注册直接输入账号密码，自动注册！</span>
    </form>
  </div>
</template>

<script>
  import {sendLogin} from '@/api/getData'
  export default {
    data(){
      return {
        username:null,
        password:null,
        passwordVisible:false
      }
    },
    methods:{
      changeVisible(){
        this.passwordVisible = !this.passwordVisible;
      },
      async login(){
        if(!this.username){
          console.log("用户名输入不合法")
          return;
        }else if(!this.password){
          console.log("密码输入不合法");
          return;
        }
        let loginInfo = await sendLogin(this.username,this.password);
        if(loginInfo.data.status >=0 ){
          localStorage.setItem('username',this.username);
          this.$router.go(-1);
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/mixin.scss";
  #login{
    .login_form{
      margin-top:1rem;
      .toRegister{
        position:absolute;
        right:15px;
        font-size:1.7rem;
        line-height:3.5rem;
        font-weight:bold;
      }
      .userName,.passWord{
        padding:1rem 0 1rem 1rem;
        border-bottom: 1px solid $bottomLine;
        label,::-webkit-input-placeholder {
          font-size:1.4rem;
        }
        input{
          width: 70%;
          margin-left:3rem;
        }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        }
        input:focus{  outline:none; }
      }
      .passWord{
        span{
          .icon{
            font-size:2rem;
          }
        }
      }
      .button{
        text-align: center;
        margin-top:1rem;
        span{
          display: block;
          margin:0 auto;
          color:#fff;
          width: 90%;
          height:3rem;
          font-size:1.5rem;
          line-height:3rem;
          background: $mtYellow;
          border-radius: 0.7rem;
        }
      }
      .question{
        display: block;
        text-align: center;
        margin-top:2rem;
      }
    }

  }
</style>
