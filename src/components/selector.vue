<template>
  <div id="selector">
    <span class="reduce" @click="reduceToCart()" v-if="food_num"><i class="iconfont icon-reduce">&#xe60d;</i></span>
    <span class="number" v-if="food_num">{{food_num}}</span>
    <span class="add" @click="addToCart($event)"><i class="iconfont icon-add">&#xe600;</i></span>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
//    接收父组件传递进来的货物  和 商店 id 和图片url
    props: ['food_id', 'name', 'price', 'pic'],
    methods: {
      addToCart(event) {
        let elRight = event.target.getBoundingClientRect().right; //选择器的右边 离左边页面的位置
        let elBottom = event.target.getBoundingClientRect().bottom;   //选择器的底部  离顶部页面的位置
        let restaurant_name = this.poi_info.name;   //商店名字
        let restaurant_pic_url = this.poi_info.pic_url; //保存图片
        this.$store.dispatch('addToCart', {
          restaurant_id: this.poi_info.id,
          restaurant_name,
          restaurant_pic_url,
          foods_pic: this.pic,
          food_id: this.food_id,
          price: this.price,
          name: this.name
        })
        this.$emit('showDot', elRight, elBottom);
      },
      reduceToCart(event) {
        this.$store.dispatch('reduceToCart',{restaurant_id: this.poi_info.id, food_id: this.food_id})
      }
    },
    computed: {
      ...mapGetters([
        'cartList', 'poi_info'
      ]),
      food_num() {
        let restaurant = this.cartList[this.poi_info.id];
        return restaurant ? restaurant[this.food_id] ? restaurant[this.food_id]['num'] : 0 : 0;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../style/mixin.scss";

  #selector {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .reduce, .add {
      /*display: inline-block;*/
      display: flex;
      align-items: center;
      justify-content: center;
      @include px2rem(width, 50);
      @include px2rem(height, 50);
      border-radius: 50%;
      text-align: center;
    }
    .reduce {
      border: 1px solid $mtGrey;
      margin: 0 0.1rem;
    }
    .number {
      display: inline-block;
      margin: 0 0.15rem;
      font-size: 0.3rem;
    }
    .add {
      background: $mtYellow;
      margin: 0 0.1rem;
    }
    .icon-reduce, .icon-add {
      font-size: 0.55rem;
      @include px2rem(line-height, 50);
    }
    .icon-reduce {
      color: $mtGrey;
    }
  }
</style>
