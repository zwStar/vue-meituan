<!--订单详情-->
<template>
  <div id="order_detail">
    <v-head goBack="true" title_head="订单详情"></v-head>
    <section class="tip">
      <h3>{{orderStatus}}</h3>
      <h4>{{statusDesc}}</h4>
      <router-link class="buy_again" :to="{path:'/store',query:{id:restaurantInfo.id}}" tag="span">再来一单</router-link>
    </section>
    <section class="foods_info_wrap">
      <div class="title">
        <span class="restaurant_picture">
          <img :src="restaurantInfo.pic_url">
        </span>
        <span class="restaurant_name">{{restaurantInfo.name}}</span>
        <span class="icon"><i class="iconfont"></i></span>
      </div>
      {{restaurantInfo.foods}}
      <div class="foods_wrap" v-for="(item,index) in foods" :key="index">
        <span class="foods_picture">
          <img :src="item.pic_url">
        </span>
        <div class="main_wrap">
          <div>
            <span class="foods_name">{{item.name}}</span>
            <span class="price">￥{{Number(item.price * item.num).toFixed(2)}}</span>
          </div>
          <!--<span>正常</span>-->
          <span class="num">x{{item.num}}</span>
        </div>
      </div>
      <div class="other_fee">
        <div class="food_container_fee">
          <span class="fee_name">餐盒费</span>
          <span class="price">￥0</span>
        </div>
        <div class="delivery_fee">
          <span class="fee_name">配送费</span>
          <span class="price">￥{{restaurantInfo.shipping_fee}}</span>
        </div>
      </div>
      <div class="total_price border_top">
        <span class="total_price ">总计￥{{orderData.total_price.toFixed(2)}} </span><span
        class="discount_price">优惠￥0</span><span
        class="pay_price"> 实付 <strong>￥{{orderData.total_price.toFixed(2)}}</strong></span>
      </div>
      <div class="call_seller_wrap border_top">
        <span>联系商家</span>
      </div>
    </section>

    <section class="delivery_info_wrap">
      <div class="expect_delivery_time">
        <span class="item_name">期望时间</span><span class="item_value">立即配送</span>
      </div>
      <div class="delivery_address">
        <div>
          <span class="item_name">配送地址</span>
          <span class="item_value" style="display: block;">&nbsp;</span>
        </div>
        <div class="address_info">
          <span
            class="person_info item_value">{{address.name}}({{address.gender === 'male' ? '先生' : '女士'}}){{address.phone}}</span>
          <span class="address item_value">{{address.address}}</span>
        </div>
      </div>
      <div class="delivery_service">
        <span class="item_name">配送服务</span>
        <span class="item_value">由 商家 提供配送服务</span>
      </div>
    </section>

    <section class="order_info_wrap">
      <div class="order_number">
        <span class="item_name">订单号码</span>
        <span class="item_value">{{orderData.id}}</span>
        <span class="copy_order_number">复制</span>
      </div>
      <div class="order_time">
        <span class="item_name">订单时间</span>
        <span class="item_value">{{orderData.create_time}}</span>
      </div>
      <div class="delivery_way">
        <span class="item_name">支付方式</span>
        <span class="item_value">在线支付</span>
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
  #order_detail {
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
      .buy_again {
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
    .foods_info_wrap {
      .title {
        margin: 0.2rem 0;
        display: flex;
        align-items: center;
        background: #fff;
        @include px2rem(height, 105);
        .restaurant_picture {
          @include px2rem(width, 40);
          @include px2rem(height, 40);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .restaurant_name {
          font-size: 0.4rem;
          color: $shallow_grey;
        }
      }
      .foods_wrap {
        display: flex;
        .foods_picture {
          display: inline-block;
          margin-right: 0.3rem;
          @include px2rem(width, 110);
          @include px2rem(height, 110);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .main_wrap {
          flex: 1;
          div:first-child {
            display: flex;
            font-size: 0.4rem;
            .foods_name {
              flex: 1;
            }
            .price {

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
      .other_fee {
        .food_container_fee, .delivery_fee {
          margin: 0.4rem 0;
          display: flex;
        }
        .fee_name {
          flex: 1;
          font-size: 0.4rem;
        }
        .price {
          font-size: 0.5rem;
        }
      }
      //总费用
      .total_price {
        text-align: right;
        padding: 0.3rem 0;
        .total_price, .discount_price {
          font-size: 0.4rem;
        }
        .pay_price {
          font-weight: 600;
          font-size: 0.45rem;
          strong {
            color: #fb4e44;
          }
        }
      }
      //联系商家
      .call_seller_wrap {
        background: #fff;
        text-align: center;
        @include px2rem(line-height, 95);
        span {
          font-size: 0.5rem;
        }
      }

    }

    /*公共样式类*/
    .item_name {
      margin-right: 0.4rem;
      font-size: 0.45rem;
      color: $shallow_grey;
    }
    .item_value {
      font-size: 0.4rem;
      flex: 1;
    }
    & > section {
      margin: 0 0.3rem;
      padding: 0 0.2rem;
      background: #fff;
    }
    .border_top {
      border-top: 1px solid $mtGrey;
    }
    .delivery_info_wrap, .order_info_wrap {
      & > div {
        display: flex;
        align-items: center;
        @include px2rem(height, 90);
      }
    }
    //配送信息部分

    .delivery_info_wrap {

      .delivery_address {
        display: flex;
        .address_info {
          flex: 1;
          .address {
            display: block;
          }
        }
      }

    }
    //订单详细信息部分
    .order_info_wrap {
      margin-top: 0.3rem;
      .copy_order_number {
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
