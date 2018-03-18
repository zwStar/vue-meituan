<template>
  <div id="order">
    <v-head goBack="true" title_head="订单"></v-head>
    <div class="toLogin-wrap" v-if="!username">
      <div class="avatar">
        <i class="iconfont icon">&#xe623;</i>
      </div>
      <span class="tip">您还没有登录，请登录后查看订单</span>
      <router-link to="/login">
        <span class="toLogin">登录/注册</span>
      </router-link>
    </div>
    <div class="no_order" v-else-if="noOrder">
      <span>订单空空如也，快去购物吧！</span>
    </div>
    <article v-else>
      <router-link v-for="list in ordersList" :key="list.id" tag="section" :to="'/order_detail?id='+ list.id">
        <div class="title">
          <span class="restaurant_picture">
            <img :src="list.restaurant.pic_url">
          </span>
          <router-link :to="'/store/menu?id='+ list.restaurant.id" class="restaurant_name">
            {{list.restaurant.name}} <strong> > </strong>
          </router-link>
          <span class="order_status">订单已完成</span>
        </div>
        <div class="info_wrap" v-for="food in list.foods" :key="food._id">
          <div>
            <span class="foods_name">{{food.name}}</span>
            <span class="num">x{{food.num}}</span>
          </div>
          <div class="price_wrap"><span>共{{food.num}}件商品，实付</span><span>￥{{list.total_price}}</span></div>
        </div>
        <div class="buy_again">
          <span>再来一单</span>
        </div>
      </router-link>

    </article>
    <!--<div class="main">-->
    <!--<span class="tip">最近三个月没有订单哦</span>-->
    <!--</div>-->
    <v-bottom></v-bottom>
    <router-view></router-view>
  </div>
</template>

<script>
  import {orders} from '@/api/order'

  export default {
    data() {
      return {
        username: null,
        ordersList: [],
        noOrder: false
      }
    },
    created() {
      this.username = localStorage.getItem('username')
      console.log(this.username)
      if (this.username) {
        orders().then((response) => {
          this.ordersList = response.data.data;
          if (!this.ordersList.length) {
            this.noOrder = true;
          } else {
            this.noOrder = false;
          }
          console.log('orderList', this.ordersList)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";

  #order {
    min-height: 100vh;
    background: #f4f4f4;
    .toLogin-wrap {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
      .avatar {
        text-align: center;
        .icon {
          font-size: 2rem;
          color: rgb(214, 214, 214);
        }
      }
      .tip {
        font-size: 0.5rem;
        display: block;
        color: rgb(155, 153, 151);
        margin: 0.5rem 0;
        text-align: center;
      }
      .toLogin {
        display: inline-block;
        background: $mtYellow;
        @include px2rem(width, 485);
        font-size: 0.5rem;
        @include px2rem(line-height, 85);
        border-radius: 0.2rem;
      }
    }

    .no_order {
      width:100%;
      position: absolute;
      top: 50%;
      left: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
      span{
        font-size:0.4rem;

      }
    }

    article {
      section {
        background: #fff;
        margin: 0.3rem 0;
        padding: 0.2rem 0;
        .title {
          display: flex;
          align-items: center;
          margin-right: 0.3rem;
          @include px2rem(height, 100);
          .restaurant_picture {
            margin: 0 0.25rem;
            display: inline-block;
            border-radius: 50%;
            overflow: hidden;
            @include px2rem(width, 80);
            @include px2rem(height, 80);
            img {
              width: 100%;
              height: 100%;
            }
          }
          .restaurant_name {
            flex: 1;
            font-size: 0.45rem;
            font-weight: 600;
            strong {
              margin-left: 0.3rem;
            }
          }
          .order_status {
            font-size: 0.4rem;
            color: #666;
          }
        }
        .info_wrap {
          margin: 0.3rem;
          border-top: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          div:first-child {
            display: flex;
            align-items: center;
            margin: 0.3rem 0.3rem 0.3rem 1.2rem;
          }
          .foods_name, .num {
            color: #999;
          }
          .foods_name {
            font-size: 0.4rem;
            font-weight: 600;
            flex: 1;
          }
          .num {
            font-size: 0.3rem;
          }
          .price_wrap {
            margin: 0.3rem;
            font-size: 0.3rem;
            text-align: right;
          }
        }
        .buy_again {
          margin: 0.3rem;
          text-align: right;
          span {
            text-align: center;
            font-size: 0.4rem;
            display: inline-block;
            @include px2rem(width, 170);
            @include px2rem(line-height, 70);
            border: 1px solid #e4e4e4;
          }
        }
      }
    }

  }
</style>
