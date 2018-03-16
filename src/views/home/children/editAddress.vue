<template>
  <div id="editAddress">
    <v-head title_head="编辑收货地址" goBack=true>
      <span slot="save_address" style="position:absolute; right:15px;top:2px;font-size: 0.5rem; font-weight: 600;"
            @click="save();">保存</span>
    </v-head>
    <AddressInfo :formData.sync="formData"></AddressInfo>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getAddress} from '@/api/user'
  import {mapGetters} from 'vuex'
  import AddressInfo from '@/components/addressInfo'

  export default {
    data() {
      return {
        formData: {
          name: '',
          phone: null,
          gender: "male",
          house_number: ''
        }
      }
    },
    computed: {
      ...mapGetters(['deliveryAddress'])
    },

    methods: {
      save() {
        console.log('formData', this.formData);
        /* let state = this.delivery_address
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
         })*/
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
    },
    created() {
      let address_id = this.$route.query.address_id;
      getAddress({address_id}).then((response) => {
        console.log('获取指定地址response', response)
        let data = response.data;
        this.formData = data.address;
        this.formData.title = data.address_detail;
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../style/mixin";

  #editAddress {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f4f4f4;

  }
</style>
