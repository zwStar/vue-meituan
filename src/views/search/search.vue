<template>
  <div class="search_foods">
    <v-head title_head="搜索" goBack=true></v-head>
    <Search placeholder="请输入商品 店铺名" title_head="选择收货地址" :fun_click="fun_click"></Search>
    <div class="lists">
      <ul>
        <router-link v-for="(item,index) in searchList" :to="{path:'store',query:{id:item.id}}" :key="index" tag="li">
          <span class="avatar"><img :src="item.pic_url"></span>
          <span class="name" v-html="high_light(item.name)"></span>
          <span class="delivery_time">{{item.delivery_time_tip}}送达</span>
          <span class="icon"><i class="iconfont">&#xe63f;</i></span>
        </router-link>
      </ul>
    </div>
    <alertTip :text="alertText" :showTip.sync="showTip"></alertTip>
  </div>
</template>

<script>
  import {searchRestaurant} from '@/api/restaurant'
  import Search from '@/components/search.vue'

  export default {
    components: {
      Search
    },
    data() {
      return {
        keyword: '',
        searchList: [],
        alertText: '',
        showTip: false
      }
    },
    methods: {
      fun_click(val) {
        if (!val)
          return;
        this.keyword = val;
        searchRestaurant({keyword: val}).then((response) => {
          let res = response.data;
          if (res.status === 200) {
            if(res.data.length){
              this.searchList = res.data;
            }else{
              this.alertText = '找不到该餐馆，输入汉堡试试';
              this.showTip = true;
            }
          } else {
            this.alertText = res.message;
            this.showTip = true;
          }
        })
      },
      high_light: function (value) {
        return value.replace(this.keyword, `<span style="color:#ffd161;">${this.keyword}</span>`);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin";

  .search_foods {
    .lists {
      ul {
        li {
          @include px2rem(line-height, 115);
          display: flex;
          align-items: center;
          .avatar {
            @include px2rem(width, 80);
            @include px2rem(height, 80);
            margin: 0 0.5rem;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .name {
            flex: 1;
            font-size: 0.4rem;
          }
          .delivery_time {
            @include px2rem(width, 125);
            font-size: 0.2rem;
          }
          .icon {

          }
        }
      }
    }
  }
</style>
