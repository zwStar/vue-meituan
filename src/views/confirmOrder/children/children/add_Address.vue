<template>
  <div id="address">
    <v-head title_head="新增收货地址" goBack=true>
      <span slot="save_address" style="position:absolute; right:15px;top:2px;font-size: 0.5rem; font-weight: 600;" @click="save();">保存</span>
    </v-head>
    <form>
      <h3>联系人</h3>
      <div class="name">
        <label for="name">姓名:</label>
        <div class="input_wrap">
          <input type="text" v-model="form.name" id="name" placeholder="请填写收货人的姓名">
        </div>
      </div>
      <div class="gender">
        <div @click="selectGender('male')">
          <i class="iconfont" v-if="form.gender === 'male'">&#xe6da;</i>
          <i class="circle" v-else></i>
          <span>先生</span>
        </div>
        <div @click="selectgender('female')">
          <i class="iconfont" v-if="form.gender==='female'">&#xe6da;</i>
          <i class="circle" v-else></i>
          <span>女士</span>
        </div>
      </div>
      <span></span>
      <span></span>
      <div class="phone">
        <label for="phone">电话:</label>
        <div class="input_wrap">
          <input type="text" v-model="form.phone" id="phone" placeholder="请填写收货手机号码">
        </div>
      </div>
      <h3>收货地址</h3>
      <div class="location">
        <label>小区/大厦/学校:</label>
         <router-link :to="{path:'/add_address/location'}" class="toLocate input_wrap select_address_wrap">
           <i class="iconfont">&#xe605;</i>
           <span v-if="delivery_address.title!=''">{{delivery_address.title}}</span>
           <span v-else>点击选择</span>
           <i class="iconfont icon-right">&#xe63f;</i>
         </router-link>

      </div>
      <div class="house_number">
        <label for="house_number">楼号-门牌号:</label>
          <div class="input_wrap">
            <input type="text" v-model="form.house_number" id="house_number" placeholder="例:16号楼427室">
          </div>
      </div>
    </form>
    <router-view></router-view>
  </div>
</template>

<script>
  import {add_address} from '@/api/user'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        form: {
          name: '',
          phone: null,
          gender: "male",
          house_number: ''
        }
      }
    },
    computed: {
      ...mapState(['delivery_address'])
    },
    methods: {
      selectGender(gender) {
        this.form.gender = gender;
      },
      save() {
        console.log(this.form)
        console.log("state", this.delivery_address)
        let state = this.delivery_address
        let address_detail = state.address;
        let address = state.title;
        let province = state.province;
        let city = state.city;
        this.form = {...this.form,...state.location,address_detail, address,province,city};
        console.log("this.form", this.form)
        add_address(this.form).then((response) => {
          if(response.data.status == 1){
            this.$router.go(-1);
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../../style/mixin";
  #address {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f4f4f4;
    form {
      h3 {
        font-size: 0.3rem;
        font-weight: 600;
        margin:0.4rem;
      }
      .name, .phone, .location, .house_number {
        background: #fff;
        border-bottom: 1px solid $mtGrey;
      }
      label {
        @include px2rem(line-height,85);
        float:left;
        font-size: 0.4rem;
        font-weight: 600;
        margin-left: 0.2rem;
      }
      .input_wrap{
        display: block;
        margin-left:3rem;
      }
      input {
        width:100%;
        @include px2rem(height,85);
        border: none;
        font-size:0.45rem;
        text-indent: 10px;
        outline: none;
        &::-webkit-input-placeholder {
          font-size: 0.4rem;
          color: #9d9d9d;
          font-weight: 600;
        }
      }
      /*定位*/
      .location {
        font-size: 0.4rem;
        .select_address_wrap{
          @include px2rem(line-height,85);
          .icon-right{
            float:right;
            margin-right:10px;
          }
        }
        .toLocate {
          flex: 1;
          color: #9d9d9d;
        }
      }
      /*选择性别*/
      .gender {
        text-align: center;
        padding: 0.1rem 0;
        background: #fff;
        border-bottom: 1px solid $mtGrey;
        div {
          display: inline-block;
          margin: 0.5rem 0.5rem;
          .iconfont, .circle {
            @include px2rem(width,36);
            @include px2rem(height,36);
            display: inline-block;
            color: #fff;
            border-radius: 50%;
            vertical-align: middle;
          }
          span {
            font-size:0.4rem;
            font-weight: 600;
            margin: 0 0.1rem;
          }
          .iconfont {
            background: $mtYellow;
            font-size: 0.6rem;
            @include px2rem(line-height,36);
            text-align: center;
          }
          .circle {
            border: 1px solid $mtGrey;
          }
        }
      }
    }
  }
</style>
