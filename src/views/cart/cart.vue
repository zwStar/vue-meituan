<template>
  <div id="cart">
    <v-head title_head="购物车" goBack="true" bgColor="#f4f4f4"></v-head>
    <article v-for="(list,key) in cartList" :key="key">
      <section class="title">
        <span class="selected" v-if="selectFood[key]['allSelect'] === true" @click="isAllSelect(key,false)">
          <i class="iconfont">&#xe6da;</i>
        </span>
        <span class="select" v-else @click="isAllSelect(key,true)"></span>
        <span class="restaurant_picture">
          <img :src="list.restaurant_pic_url">
        </span>
        <span class="restaurant_name">{{list.restaurant_name}}</span>
      </section>
      <section v-for="(food,foodKey) in list" v-if="Number(foodKey)" class="main_wrap" :key="foodKey">
        <div class="foods">
          <span class="selected" v-if="selectFood[key][foodKey] === true" @click="noSelect(key,foodKey)"><i
            class="iconfont">&#xe6da;</i></span>
          <span class="select" v-else @click="select(key,foodKey)"></span>
          <div class="picture_wrap"><img :src="food.foods_pic"></div>
          <div class="info">
            <span class="name">{{food.name}}</span>
            <div>
              <span class="num">x{{food.num}}</span>
              <span class="price">￥{{food.price}}</span>
            </div>
          </div>
        </div>
      </section>
      <div class="bottom">
        <span class="submit" @click="submit(key)">去结算</span>
        <span class="total_price">￥{{selectFood[key]['totalPrice'].toFixed(2)}}</span>
      </div>
    </article>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['cartList'])
    },
    data() {
      return {
        totalPrice: 0,
        selectFood: {}
      }
    },
    methods: {
      noSelect(key, foodKey) {
        this.selectFood[key][foodKey] = false;
        this.selectFood[key]['allSelect'] = false;
        let cartFoodData = this.cartList[key][foodKey];  //购物车中 该商品信息
        this.selectFood[key]['totalPrice'] -= cartFoodData['num'] * cartFoodData['price'];
        this.selectFood = {...this.selectFood};   //拓展运算符使vue更新视图
      },
      select(key, foodKey) {
        this.selectFood[key][foodKey] = true;
        let cartFoodData = this.cartList[key][foodKey];  //购物车中 该商品信息
        this.selectFood[key]['totalPrice'] += cartFoodData['num'] * cartFoodData['price'];

        //判读是否全选
        let newObj = {...this.selectFood[key]};
        delete newObj.allSelect;
        let values = Object.values(newObj);
        let noAllSelect = values.some((el) => {
          if (el === false)
            return true;
        })
        this.selectFood[key]['allSelect'] = noAllSelect === true ? false : true;
        this.selectFood = {...this.selectFood};   //拓展运算符使vue更新视图
      },
      isAllSelect(key, boolean) {
        this.selectFood[key]['allSelect'] = boolean;
        Object.keys(this.selectFood[key]).forEach(el => {
          if (Number(el))
            this.selectFood[key][el] = boolean;
        })

        if (boolean) {
          console.log('this.cartList[key]', this.cartList[key])
          let restaurant = this.cartList[key];
          Object.keys(restaurant).forEach(el => {
            if (Number(el)) {
              this.selectFood[key]['totalPrice'] += restaurant[el]['num'] * restaurant[el]['price'];
            }
          });
        } else {
          this.selectFood[key]['totalPrice'] = 0;
        }
        console.log('this', this.selectFood)
        this.selectFood = {...this.selectFood};   //拓展运算符使vue更新视图
      },
      submit(restaurant_id) {
        let restaurant = this.selectFood[restaurant_id];    //选中食物的餐馆
        let foods = {
          totalPrice: 0,
          totalNum: 0
        };
        Object.keys(restaurant).forEach(el => {
          if (Number(el) && restaurant[el]) {
            let food = this.cartList[restaurant_id][el];
            foods[el] = food;
            foods['totalPrice'] += food.num * food.price;
            foods['totalNum'] += food.num;
          }
        })
        let data = {
          restaurant_id,
          foods
        };
        localStorage.setItem('comfirmOrderData', JSON.stringify(data));
        this.$router.push({path: '/confirmOrder'});
      }
    },
    created() {
      Object.keys(this.cartList).forEach(key => {  //初始化选中列表
        this.selectFood[key] = {
          allSelect: true,
          totalPrice: 0
        };
        let restaurant = this.cartList[key];
        Object.keys(restaurant).forEach(data => {
          if (Number(data)) {
            this.selectFood[key][data] = true;
            this.selectFood[key]['totalPrice'] += Number(restaurant[data]['price']) * Number(restaurant[data]['num']);
          }
        })
      });
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin";

  #cart {
    .title {
      padding: 0.3rem;
      @include px2rem(height, 65);
      .restaurant_name {
        font-size: 0.45rem;
        vertical-align: middle;
      }
      .restaurant_picture {
        display: inline-block;
        @include px2rem(width, 42);
        @include px2rem(height, 42);
        vertical-align: middle;
        margin: 0 0.1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .select, .selected {
      display: inline-block;
      @include px2rem(width, 35);
      border-radius: 50%;
    }
    .select {
      @include px2rem(height, 35);
      border: 1px solid #e9e8ea;
      vertical-align: middle;
    }
    .selected {
      text-align: center;
      background: $mtYellow;
      @include px2rem(line-height, 35);
      .iconfont {
        font-size: 0.5rem;
      }
    }
    .main_wrap {
      padding: 0.3rem 0 0.3rem 0.3rem;
      .foods {
        display: flex;
        align-items: center;
        margin: 0.2rem 0;
        .picture_wrap {
          @include px2rem(width, 160);
          @include px2rem(height, 155);
          margin-left: 0.2rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          flex: 1;
          background: #f7f7f7;
          padding-left: 0.3rem;
          @include px2rem(height, 150);
          .name {
            font-size: 0.42rem;
            font-weight: 600;
          }
          div {
            padding-top: 0.6rem;

            .num {
              font-size: 0.4rem;
            }
            .price {
              font-size: 0.5rem;
              float: right;
              font-weight: 600;
              padding-right: 0.2rem;
            }
          }
        }
      }
    }

    .bottom {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      padding-top: 0.5rem;
      border-top: 1px solid #e9e8ea;
      @include px2rem(height, 110);
      .total_price {
        flex: 1;
        text-align: right;
        @include px2rem(margin-right, 20);
        font-size: 0.5rem;
        color: #c75a5d;
      }
      .submit {
        margin-right: 0.1rem;
        text-align: center;
        font-size: 0.5rem;
        background: $mtYellow;
        display: inline-block;
        @include px2rem(width, 186);
        @include px2rem(line-height, 68);
      }
    }
  }
</style>
