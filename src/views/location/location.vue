<!--选择收货地址-->
<template>
  <div class="location">
    <v-head goBack="true" title="选择收货地址"></v-head>
    <search placeholder="请输入收货地址" :fun_click="fun_click"></search>
    <div class="location-now" v-if="fromIndex && !suggestionLists.length" @click="locationNow">
      <i class="iconfont">&#xe793;</i>
      <span>点击定位当前位置</span>
    </div>
    <div class="lists" v-else>
      <ul>
        <li v-for="item in suggestionLists" :key="item.id" @click="selectAddress(item)">
          <h3>{{item.title}}</h3>
          <span>{{item.address}}</span>
        </li>
      </ul>
    </div>
    <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
  </div>
</template>

<script>
  import {suggestion} from '@/api/location'
  import search from '@/components/search.vue'

  export default {
    data() {
      return {
        suggestionLists: [],
        fromIndex: false,    //判断当前页面是来自首页还是来自新增收货地址
        alertText: '',
        showTip: false
      }
    },
    methods: {
      fun_click(val) {
        let _this = this;
        suggestion({keyword: val}).then((response) => {
          _this.suggestionLists = response.data.data.data;
        })
      },
      locationNow() {     //定位当前位置
        this.$store.dispatch('clearAddress');
        this.$store.dispatch('location');
        this.$router.push('/index');
      },
      selectAddress(item) {
        //如果是首页定位
        if (this.fromIndex) {
          this.$store.dispatch('clearAddress');
          this.$store.dispatch('recordAddress', {address: item.title, ...item.location})
          this.$router.push('/index');
        } else {  //新增收货地址
          this.$store.dispatch('recodeDeliveryAddress', item)
          this.$router.go(-1);                //返回上一个路由
        }
      }
    },
    mounted() {
      this.fromIndex = !!this.$route.query.fromIndex;
    },
    components: {
      search
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin";

  .location {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    background: rgb(244, 244, 244);
    .location-now {
      @include px2rem(height, 125);
      background: #fff;
      margin-top: 0.3rem;
      text-align: center;
      .iconfont {
        display: inline-block;
        font-size: 0.4rem;
        margin-right: 8px;
        color: $mtYellow;
      }
      span {
        font-size: 0.4rem;
        font-weight: 500;
        @include px2rem(line-height, 125);
      }
    }
    // 推荐列表样式
    .lists {
      ul {
        li {
          border-bottom: 1px solid rgb(231, 231, 231);
          @include px2rem(height, 125);
          background: #fff;
          font-size: 0.34rem;
          padding-left: 0.2rem;
          h3 {
            margin-bottom: 0.2rem;
            padding-top: 0.2rem;
          }
          span {
            color: rgb(163, 163, 163);
          }
        }
      }
    }
  }
</style>
