<!--提交订单-->
<template>
  <div id="confirm-order">
    <v-head title="提交订单" goBack="true" bgColor="#f4f4f4"></v-head>
    <div class="delivery-info-container">
      <!--地址信息-->
      <router-link class="info-container address-container" v-if="emptyAddress" to="/add_address">
        <div class="address-info">
          <i class="iconfont icon-add">&#xe600;</i>
          <span class="add-text">新增收货地址</span>
        </div>
        <i class="iconfont icon-right">&#xe63f;</i>
      </router-link>
      <router-link class="info-container address-container" to="/confirmOrder/address" v-else>
        <div class="address-info">
          <i class="iconfont icon-location">&#xe604;</i>
          <div class="main-info">
            <p class="address">{{defineAddress.address}}</p>
            <span class="name">{{defineAddress.name}}</span>
            <span class="gender">{{gender}}</span>
            <span class="phone">{{defineAddress.phone}}</span>
          </div>
        </div>
        <i class="iconfont icon-right">&#xe63f;</i>
      </router-link>

      <!--送达信息-->
      <div class="info-container arrival-container">
        <div class="arrival-info">
          <i class="iconfont icon-time">&#xe621;</i>
          <div class="main-info">
            <span class="date-type-tip">送达时间</span>
            <span class="select-view-time">10：25分到</span>
          </div>
        </div>
        <i class="iconfont icon-right">&#xe63f;</i>
      </div>
    </div>


    <div class="container">
      <!--商家信息-->
      <div class="head" v-if="poi_info">
        <i class="poi-icon" :style="{backgroundImage:'url('+poi_info.pic_url +')'}"></i>
        <span class="poi-name">{{poi_info.name}}</span>
        <span
          class="delivery-type-icon"
          :style="{backgroundImage:'url(http://p0.meituan.net/aichequan/019c6ba10f8e79a694c36a474d09d81b2000.png)'}">
        </span>
      </div>
      <!--商品列表-->
      <ul class="food-list">
        <li v-for="(item,key) in order_data" :key="item.id" v-if="Number(key)">
          <div class="picture">
            <img :src="item.foods_pic">
          </div>
          <div class="food-list-right-part">
            <div>
              <span class="name">{{item.name}}</span>
              <span class="price">￥{{item.price}}</span>
            </div>
            <div>
              <span class="count">x{{item.num}}</span>
            </div>
          </div>
        </li>
      </ul>
      <ul class="other-fee-container">
        <li>
          <span>包装费</span>
          <span class="box-total-price">￥0</span>
        </li>
        <li>
          <span>配送费</span>
          <span>￥0</span>
        </li>
      </ul>
      <div class="total-price-container">
        <span>已优惠￥0</span>
        <span class="total-price">小计<strong>￥{{totalPrice}}</strong></span>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <span class="discount-fee">已优惠￥0</span>
        <span class="total">合计<strong>￥{{totalPrice}}</strong></span>
      </div>
      <span class="submit" @click="submit()">提交订单</span>
    </div>
    <router-view></router-view>
    <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
  </div>
</template>

