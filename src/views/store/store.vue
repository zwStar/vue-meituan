<template>
  <div id="store">
    <div class="head-wrapper">
      <v-head title_head="敖泽" goBack=true color="#fff"></v-head>
      <div class="store-info">
        <div class="logo">
          <img src="http://p0.meituan.net/xianfu/daeccca3bbf336fadede17ae6c13974f80427.jpg">
        </div>
        <div class="deliver-info">
          <span>起送 ￥12 | 配送 ￥0 | 30分钟</span>
          <p><i class="iconfont icon-broadcast">&#xe62d;</i>本店优先配送美团外卖。催单电话13711998584</p>
        </div>
      </div>
      <div class="actives">
        <i class="icon" :style="{backgroundImage:'url(http://p1.meituan.net/xianfu/9c997ecce6150671b8459738a26f8bd9767.png)'}" ></i>
        <span>新用户立减2元</span>
        <span class="active-number" @click="showStoreDetail();">2个活动 > </span>
      </div>
    </div>

    <div class="nav">
      <router-link :to="{name:'Menu'}" class="menu"><span class="active">点菜</span></router-link>
      <router-link to="evaluate" class="evaluate"><span>评价</span></router-link>
      <router-link to="seller" class="seller"><span>商家</span></router-link>
    </div>
    <StoreDetail class="store-detail" v-show="showDetatil" :showFlag.sync="showDetatil"></StoreDetail>
    <router-view></router-view>
    <Bottom></Bottom>
  </div>
</template>

<script>
  import Bottom from './bottom.vue'
import StoreDetail from './store-detail.vue'
  export default {
    components: {
      Bottom,
      StoreDetail
    },
    data(){
      return {
        showDetatil : false
      }
    },
    methods:{
      showStoreDetail(){
        this.showDetatil = true;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";

  #store {
    .head-wrapper{
      background: rgb(51,51,51);
      #head{
        background:rgb(51,51,51) ;
      }
      .store-info{
        padding-bottom:1rem;
        border-bottom: 1px solid $mtGrey;
        display: flex;
        margin-top:1rem;
        .logo {
          display: inline-block;
          width: 5rem;
          height: 4.5rem;
          margin: 0 1rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .deliver-info {
          flex:1;
          display: inline-block;
          vertical-align: top;
          span,p{
            color:$mtGrey;
          }
          p{
            width: 90%;
            margin-top:0.7rem;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            .icon-broadcast{
              display: inline-block;
              font-size:1.4rem;
              margin-right:0.5rem;
              vertical-align: middle;
            }
          }
        }
      }
      .actives {
        line-height: 2.89rem;
        margin: 0 1rem;

        .icon {
          display: inline-block;
          width: 1.5rem;
          height: 1.5rem;
          background-size: cover;
          vertical-align: middle;
          margin-right:0.5rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        span{
          color:$mtGrey;
          display: inline-block;

        }
        .active-number {
          float: right;

        }
      }
    }
    .nav {
      display: flex;
      .menu, .seller, .evaluate {
        flex: 1;
        text-align: center;
        line-height: 3.385rem;
        font-size: 1.4rem;
        span {
          display: inline-block;
          &.active {
            color: $mtYellow;
            margin-bottom: 0.2rem;
            border-bottom: 3px solid $mtYellow;
          }
        }

      }
    }
  }
</style>
