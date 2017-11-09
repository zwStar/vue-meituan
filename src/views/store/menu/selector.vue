<template>
  <div id="selector">
    <span class="reduce"><i class="iconfont icon-reduce">&#xe60d;</i></span>
    <span class="number"></span>
    <span class="add" @click="addToCart($event)"><i class="iconfont icon-add">&#xe600;</i></span>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        dotLists: []
      }
    },
    props: ['sups'],
    methods: {
      ...mapMutations(['ADD_CART']),
      addToCart(event) {
        let elLeft = event.target.getBoundingClientRect().left;
        let elBottom = event.target.getBoundingClientRect().bottom;
        this.dotLists.push(true);
        console.log("this.sups",this.sups)
        let food = this.sups;
        let food_id = food.skus[0].id;  //商品id
        let price = food.skus[0].price; //商品价格
        let name = food.name;   //商品名字
        this.ADD_CART({food_id,price,name});
        this.$emit('showDot', this.dotLists, elLeft, elBottom);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../style/mixin.scss";

  #selector {
    .reduce, .add {
      display: inline-block;
      width: 2.184rem;
      border-radius: 50%;
      background: $mtYellow;
      text-align: center;
    }
    .icon-reduce, .icon-add {
      font-size: 1.6rem;
      line-height: 2.184rem;
    }
  }
</style>
