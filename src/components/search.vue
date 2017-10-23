<template>
  <div class="search">
      <div class="search_input">
        <i class="iconfont">&#xe7d1;</i><input type="text" v-model.trim="search_val" :placeholder="placeholder">
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
        search_val:"",
        search_active:false
      }
    },
    watch: {
      search_val(data) {
        if (data !== ""){
          this.search_active = true;
          console.log(this.fun_click)
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
  .search {
      display: flex;
    padding-bottom: 1rem;
    background: #fff;
      .search_input, .btn_search {
        height: 2.8rem;
        font-size: 1.2rem;
        line-height: 2.8rem;
      }
      .search_input {
        flex: 1;
        background: rgb(239,238,244);
        border-radius: 1.4rem;
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
            font-size: 1.2rem;
          }
        }
      }
      .btn_search {
        display: inline-block;
        color: #fff;
        background: rgb(145, 145, 145);
        width: 5rem;
        text-align: center;
        border-radius: 0.4rem;
        margin:0 10px;
        &.active {
          color: rgb(161, 133, 70);
          background: rgb(242, 242, 242);
        }
      }
  }
</style>
