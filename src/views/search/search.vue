<template>
  <div class="search_foods">
    <Search placeholder="请输入商品 店铺名" title_head="选择收货地址" fun_click="fun_click"></Search>
    <div class="lists">
      <ul>
        <li>
          <span class="avatar"><img src=""></span>
          <span class="name">东莞市美食刻蛋糕观</span>
          <span class="delivery_time">50分钟送达</span>
          <span class="icon"><i class="iconfont">&#xe63f;</i></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as api from '@/api'
  import {mapMutations} from 'vuex'
  import Search from '@/components/search.vue'
  export default {
    components:{
      Search
    },
    data() {
      return {
        search_val: "",
        search_active: false
      }
    },
    methods:{
      fun_click(val){
        api._get({
          url:"/v1/search",
          data:{search:val}
        }).then(res=>{
          console.log(res)
          this.RECORD_ADDRESS(res);
        })
      },
      ...mapMutations([
        'RECORD_ADDRESS'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .search_foods {

    .lists {
      ul {
        li {
          height: 5.01rem;
          display: flex;
          align-items: center;
          .avatar {
            width: 3.85rem;
            height: 3.85rem;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .name {
            flex: 1;
            font-size: 1.3rem;
          }
          .delivery_time {
            width: 7.71rem;
            font-size: 1rem;
          }
          .icon {

          }
        }
      }
    }
  }
</style>
