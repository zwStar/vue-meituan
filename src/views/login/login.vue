<template>
  <div id="login">
    <v-head goBack="true" title_head="登录">

    </v-head>
    <form action="">
      <div class="userName">
        <label for="userName">账号</label>
        <input id="userName" type="text" placeholder="请输入手机号" v-model="username">
      </div>
      <div class="passWord">
        <label for="passWord">密码</label>
        <input id="passWord" type="password" placeholder="请输入密码" v-model="password" v-if="!passwordVisible">
        <input id="passWord" type="text" placeholder="请输入密码" v-model="password" v-else>
        <span @click="changeVisible()">
          <i class="iconfont icon" v-if="!passwordVisible">&#xe60a;</i>
          <i class="iconfont icon" v-else >&#xe6d0;</i>
        </span>
      </div>
      <div class="button">
        <span>登录</span>
      </div>
      <span class="question">未注册直接输入账号密码，自动注册！</span>
    </form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        username:'',
        password:'',
        passwordVisible:false
      }
    },
    methods:{
      changeVisible(){
        this.passwordVisible = !this.passwordVisible;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/mixin.scss";
  #login{
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
        font-size:1.6rem;
      }
      input{
        width: 70%;
        margin-left:3rem;
      }
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
</style>
