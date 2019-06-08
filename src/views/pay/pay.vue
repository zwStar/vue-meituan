<!--支付页面-->
<template>
  <div id="pay">
    <v-head title="支付订单" goBack="true" bgColor="#f4f4f4"></v-head>
    <div class="img">
      <img src="../../assets/pay_adv.png">
    </div>
    <!--支付剩余时间-->
    <div class="remain-time-container">
      <h3>支付剩余时间</h3>
      <div class="remain-time" v-if="!overtime">
        <span>{{minutes.slice(0, 1)}}</span><span>{{minutes.slice(1, 2)}}</span>
        <span>:</span>
        <span>{{seconds.slice(0, 1)}}</span>
        <span>{{seconds.slice(1, 2)}}</span>
      </div>
      <span class="overtime" v-else>支付超时</span>
    </div>
    <div class="order-info">
      <div class="avatar">
        <img :src="restaurant_info.pic_url">
      </div>
      <div class="info">
        <span class="price">￥{{0.01}}</span>
        <p>{{restaurant_info.name}} -{{order_id}}</p>
      </div>
    </div>
    <!--支付方式-->
    <ul class="pay-way">
      <li @click="payType = '1'">
        <span class="pay-icon"><i class="iconfont" style="color:#3d91e4;">&#xe60f;</i></span>
        <span class="pay-way-name">支付宝</span>
        <span class="selected" v-if="payType === '1'"><i class="iconfont">&#xe6da;</i></span>
        <span class="select" v-else></span>
      </li>
      <li @click="payType = '2'">
        <span class="pay-icon"><i class="iconfont" style="color:#2aaf90;">&#xe62a;</i></span>
        <span class="pay-way-name">微信支付</span>
        <span class="selected" v-if="payType === '2'"><i class="iconfont">&#xe6da;</i></span>
        <span class="select" v-else></span>
      </li>
    </ul>
    <div class="submit" @click="selectPayType()">确定支付</div>
    <transition name="fade">
      <div class="pay-channel" v-show="payWayShow">
        <div class="channel-select-container">
          <div class="scan" @click="method = 'trpay.trade.create.scan'">
            <i class="iconfont selected" v-if="method === 'trpay.trade.create.scan'">&#xe6da;</i>
            <i class="select" v-else>&#xe6da;</i>
            <span>手机扫码支付</span>
          </div>
          <div class="wap" @click="method='trpay.trade.create.wap'">
            <i class="iconfont selected" v-if="method === 'trpay.trade.create.wap'">&#xe6da;</i>
            <i class="select" v-else></i>
            <span>调起app支付</span>
          </div>
          <div class="submit" :class="{disabled:preventRepeat}" @click="submit()">确定支付</div>
        </div>
        <div class="close" @click="close();">
          <i class="iconfont icon-close">&#xe625;</i>
        </div>
      </div>
    </transition>
    <!--扫码支付-->
    <scan :payType="payType" :orderData="orderData" @close="scanShow = false;" v-show="scanShow"></scan>
    <!--调用app支付-->
    <form action="http://pay.trsoft.xin/order/trpayGetWay" method="post" id="form" ref="form">
      <input type="hidden" name="amount" v-model=form_data.amount>
      <input type="hidden" name="outTradeNo" v-model="form_data.outTradeNo">
      <input type="hidden" name="payType" v-model="payType">
      <input type="hidden" name="tradeName" v-model="form_data.tradeName">
      <input type="hidden" name="notifyUrl" v-model="form_data.notifyUrl">
      <input type="hidden" name="synNotifyUrl" v-model="form_data.synNotifyUrl">
      <input type="hidden" name="payuserid" v-model="form_data.payuserid">
      <input type="hidden" name="appkey" v-model="form_data.appkey">
      <input type="hidden" name="method" v-model="method">
      <input type="hidden" name="sign" v-model="form_data.sign">
      <input type="hidden" name="timestamp" v-model="form_data.timestamp">
      <input type="hidden" name="version" v-model="form_data.version">
    </form>
    <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
  </div>
</template>

