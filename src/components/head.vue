<template>
  <div class="head">
    <span class="goBack" v-if="goBack" @click="fun_goBack()"><i class="iconfont">&#xe61c;</i></span>
    <span class="title">{{title_head}}</span>
    <span class="more"><i class="iconfont">&#xe602;</i></span>
  </div>
</template>

<script>

  export default {
    data() {
      return{

      }
    },
    props: ["goBack","title_head","more"],
    methods:{
      fun_goBack(){
        window.history.go(-1);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../style/common.scss";
  .head {
    background: #fff;
    height: 3.5rem;
    text-align: center;
    position:relative;
    padding-bottom:1rem;
    box-sizing: content-box;
    .goBack ,.more{
      position: absolute;
      font-size:3rem;

    }
    .goBack{
      left:10px;
    }
    .title{
      font-size:1.7rem;
      line-height:3.5rem;
      font-weight:bold;
    }
    .more{
      right:15px;
    }
  }
</style>
