<template>
  <div id="store">
    <div class="head-wrapper">
      <v-head :title_head="poi_info.name" goBack=true    color="#fff"></v-head>
      <div class="store-info">
        <div class="logo">
          <img :src="poi_info.pic_url">
        </div>
        <div class="deliver-info">
          <span>{{poi_info.min_price_tip}}  | {{poi_info.shipping_fee_tip}} | {{poi_info.delivery_time_tip}}</span>
          <p><i class="iconfont icon-broadcast">&#xe62d;</i>{{poi_info.bulletin}}</p>
        </div>
      </div>
      <div class="actives">
        <ul :style=" 'transform: translateY('+ positionY % discountsLength * -3 +'rem)'">
          <li v-for="item in poi_info.discounts2">
            <i class="icon"
               :style="{backgroundImage:'url('+ item.icon_url+')'}"></i>
            <span>{{item.info}}</span>
          </li>
        </ul>
        <span class="active-number" @click="showStoreDetail();">{{discountsLength}}个活动 > </span>
      </div>
    </div>

    <div class="nav">
      <router-link :to="{name:'Menu',query:{id:restaurant_id}}" class="menu"><span class="active">点菜</span>
      </router-link>
      <router-link :to="{name:'Evaluate',query:{id:restaurant_id}}" class="evaluate"><span>评价</span></router-link>
      <router-link :to="{name:'Seller',query:{id:restaurant_id}}" class="seller"><span>商家</span></router-link>
    </div>
    <StoreDetail class="store-detail" v-show="showDetatil" :showFlag.sync="showDetatil"
                 :poi_info="poi_info"></StoreDetail>
    <router-view></router-view>
    <Bottom
      :totalPrice="totalPrice"
      :shipping_fee="poi_info.shipping_fee"
      :min_price="poi_info.min_price"
      :min_price_tip="poi_info.min_price_tip"
      :shipping_fee_tip="poi_info.shipping_fee_tip"
    ></Bottom>
  </div>
</template>

<script>
  import {getRestaurant} from '@/api/getData'
  import Bottom from './bottom.vue'
  import StoreDetail from './store-detail.vue'
  import {mapState} from 'vuex'

  export default {
    components: {
      Bottom,
      StoreDetail
    },
    data() {
      return {
        showDetatil: false, //商家详情显示
        restaurant_id: 0,   //商店id
        poi_info: {},        //商家信息
        positionY: 0         //活动滚动
      }
    },
    computed: {
      //商家活动数量
      ...mapState([
        'cartList'
      ]),
      totalPrice() {
        return this.cartList.totalPrice;
      },
      discountsLength() {
        return this.poi_info.discounts2 ? this.poi_info.discounts2.length : 0;
      }
    },
    methods: {
      //商家详情显示
      showStoreDetail() {
        this.showDetatil = true;
      }
    },
    mounted() {
      //根据路由query获得商店id
      let restaurant_id = this.$route.query.id;
      localStorage.setItem('restaurant_id', restaurant_id);
      getRestaurant(restaurant_id).then((result) => {
        let data = result.data.data;
        console.log(data)
        this.poi_info = data.poi_info;
        console.log(this.poi_info)
        this.food_spu_tags = data.food_spu_tags;
//        this.$nextTick(() => {
//          this.leftScroll = new BScroll(this.$refs.left, {});
//          this.rightScroll = new BScroll(this.$refs.right, {});
//        })
      })
      this.timer = setInterval(() => {
        this.positionY++;
      }, 4000);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";

  #store {
    .head-wrapper {
      background: rgb(51, 51, 51);
      #head {
        background: rgb(51, 51, 51);
      }
      .store-info {
        padding-bottom: 1rem;
        border-bottom: 1px solid $mtGrey;
        display: flex;
        margin-top: 1rem;
        .logo {
          width: 3rem;
          height: 3rem;
          margin: 0 1rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .deliver-info {
          flex: 1;
          span, p {
            color: $mtGrey;
            font-size: 1.0rem;
          }
          p {
            width: 20rem;
            margin-top: 0.7rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .icon-broadcast {
              display: inline-block;
              font-size: 1.4rem;
              margin-right: 0.5rem;
              vertical-align: middle;
            }
          }
        }
      }
      /*活动列表样式*/
      .actives {
        height: 3rem;
        overflow: hidden;
        line-height: 3rem;
        margin: 0 1rem;
        position: relative;
        ul {
          transition: all 2s;
          li {
            .icon {
              display: inline-block;
              width: 1.5rem;
              height: 1.5rem;
              background-size: cover;
              vertical-align: middle;
              margin-right: 0.5rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
        span {
          color: $mtGrey;
          display: inline-block;
        }
        .active-number {
          position: absolute;
          top: 0;
          right: 0;
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

  @keyframes load {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-50px);
    }
    100% {
      transform: translateY(0px);
    }
  }

</style>