<script>
  import scan from './scan.vue'
  import {initPay, orderInfo} from '@/api/order'

  export default {
    data() {
      return {
        restaurant_info: {
          pic_url: ''
        },
        order_info: null,
        order_id: null,
        payType: '1',  //支付渠道
        form_data: {},
        seconds: '',  //倒计时秒
        minutes: '',   //倒计时分
        payWayShow: false,
        preventRepeat: false,  //阻止多次点击
        method: 'trpay.trade.create.scan',  //支付方式
        scanShow: false,
        orderData: {},
        overtime: false,    //支付超时
        alertText: '',      //提示
        showTip: false
      }
    },
    methods: {
      submit() {              //提交支付
        if (this.preventRepeat) {
          return;
        }
        if (this.overtime) {
          this.alertText = '支付超时';
          this.showTip = true;
          return;
        }
        this.preventRepeat = true;    //防止多次点击
        initPay({order_id: this.order_id, payType: this.payType, method: this.method}).then((response) => {
          let res = response.data;
          this.preventRepeat = false;
          if (res.status === -1) {                //支付接口出错
            this.alertText = res.message;      //提示
            this.showTip = true;
            return;
          }
          if (res.status === 302) {   //判断该订单是否已经支付完成
            let _this = this;
            this.alertText = res.message;      //提示
            this.showTip = true;
            setTimeout(() => {
              _this.$router.push('/order');
            }, 1000)
            return;
          }

          if (this.method === 'trpay.trade.create.scan') {  //扫码支付方式
            this.orderData = response.data.data;
            this.scanShow = true;
          } else {            //调起APP支付
            this.form_data = response.data.data
            this.$nextTick(() => {
              this.$refs['form'].submit();
            })
          }

        })
      },
      calc_remain_time(remain_time) {   //倒计时
        let minutes = (remain_time / 60 % 60)
        this.minutes = minutes >= 10 ? minutes + '' : '0' + minutes;//计算剩余的分钟
        let seconds = (remain_time % 60);
        this.seconds = seconds >= 10 ? seconds + '' : '0' + seconds;//计算剩余的分钟;//计算剩余的秒数
        if (!this.minutes && !this.seconds) {
          clearInterval(this.timer);
          this.overtime = true;    //支付超时
        }
      },
      close() {
        this.payWayShow = false;
      },
      selectPayType() {
        if (this.overtime) {
          this.alertText = '支付超时';
          this.showTip = true;
          return;
        }
        this.payWayShow = true;
      }
    },
    mounted() {
      let _this = this;
      this.order_id = this.$route.query.order_id;
      orderInfo({order_id: this.order_id}).then((response) => {
        this.order_info = response.data.data;
        let remain_time = response.data.data.pay_remain_time;    //支付剩余时间
        this.restaurant_info = this.order_info.restaurant;   //商家信息
        if (remain_time == false) {
          this.overtime = true;
        }

        this.timer = setInterval(function () {
          remain_time--;
          _this.calc_remain_time(remain_time);
        }, 1000)
      })
    },
    components: {
      scan
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin";

  #pay {
    width: 100vw;
    height: 100vh;
    background: #f3f3f6;
    .img {
      margin: 0.3rem 0;
      @include px2rem(height, 156);
      img {
        width: 100%;
        height: 100%;
      }
    }
    //剩余时间
    .remain-time-container {
      text-align: center;
      h3 {
        font-size: 0.4rem;
        color: #727272;
      }
      .remain-time {
        span {
          font-size: 0.3rem;
          display: inline-block;
          @include px2rem(width, 35);
          @include px2rem(line-height, 30);
          color: #fff;
          background: #656467;
          margin: 0.05rem;
          border-radius: 3px;
        }
        span:nth-of-type(3) {
          color: #656467;
          background: #f3f3f6;
        }
      }
      .overtime {
        font-size: 0.4rem;
        margin: 0.4rem 0;
      }
    }

    //订单信息
    .order-info {
      display: flex;
      align-items: center;
      background: #f8f8fb;
      margin: 0.5rem 0;
      @include px2rem(height, 160);
      border-top: 1px solid #e9e8ea;
      border-bottom: 1px solid #e9e8ea;
      .avatar {
        @include px2rem(width, 83);
        @include px2rem(height, 83);
        background: #fff;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 0.3rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        flex: 1;
        display: inline-block;
        .price {

        }
        p {
          font-size: 0.4rem;
          margin-top: 0.15rem;
        }
      }
    }

    //支付方式
    .pay-way {
      background: #fff;

      li {
        display: flex;
        align-items: center;
        @include px2rem(height, 100);
        padding: 0 0.5rem;
        border-bottom: 1px solid #e9e8ea;
        .pay-icon {
          margin-right: 30px;
        }
        .pay-way-name {
          flex: 1;
          font-size: 0.5rem;
        }
        .select, .selected {
          display: inline-block;
          @include px2rem(width, 50);
          @include px2rem(height, 50);
          border-radius: 50%;
        }
        .select {
          border: 1px solid #e9e8ea;
        }
        .selected {
          text-align: center;
          background: $mtYellow;
          @include px2rem(line-height, 50);
          .iconfont {
            font-size: 0.6rem;
          }
        }
      }

    }

    //支付按钮
    .submit {
      text-align: center;
      font-size: 0.55rem;
      background: $mtYellow;
      @include px2rem(width, 675);
      @include px2rem(line-height, 100);
      margin: 1rem auto;
      &.disabled {
        background: #999;
      }
    }
    .pay-channel {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(21, 17, 17, 0.8);
      .channel-select-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .scan, .wap {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.5rem 0;
          .iconfont {
            font-size: 0.4rem;
          }
        }
        span {
          color: #fff;
          font-size: 0.45rem;
        }
        .select, .selected {
          margin-right: 0.2rem;
          display: inline-block;
          @include px2rem(width, 50);
          @include px2rem(height, 50);
          border-radius: 50%;
        }
        .select {
          border: 1px solid #e9e8ea;
        }
        .selected {
          text-align: center;
          background: $mtYellow;
          @include px2rem(line-height, 50);
          .iconfont {
            font-size: 0.6rem;
          }
        }
      }

      .close {
        position: absolute;
        top: 90%;
        left: 50%;
        transform: translateX(-50%);
        .icon-close {
          color: #fff;
        }
      }
    }
  }
</style>
