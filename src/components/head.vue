<template>
  <div id="head" :style="{color:color,background:bgColor}">
    <span class="goBack" v-if="goBack" @click="fun_goBack()"><i class="iconfont">&#xe61c;</i></span>
    <span class="title">{{title_head}}</span>
    <span class="more" v-if="more"><i class="iconfont">&#xe602;</i></span>
    <slot name="save_address"></slot>
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
      },
      more: {
        default: false
      },
      bgColor:{
        type:String,
        default:'#fff'
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
  @import "../style/mixin.scss";
  #head {
    position:relative;
    text-align: center;
    @include px2rem(line-height, 80);
    padding:0 0.2rem;
    .goBack, .more {
      position:absolute;
      i {
        font-size: 0.7rem;
      }
    }
    .goBack {
      left: 10px;
    }
    .title {
      flex: 1;
      font-size: 0.5rem;
      font-weight: bold;
      text-align: center;
    }
    .more {
      right: 15px;
    }
  }
</style>
