<!--订单详情-->
<template>
  <div id="order-detail">
    <v-head goBack="true" title="订单详情"></v-head>
    <section class="tip">
      <h3>{{orderStatus}}</h3>
      <h4>{{statusDesc}}</h4>
      <router-link class="buy-again" :to="{path:'/store',query:{id:restaurantInfo.id}}" tag="span">再来一单</router-link>
    </section>
    <section class="foods-info-container">
      <div class="title">
        <span class="restaurant-picture">
          <img :src="restaurantInfo.pic_url">
        </span>
        <span class="restaurant-name">{{restaurantInfo.name}}</span>
        <span class="icon"><i class="iconfont"></i></span>
      </div>
      {{restaurantInfo.foods}}
      <div class="foods-container" v-for="(item,index) in foods" :key="index">
        <span class="foods-picture">
          <img :src="item.pic_url">
        </span>
        <div class="main-container">
          <div>
            <span class="foods-name">{{item.name}}</span>
            <span class="price">￥{{Number(item.price * item.num).toFixed(2)}}</span>
          </div>
          <!--<span>正常</span>-->
          <span class="num">x{{item.num}}</span>
        </div>
      </div>
      <div class="other-fee">
        <div class="food-container-fee">
          <span class="fee-name">餐盒费</span>
          <span class="price">￥0</span>
        </div>
        <div class="delivery-fee">
          <span class="fee-name">配送费</span>
          <span class="price">￥{{restaurantInfo.shipping_fee}}</span>
        </div>
      </div>
      <div class="total-price border-top">
        <span class="total-price ">总计￥{{orderData.total_price.toFixed(2)}} </span><span
        class="discount-price">优惠￥0</span><span
        class="pay-price"> 实付 <strong>￥{{orderData.total_price.toFixed(2)}}</strong></span>
      </div>
      <div class="call-seller-container border-top">
        <span>联系商家</span>
      </div>
    </section>

    <section class="delivery-info-container">
      <div class="expect-delivery-time">
        <span class="item-name">期望时间</span>
        <span class="item-value">立即配送</span>
      </div>
      <div class="delivery-address">
        <div>
          <span class="item-name">配送地址</span>
          <span class="item-value" style="display: block;">&nbsp;</span>
        </div>
        <div class="address-info">
          <span
            class="person-info item-value">{{address.name}}({{address.gender === 'male' ? '先生' : '女士'}}){{address.phone}}</span>
          <span class="address item-value">{{address.address}}</span>
        </div>
      </div>
      <div class="delivery-service">
        <span class="item-name">配送服务</span>
        <span class="item-value">由 商家 提供配送服务</span>
      </div>
    </section>

    <section class="order-info-container">
      <div class="order-number">
        <span class="item-name">订单号码</span>
        <span class="item-value">{{orderData.id}}</span>
        <span class="copy-order-number">复制</span>
      </div>
      <div class="order-time">
        <span class="item-name">订单时间</span>
        <span class="item-value">{{orderData.create_time}}</span>
      </div>
      <div class="delivery-way">
        <span class="item-name">支付方式</span>
        <span class="item-value">在线支付</span>
      </div>
    </section>
    <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
  </div>
</template>

<script>
  import {orderInfo} from '@/api/order'

  export default {
    data() {
      return {
        orderStatus: '',  //订单状态
        statusDesc: '',   //状态描述
        restaurantInfo: {}, //餐馆信息
        foods: [],           //食物列表
        orderData: {         //订单数据
          total_price: 0
        },
        address: {},        //地址信息
        alertText: '',
        showTip: false
      }
    },
    created() {
      let id = this.$route.query.id;
      orderInfo({order_id: id}).then((response) => {
        let res = response.data;
        if (res.status === -1) {
          this.alertText = '获取订单失败';
          this.showTip = true;
          return;
        }
        let data = this.orderData = res.data;
        if (data.code === 200) {
          this.orderStatus = '订单已完成'
          this.statusDesc = '感谢您对美团外卖的支持，欢迎再次光临'
        } else {
          this.orderStatus = '订单已取消'
          this.statusDesc = '支付超时，订单已取消'
        }
        this.restaurantInfo = data.restaurant;
        this.foods = data.foods;
        this.address = data.address;
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin";

  $shallow_grey: #838383;
  #order-detail {
    margin-top: 0.2rem;
    background: #f4f4f4;
    .tip {
      margin-top: 0.4rem;
      text-align: center;
      background: #fff;
      h3 {
        padding: 0.4rem 0;
        font-size: 0.5rem;
        font-weight: 600;
      }
      h4 {
        padding: 0.2rem 0;
        color: $shallow_grey;
        font-size: 0.4rem;
      }
      .buy-again {
        margin: 0.4rem;
        display: inline-block;
        text-align: center;
        font-size: 0.35rem;
        background: #ffd161;
        @include px2rem(width, 190);
        @include px2rem(line-height, 70);
      }
    }
    //商品信息部分
    .foods-info-container {
      .title {
        margin: 0.2rem 0;
        display: flex;
        align-items: center;
        background: #fff;
        @include px2rem(height, 105);
        .restaurant-picture {
          @include px2rem(width, 40);
          @include px2rem(height, 40);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .restaurant-name {
          font-size: 0.4rem;
          color: $shallow_grey;
        }
      }
      .foods-container {
        display: flex;
        .foods-picture {
          display: inline-block;
          margin-right: 0.3rem;
          @include px2rem(width, 110);
          @include px2rem(height, 110);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .main-container {
          flex: 1;
          div:first-child {
            display: flex;
            font-size: 0.4rem;
            .foods-name {
              flex: 1;
            }
          }
          & > span {
            margin: 0.2rem 0;
            display: block;
            font-size: 0.4rem;
            color: $shallow_grey;
          }
        }
      }
      //餐盒费和配送费
      .other-fee {
        .food-container-fee, .delivery-fee {
          margin: 0.4rem 0;
          display: flex;
        }
        .fee-name {
          flex: 1;
          font-size: 0.4rem;
        }
        .price {
          font-size: 0.5rem;
        }
      }
      //总费用
      .total-price {
        text-align: right;
        padding: 0.3rem 0;
        .total-price, .discount-price {
          font-size: 0.4rem;
        }
        .pay-price {
          font-weight: 600;
          font-size: 0.45rem;
          strong {
            color: #fb4e44;
          }
        }
      }
      //联系商家
      .call-seller-container {
        background: #fff;
        text-align: center;
        @include px2rem(line-height, 95);
        span {
          font-size: 0.5rem;
        }
      }
    }

    /*公共样式类*/
    .item-name {
      margin-right: 0.4rem;
      font-size: 0.45rem;
      color: $shallow_grey;
    }
    .item-value {
      font-size: 0.4rem;
      flex: 1;
    }
    & > section {
      margin: 0 0.3rem;
      padding: 0 0.2rem;
      background: #fff;
    }
    .border-top {
      border-top: 1px solid $mtGrey;
    }
    .delivery-info-container, .order-info-container {
      & > div {
        display: flex;
        align-items: center;
        @include px2rem(height, 90);
      }
    }
    //配送信息部分
    .delivery-info-container {
      .delivery-address {
        display: flex;
        .address-info {
          flex: 1;
          .address {
            display: block;
          }
        }
      }
    }
    //订单详细信息部分
    .order-info-container {
      margin-top: 0.3rem;
      .copy-order-number {
        font-size: 0.4rem;
        display: inline-block;
        text-align: center;
        border: 1px solid $mtGrey;
        @include px2rem(width, 100);
        @include px2rem(line-height, 50);
      }
    }

  }
</style>
