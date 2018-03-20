<template>
  <div id="address">
    <v-head title_head="新增收货地址" goBack=true>
      <span slot="save_address" class="save_btn_style" @click="save();">保存</span>
    </v-head>
    <AddressInfo :formData.sync="formData"></AddressInfo>
    <router-view></router-view>

    <Loading v-show="loading"></Loading>
    <alertTip :text="alertText" :showTip.sync="showTip"></alertTip>
  </div>
</template>

<script>
  import {add_address} from '@/api/user'
  import {mapGetters} from 'vuex'
  import AddressInfo from '@/components/addressInfo'

  export default {
    data() {
      return {
        formData: {
          name: '',
          phone: null,
          gender: "male",
          house_number: '',

        },
        satisfySubmit: false,
        alertText: '',      //提示
        showTip: false,
        loading: false
      }
    },
    computed: {
      ...mapGetters(['deliveryAddress'])
    },
    methods: {
      save() {
        let dissatisfy = Object.values(this.formData).some((value) => {
          return !value
        })
        this.satisfySubmit = !dissatisfy;
        if (dissatisfy) {
          this.alertText = '信息填写不完整'
          this.showTip = true;

        } else {
          let {location, address, province, city} = this.deliveryAddress;
          let form = {...this.formData, ...location, address, province, city}
          add_address(form).then((response) => {
            if (response.data.status === 1) {
              this.$router.go(-1);
            }
          })
        }
      }
    },
    components: {
      AddressInfo
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
    .save_btn_style {
      position: absolute;
      right: 15px;
      top: 2px;
      font-size: 0.5rem;
      font-weight: 600;
    }
  }
</style>
