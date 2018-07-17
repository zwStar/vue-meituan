<!--增加收货地址-->
<template>
  <div id="address">
    <v-head title="新增收货地址" goBack=true>
      <span slot="save-address" class="btn-save" @click="save();">保存</span>
    </v-head>
    <address-info :formData.sync="formData"></address-info>
    <router-view></router-view>

    <v-loading v-show="loading"></v-loading>
    <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
  </div>
</template>

<script>
  import {add_address} from '@/api/user'
  import {mapGetters} from 'vuex'
  import addressInfo from '@/components/addressInfo'

  export default {
    data() {
      return {
        formData: {
          name: '测试',
          phone: 12345678910,
          gender: "male",
          house_number: '16号楼427',
          title: ''
        },
        satisfySubmit: false,
        alertText: '',      //提示
        showTip: false,
        loading: false,
        preventRepeat: false   //阻止重复提交
      }
    },
    computed: {
      ...mapGetters(['deliveryAddress'])
    },
    methods: {
      save() {
        if (this.preventRepeat) {
          return
        }
        let dissatisfy = Object.values(this.formData).some((value) => {
          return !value
        })
        this.satisfySubmit = !dissatisfy;
        if (dissatisfy) {
          this.alertText = '信息填写不完整'
          this.showTip = true;
        } else {
          this.preventRepeat = true;
          let {location, address, province, city, title} = this.deliveryAddress;
          let form = {...this.formData, ...location, address, province, city, title};
          add_address(form).then((response) => {
            if (response.data.status === 200) {
              this.$router.go(-1);
            }
            this.preventRepeat = false;
          })
        }
      }
    },
    components: {
      'address-info': addressInfo
    },
    watch: {
      deliveryAddress(val) {
        this.formData.title = val.title;
        this.formData = {...this.formData}
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
    .btn-save {
      position: absolute;
      right: 15px;
      top: 2px;
      font-size: 0.5rem;
      font-weight: 600;
    }
  }
</style>
