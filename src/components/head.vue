<template>
  <div id="head" :style="{color:color} ">
    <span class="goBack" v-if="goBack" @click="fun_goBack()"><i class="iconfont">&#xe61c;</i></span>
    <span class="title">{{title_head}}</span>
    <span class="more"><i class="iconfont">&#xe602;</i></span>
  </div>
</template>

<script>

  export default {
    data() {
      return {}
    },
    props: {
      goBack: {
        default: false
      },
      title_head: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: '#333'
      }
    },
    methods: {
      fun_goBack() {
        window.history.go(-1);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../style/common.scss";
  #head {
    background: #fff;
    height: 3.5rem;
    text-align: center;
    position: relative;

    box-sizing: content-box;
    line-height: 3.5rem;
    .goBack, .more{
      position: absolute;
      top:50%;
      transform: translateY(-50%);
    }
    .goBack, .more {
      i{
        font-size: 3rem;
      }
    }
    .goBack {
      left: 10px;
    }
    .title {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .more {
      right: 15px;
    }
  }
</style>