<script>
  import {getRestaurant} from '@/api/restaurant'
  import {getAllAddress} from '@/api/user'
  import {submitOrder} from '@/api/order'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        order_data: null,
        defineAddress: {},
        poi_info: null,
        totalPrice: 0,
        totalNum: 0,
        restaurant_id: null,
        emptyAddress: true,   //还没有收货地址 需要新增
        alertText: '',
        showTip: false,
        preventRepeat: false
      }
    },
    computed: {
      ...mapGetters(['deliveryAddress']),
      gender() {
        return this.defineAddress.gender === 'male' ? '先生' : '女士'
      }
    },
    methods: {
      submit() {
        if (this.emptyAddress) {   //如果没有填收货地址
          this.alertText = '请添加收货地址'
          this.showTip = true;
          return;
        }
        if (this.preventRepeat)
          return;
        this.preventRepeat = true;
        let foods = [];
        let keys = Object.keys(this.order_data);
        keys.forEach((key) => {
          if (Number(key))
            foods.push({skus_id: key, num: this.order_data[key]['num']})
        })
        submitOrder({restaurant_id: this.restaurant_id, foods, address_id: this.defineAddress.id}).then((response) => {
          if (response.data.status === 200) {
            this.$router.push({path: '/pay', query: {order_id: response.data.order_id}})
          }
        })
      }
    },
    created() {
      let confirmOrderData = JSON.parse(localStorage.getItem('confirmOrderData'));    //获取当前准备下单的商品
      this.restaurant_id = confirmOrderData.restaurant_id;  //餐馆id
      this.totalNum = confirmOrderData.foods.totalNum;     //总数量
      this.order_data = confirmOrderData.foods;              //食物信息
      //获取用户收货地址
      getAllAddress().then((response) => {
        let data = response.data;
        if (data.address.length) {      //判断该用户有没有收货地址
          this.emptyAddress = false;
          this.defineAddress = data.address[0];  //默认第一个为默认收获地址
        } else {
          this.emptyAddress = true;
        }
      })
      //根据商店id获取店家信息
      getRestaurant({restaurant_id: this.restaurant_id}).then((response) => {
        this.poi_info = response.data.data;
        this.totalPrice = Number(confirmOrderData.foods.totalPrice).toFixed(2); //总价格
      })
    },
    watch: {
      deliveryAddress(address) {
        this.defineAddress = address;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";

  $grey: #666;
  #confirm-order {
    color: #222;
    background: #f4f4f4;
    z-index: 100;
    .icon-right {
      font-size: 0.4rem;
    }

    .info-container {
      background: #fff;
      display: flex;
      align-items: center;
      padding: 0.3rem;
      justify-content: space-between;
      .iconfont {
        margin: 0 0.1rem;
        font-size: 0.5rem;
      }
    }
    .address-container {
      border-bottom: 1px solid $mtGrey;
    }
    .address-info, .arrival-info {
      display: flex;
      align-items: center;
    }
    .address-info {
      .address {
        font-size: 0.4rem;
      }
      .name, .gender, .phone {
        font-size: 0.2rem;
        color: $grey;
      }
      .phone {
        margin-left: 0.5rem;
      }
      .add-text {
        color: $mtYellow;
        font-size: 0.4rem;
      }
      .icon-add {
        font-size: 0.3rem;
        padding: 0.05rem;
        border-radius: 50%;
        background: $mtYellow;
        color: #fff;
      }
    }
    .arrival-info {
      display: flex;
      align-items: center;
      .main-info {
        display: flex;
      }
      .date-type-tip {
        font-size: 0.4rem;
        font-weight: 500;
      }
      .select-view-time {
        font-size: 0.4rem;
        margin-left: 0.1rem;
        color: #368ced;
      }
    }

    /*商品部分样式*/
    .container {
      margin: 0.21rem 0;
      background: #fff;
      padding: 0 0.1rem 1rem;
      .head {
        @include px2rem(height, 95);
        display: flex;
        align-items: center;
        .poi-icon {
          display: inline-block;
          @include px2rem(width, 30);
          @include px2rem(height, 30);
          margin-right: 0.2rem;
        }
        .poi-name {
          flex: 1;
          color: #7b7b7b;
          font-size: 0.3rem;
        }
        .delivery-type-icon {
          @include px2rem(width, 102);
          @include px2rem(height, 30);
        }
        .poi-icon, .delivery-type-icon {
          background-size: 100% 100%;
        }
      }
      /*商品列表样式*/
      .food-list {
        li {
          display: flex;
          padding: 0.2rem 0;
          margin-top: 0.1rem;
          background: #fbfbfb;
          .picture {
            @include px2rem(width, 110);
            @include px2rem(height, 110);
            img {
              width: 100%;
              height: 100%;
            }
          }
          .food-list-right-part {
            flex: 1;
            & > div {
              display: flex;
              justify-content: space-between;
              margin-left: 0.2rem;
              .name {
                font-size: 0.4rem;
                font-weight: 500;
                i {
                  display: inline-block;
                  @include px2rem(width, 30);
                  @include px2rem(height, 30);
                  margin: 0 0.3rem;
                  background-size: cover;
                  vertical-align: middle;
                }
                span {
                  vertical-align: middle;
                }
              }
              .count {
                font-size: 0.3rem;
                display: inline-block;
                margin-top: 0.2rem;
                color: #9f9f9f;
              }
              .original-price {
                font-size: 0.2rem;

              }
              .price {
                display: block;
                font-size: 0.45rem;
                font-weight: 500;
              }
            }
          }
        }
      }
      /*包装费 配送费 优惠券*/
      .other-fee-container, .coupon-info-list-container {
        margin-left: 0.26rem;
        li {
          display: flex;
          padding: 0.26rem 0;
          span:first-child {
            flex: 1;
            font-size: 0.4rem;
            font-weight: 500;
          }
          span:nth-child(2) {
            font-size: 0.35rem;
          }
        }
      }
      .total-price-container {
        text-align: right;
        margin-right: 0.2rem;
        padding: 0.44rem 0;
        border-top: 1px dashed #999;

        span:first-child {
          font-size: 0.45rem;
          font-weight: 500;
          color: #999;
        }
        .total-price {
          font-size: 0.45rem;
          font-weight: 500;
          strong {
            color: #fb4e44;
          }
        }
      }
    }
    .bottom {
      @include px2rem(height, 96);
      display: flex;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      align-items: center;
      z-index: 101;
      background: #fff;
      .left {
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        border-top: 1px solid #e0e0e0;
        .discount-fee {
          flex: 1;
          font-size: 0.4rem;
          margin-left: 0.5rem;
        }
        .total {
          font-size: 0.4rem;
          margin-right: 0.2rem;
          strong {
            color: #fb4e44;
            font-size: 0.5rem;
          }
        }
      }
      .submit {
        display: inline-flex;
        @include px2rem(width, 210);
        height: 100%;
        justify-content: center;
        align-items: center;
        font-size: 0.4rem;
        font-weight: 500;
        background: $mtYellow;
      }
    }
  }
</style>
