<template>
  <div id="address-info">
    <form>
      <h3>联系人</h3>
      <div class="name">
        <label for="name">姓名:</label>
        <div class="input-container">
          <input type="text" v-model="formData.name" id="name" placeholder="请填写收货人的姓名">
        </div>
      </div>
      <div class="gender">
        <div @click="selectGender('male')">
          <i class="iconfont" v-if="formData.gender === 'male'">&#xe6da;</i>
          <i class="circle" v-else></i>
          <span>先生</span>
        </div>
        <div @click="selectGender('female')">
          <i class="iconfont" v-if="formData.gender==='female'">&#xe6da;</i>
          <i class="circle" v-else></i>
          <span>女士</span>
        </div>
      </div>
      <div class="phone">
        <label for="phone">电话:</label>
        <div class="input-container">
          <input type="text" v-model="formData.phone" id="phone" placeholder="请填写收货手机号码">
        </div>
      </div>
      <h3>收货地址</h3>
      <div class="location">
        <label>小区/大厦/学校:</label>
        <router-link :to="{path:'/add_address/location'}" class="to-locate input-container select-address-container">
          <i class="iconfont">&#xe605;</i>
          <span v-if="formData.title!=''">{{formData.title}}</span>
          <span v-else>点击选择</span>
          <i class="iconfont icon-right">&#xe63f;</i>
        </router-link>

      </div>
      <div class="house-number">
        <label for="house-number">楼号-门牌号:</label>
        <div class="input-container">
          <input type="text" v-model="formData.house_number" id="house-number" placeholder="例:16号楼427室">
        </div>
      </div>
    </form>
  </div>
</template>

<script>

  export default {
    props: ['formData'],
    methods: {
      selectGender(sex) {
        this.formData.gender = sex;
      }
    },
    watch: {
      formData(val) {
        this.$emit('update:formData', val);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../style/mixin";

  #address-info {
    form {
      h3 {
        font-size: 0.3rem;
        font-weight: 600;
        margin: 0.4rem 0.2rem;
      }
      .name, .phone, .location, .house-number {
        background: #fff;
        border-bottom: 1px solid $mtGrey;
      }
      label {
        @include px2rem(line-height, 85);
        float: left;
        font-size: 0.4rem;
        font-weight: 600;
        margin-left: 0.2rem;
      }
      .input-container {
        display: block;
        margin-left: 3rem;
      }
      input {
        width: 100%;
        @include px2rem(height, 85);
        border: none;
        font-size: 0.45rem;
        text-indent: 10px;
        outline: none;
        &::-webkit-input-placeholder {
          font-size: 0.4rem;
          color: #9d9d9d;
        }
      }
      /*定位*/
      .location {
        font-size: 0.4rem;
        .select-address-container {
          @include px2rem(line-height, 85);
          .icon-right {
            float: right;
            margin-right: 10px;
          }
        }
        .to-locate {
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
            @include px2rem(width, 36);
            @include px2rem(height, 36);
            display: inline-block;
            color: #fff;
            border-radius: 50%;
            vertical-align: middle;
          }
          span {
            font-size: 0.4rem;
            font-weight: 600;
            margin: 0 0.1rem;
          }
          .iconfont {
            background: $mtYellow;
            font-size: 0.6rem;
            @include px2rem(line-height, 36);
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
