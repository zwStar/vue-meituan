<template>
  <div id="address">
    <v-head title_head="我的收货地址" goBack=true></v-head>
    <nav>
      <span>我的收获地址</span>
      <span v-show="!status" @click="managerAddress()">管理</span>
      <span v-show="status" @click="finish()">完成</span>
    </nav>
    <div class="container">
      <ul>
        <li v-for="(list,index) in addressLists" :key="list.id">
          <div>
            <p>{{list.address}} {{list.house_number}}</p>
            <span class="name">{{list.name}}</span>
            <span class="sex">{{list.gender === 'female' ? '女士' : '先生'}}</span>
            <span class="phone">{{list.phone}}</span>
          </div>
          <i class="iconfont edit" v-show="status" @click="editAddress(list.id)">&#xe60b;</i>
          <i class="iconfont delete" v-show="status" @click="deleteAddress(list.id,index)">&#xe615;</i>
        </li>
      </ul>
    </div>
    <router-link tag="div" class="add" :to="{name:'Add_Address'}">
      <i class="iconfont icon">&#xe606;</i>
      <span>新增收获地址</span>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getAllAddress, deleteAddress} from '@/api/user'

  export default {
    data() {
      return {
        addressLists: [],
        selectAddressId: '',
        status: 0
      }
    },
    methods: {
      managerAddress() {
        this.status = 1;
      },
      finish() {
        this.status = 0;
      },
      deleteAddress(id, index) {
        deleteAddress({address_id: id}).then((response) => {
          console.log('delete response', response)
          if (response.data.status === 1) {
            this.addressLists.splice(index, 1); //通过splice 删除数据
          }
        })
      },
      editAddress(id) {
        this.$router.push({path: '/home/address/edit', query: {address_id: id}});
      }
    },
    created() {
      getAllAddress().then((response) => {
        this.addressLists = response.data.address;
        this.selectAddressId = this.addressLists[0].id;
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../style/mixin";

  $grey: #999;
  #address {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 202;
    background: #f4f4f4;
    nav {
      display: flex;
      padding: 0.3rem 0;
      background: #fff;
      span {
        font-size: 0.4rem;
        margin-right: 0.2rem;
        font-weight: 500;
      }
      span:first-child {
        flex: 1;
        font-weight: normal;
        color: $grey;
        margin-left: 0.2rem;
      }

    }
    .container {
      margin-top: 0.2rem;
      ul {
        li {
          display: flex;
          align-items: center;
          position: relative;
          padding: 0.2rem;
          background: #fff;
          div {
            flex: 1;
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
          }
          .edit, .delete {
            font-size: 0.6rem;
            color: $mtYellow;
          }
          .edit {
            margin: 0 0.3rem;
          }
        }
      }
    }
    .add {
      width: 100%;
      position: fixed;
      bottom: 0;
      text-align: center;
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
