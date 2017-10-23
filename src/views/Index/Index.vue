<template>
  <div class="home">
    <v-head title_head="美团外卖+">
    </v-head>
    <div class="guide">
      <router-link to="/location" class="location"><i class="iconfont">&#xe604;</i><span class="address">东莞理工学院</span><i
        class="iconfont">&#xe6d7;</i></router-link>
      <router-link to="/search" class="search"><i class="iconfont">&#xe7d1;</i><span>请输入商家 商品名</span></router-link>
    </div>

    <nav class="food_type">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide lists page_one">
            <ul>
              <router-link tag="li" to="/foods">
                <div class="food_type_img">
                  <img src="http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png" alt="">
                </div>
                <span class="food_type_name">美食</span>
              </router-link>
              <router-link tag="li" to="/foods">
                <div class="food_type_img">
                  <img src="http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png" alt="">
                </div>
                <span class="food_type_name">美食</span>
              </router-link>
              <router-link tag="li" to="/foods">
                <div class="food_type_img">
                  <img src="http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png" alt="">
                </div>
                <span class="food_type_name">美食</span>
              </router-link>
              <router-link tag="li" to="/foods">
                <div class="food_type_img">
                  <img src="http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png" alt="">
                </div>
                <span class="food_type_name">美食</span>
              </router-link>
              <router-link tag="li" to="/foods">
                <div class="food_type_img">
                  <img src="http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png" alt="">
                </div>
                <span class="food_type_name">美食</span>
              </router-link>
              <router-link tag="li" to="/foods">
                <div class="food_type_img">
                  <img src="http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png" alt="">
                </div>
                <span class="food_type_name">美食</span>
              </router-link>
              <router-link tag="li" to="/foods">
                <div class="food_type_img">
                  <img src="http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png" alt="">
                </div>
                <span class="food_type_name">美食</span>
              </router-link>
              <router-link tag="li" to="/foods">
                <div class="food_type_img">
                  <img src="http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png" alt="">
                </div>
                <span class="food_type_name">美食</span>
              </router-link>
            </ul>
          </div>
          <div class="swiper-slide lists page_one">
            <ul>
              <router-link tag="li" to="/foods">
                <div class="food_type_img">
                  <img src="http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png" alt="">
                </div>
                <span class="food_type_name">美食</span>
              </router-link>
              <router-link tag="li" to="/foods">
                <div class="food_type_img">
                  <img src="http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png" alt="">
                </div>
                <span class="food_type_name">美食</span>
              </router-link>
              <router-link tag="li" to="/foods">
                <div class="food_type_img">
                  <img src="http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png" alt="">
                </div>
                <span class="food_type_name">美食</span>
              </router-link>
              <router-link tag="li" to="/foods">
                <div class="food_type_img">
                  <img src="http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png" alt="">
                </div>
                <span class="food_type_name">美食</span>
              </router-link>
            </ul>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <nearbyShops></nearbyShops>

    <v-bottom></v-bottom>
  </div>
</template>

<script>
  import nearbyShops from './nearbyShops.vue'
  import {mapMutations} from 'vuex'
  import '@/style/swiper.min.css'
  import '@/plugins/swiper.min.js'

  export default {
    mounted() {
      let id = this.$route.query
      console.log('id',id)

      let lists = localStorage.getItem("suggestionLIsts");
      console.log("lists",lists)
//      lists.forEach(el => {
//        console.log(el.id)
//        console.log(id)
//        if (el.id === id) {
//          _this.RECORD_ADDRESS(el);
//        }
//      })
      new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,

        // 如果需要分页器
        pagination: '.swiper-pagination'
      })
    },
    methods:{
      ...mapMutations(["RECORD_ADDRESS"])
    },
    components:{
      nearbyShops
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/common.scss";

  .guide {
    display: flex;
    .location, .search {
      height: 3.2rem;
      border-radius: 1.5rem;
      line-height: 3.2rem;
    }
    .location {
      display: flex;
      width: 12rem;
      background: rgb(166, 166, 166);
      font-size: 1.2rem;
      margin: 0 0.5rem;
      &:first-child {
        padding-left: 10px;
      }
      .iconfont {
        color: #fff;
        width: 1.5rem;
      }
      .address {
        flex: 1;
        font-size: 1.3rem;
        color: #fff;
      }
    }
    .search {
      flex: 1;
      background: rgb(237, 237, 237);

      .iconfont {
        display: inline-block;
        font-size: 1.5rem;
        padding-left: 10px;
        line-height: 3.5rem;
        vertical-align: top;
      }
      span {
        font-size: 1.3rem;
        display: inline-block;
        padding-left: 10px;
      }
    }
  }

  .food_type {
    .lists {
      ul {
        @include clearfix;
        li {
          float: left;
          width: 25%;
          padding: 1.5rem;
          text-align: center;
          .food_type_img {
            img {
              width: 100%;
              height: 100%;
            }
          }
          .food_type_name {
            font-size: 1.3rem;
          }
        }
      }
    }

  }

</style>
