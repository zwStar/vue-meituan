<template>
  <div class="search_container">
    <div class="search_input">
      <i class="iconfont">&#xe7d1;</i><input type="text" autofocus="autofocus" v-model.trim="search_val" :placeholder="placeholder">
    </div>
    <span class="btn_search" v-bind:class="{ active: search_active }">搜索</span>
  </div>
</template>

<script>
  import * as api from '../api'

  export default {
    props: ["placeholder", "fun_click"],
    data() {
      return {
        search_val: "",
        search_active: false
      }
    },
    watch: {
      search_val(data) {
        if (data !== "") {
          this.search_active = true;
          this.fun_click(data);
        }

        else {
          this.search_active = false;
          return;
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../style/mixin";
  .search_container {
    display: flex;
    padding-bottom: 0.2rem;
    background: #fff;
    .search_input, .btn_search {
      @include px2rem(line-height, 60);
      font-size: 0.2rem;
    }
    .search_input {
      flex: 1;
      background: rgb(239, 238, 244);
      border-radius: 0.4rem;
      margin: 0 10px;
      padding-left: 10px;
      input {
        width: 85%;
        height: 100%;
        border: none;
        text-indent: 20px;
        outline: none;
        background: rgba(237, 237, 237, 0.1);
        &::-webkit-input-placeholder {
          font-size: 0.2rem;
        }
      }
    }
    .btn_search {
      display: inline-block;
      color: #fff;
      background: rgb(145, 145, 145);
      @include px2rem(width, 145);
      text-align: center;
      border-radius: 0.1rem;
      margin: 0 10px;
      &.active {
        color: rgb(161, 133, 70);
        background: rgb(242, 242, 242);
      }
    }
  }
</style>
