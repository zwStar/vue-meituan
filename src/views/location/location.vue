<template>
  <div class="location">
    <v-head goBack="true" title_head="选择收货地址"></v-head>
    <Search placeholder="请输入收货地址" :fun_click="fun_click"></Search>
    <div class="location_now" v-if="fromIndex && !suggestionLists.length" @click="locationNow()">
      <i class="iconfont">&#xe793;</i><span>点击定位当前位置</span>
    </div>
    <div class="suggestionLists" v-else>
      <ul>
        <li v-for="item in suggestionLists" :key="item.id" @click="selectAddress(item)">
          <h3>{{item.title}}</h3>
          <span>{{item.address}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {suggestion} from '@/api/location'
  import {mapMutations} from 'vuex'
  import Search from '@/components/search.vue'

  export default {
    components: {
      Search
    },
    data() {
      return {
        suggestionLists: [],
        fromIndex: false    //判断当前页面是来自首页还是来自新增收货地址
      }
    },
    methods: {
      fun_click(val) {
        let _this = this;
        suggestion({keyword: val}).then((response) => {
          _this.suggestionLists = response.data.data.data;
          //_this.RECORD_SUGGESTION(result.data.data);
          localStorage.setItem("suggestionLists", JSON.stringify(response.data.data))
        })
      },
      locationNow() {
        this.$router.push('/index');
      },
      selectAddress(item) {
        //如果是首页定位
        if (this.fromIndex) {
          this.RECORD_ADDRESS({address: item.title, ...item.location}); //保存title 和 经纬度到VUEX中
          this.$router.push({path: '/index', query: {address: item.title, ...item.location}});
        } else {  //新增收货地址
          this.RECORD_DELIVERY_ADDRESS(item); //地址信息由vuex管理
          this.$router.go(-1);                //返回上一个路由
        }
      },
      ...mapMutations([
        'RECORD_ADDRESS',
        'RECORD_DELIVERY_ADDRESS'
      ])
    },
    mounted() {
      this.fromIndex = this.$route.query.fromIndex ? true : false;
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin";

  .location {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgb(244, 244, 244);
    .location_now {
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
    //推荐列表样式
    .suggestionLists {
      ul {
        li {
          border-bottom: 1px solid rgb(231, 231, 231);
          @include px2rem(height, 125);
          background: #fff;
          font-size: 0.2rem;
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
