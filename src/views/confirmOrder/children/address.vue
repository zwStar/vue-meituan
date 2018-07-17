<!--订单收货地址-->
<template>
  <div id="address">
    <v-head title="收货地址" goBack="true" bgColor="#f4f4f4"></v-head>
    <div class="container">
      <ul>
        <li v-for="item in addressLists" :key="item.id" @click="selectAddress(item)">
          <p>{{item.address}} {{item.house_number}}</p>
          <span class="name">{{item.name}}</span>
          <span class="sex">{{item.gender === 'female' ? '女士' : '先生'}}</span>
          <span class="phone">{{item.phone}}</span>
          <i class="iconfont icon-select" v-if="item.id === selectAddressId">&#xe6da;</i>
        </li>
      </ul>
    </div>
    <router-link tag="div" class="add" :to="{path:'/add_address'}">
      <i class="iconfont icon">&#xe606;</i>
      <span>新增收获地址</span>
    </router-link>
    <div class="empty-address" v-show="emptyAddress">
      <span>一个地址都没有哦</span>
    </div>
  </div>
</template>

<script>
  import {getAllAddress} from '@/api/user'

  export default {
    data() {
      return {
        addressLists: [],
        selectAddressId: '',
        emptyAddress: false
      }
    },
    methods: {
      selectAddress(item) {
        this.select_address_id = item.id;
        this.$store.dispatch('recodeDeliveryAddress', item); //地址信息由vuex管理
        this.$router.go(-1);                //返回上一个路由
      },
    },
    created() {
      getAllAddress().then((response) => {    //获取用户地址
        let data = response.data;
        if (data.status === 200) {
          if (!data.address.length) {
            this.emptyAddress = true;
          } else {
            this.emptyAddress = false;
            this.addressLists = response.data.address;
            this.selectAddressId = this.addressLists[0].id;
          }
        }
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../style/mixin";

  #address {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 202;
    background: #f4f4f4;
    .container {
      ul {
        li {
          position: relative;
          padding: 0.2rem;
          background: #fff;
          p {
            font-size: 0.4rem;
            font-weight: 600;
            margin: 0.1rem 0;
          }
          span {
            color: #848484;
            font-size: 0.3rem;
            &:nth-of-type(2) {
              margin: 0 0.2rem 0 0.1rem;
            }
          }
          .icon-select {
            font-size: 0.7rem;
            position: absolute;
            top: 50%;
            right: 0.1rem;
            transform: translateY(-50%);
            color: $mtYellow;
          }
        }
      }
    }
    .empty-address {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3D(-50%, -50%, 0);
      span {
        font-size: 0.4rem;
      }
    }

    .add {
      width: 100%;
      position: fixed;
      bottom: 0;
      text-align: center;
      background: #fff;
      @include px2rem(line-height, 100);
      border-top: 1px solid $mtGrey;
      border-bottom: 1px solid $mtGrey;
      .icon {
        font-size: 0.6rem;
        color: $mtYellow;
        margin: 0 0.1rem;
      }
      span {
        font-size: 0.5rem;
        font-weight: 400;
      }
    }
  }
</style>
