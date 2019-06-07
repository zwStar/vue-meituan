<template>
  <div id="selector">
    <div class="ball-container" @click="reduceCart" v-if="food_num">
      <span class="reduce"><i class="iconfont icon-reduce">&#xe613;</i></span>
    </div>
    <span class="number" v-if="food_num">{{food_num}}</span>
    <div class="ball-container" @click="addCart($event)">
      <span class="add"><i class="iconfont icon-add">&#xe6a9;</i></span>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
//    接收父组件传递进来的货物  和 商店 id 和图片url
    props: ['food_id', 'name', 'price', 'pic'],
    methods: {
      addCart(event) {
        let elRight = event.target.getBoundingClientRect().right; //选择器的右边 离左边页面的位置
        let elBottom = event.target.getBoundingClientRect().bottom;   //选择器的底部  离顶部页面的位置
        let {pic_url} = this.poi_info;   //商店名字 图片
        let restaurant_name = this.poi_info.name;
        this.$store.dispatch('addCart', {
          restaurant_name,
          pic_url,
          name: this.name,
          price: this.price,
          foods_pic: this.pic,
          food_id: this.food_id,
          restaurant_id: this.poi_info.id,
        });
        this.$emit('showDot', elRight, elBottom);
      },
      reduceCart() {
        this.$store.dispatch('reduceCart', {restaurant_id: this.poi_info.id, food_id: this.food_id})
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
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .reduce, .add {
      display: flex;
      border-radius: 50%;
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
    .ball-container {
      padding: 0.1rem;
    }
    .add {
      margin: 0 0.1rem;
      background: $mtYellow;
    }
    .icon-reduce, .icon-add {
      display: flex;
      font-size:0.4rem;
      @include px2rem(width, 50);
      @include px2rem(height, 50);
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    .icon-reduce {
      color: $mtGrey;
    }
  }
</style>
