<template>
  <div id="cart">
    <v-head title_head="购物车" goBack="true" bgColor="#f4f4f4">
      <span slot="edit_cart" :style="editStyle" @click="edit();" v-if="!editStatus">编辑</span>
      <span slot="cancel_edit_cart" :style="editStyle" @click="cancelEdit()" v-else>取消</span>
    </v-head>

    <article v-for="(list,key) in cartList" :key="key">
      <section class="title">
          <span class="delete_selected selected" v-if="editStatus && deleteSelectFood[key]['allSelect'] === true" @click="isAllSelectDelete(key,false)">
          <i class="iconfont">&#xe6da;</i>
        </span>
        <span class="select" v-else-if="editStatus" @click="isAllSelectDelete(key,true)"></span>

        <span class="selected" v-if="!editStatus && selectFood[key]['allSelect'] === true" @click="isAllSelect(key,false)">
          <i class="iconfont">&#xe6da;</i>
        </span>
        <span class="select" v-else-if="!editStatus" @click="isAllSelect(key,true)"></span>
        <span class="restaurant_picture">
          <img :src="list.restaurant_pic_url">
        </span>
        <span class="restaurant_name">{{list.restaurant_name}}</span>
      </section>
      <section v-for="(food,foodKey) in list" v-if="Number(foodKey)" class="main_wrap" :key="foodKey">
        <div class="foods">
           <span class="selected delete_selected" v-if="editStatus && deleteSelectFood[key][foodKey] === true"
                 @click="noSelectDelete(key,foodKey)"><i
             class="iconfont">&#xe6da;</i></span>
          <span class="select delete_select" v-else-if="editStatus" @click="selectDelete(key,foodKey)"></span>
          <span class="selected" v-if="!editStatus && selectFood[key][foodKey] === true" @click="noSelect(key,foodKey)"><i
            class="iconfont">&#xe6da;</i></span>
          <span class="select" v-else-if="!editStatus" @click="select(key,foodKey)"></span>
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

    <footer class="btn_delete" v-show="editStatus" @click="deleteCart()">
      <span class="delete_text">删除</span>
    </footer>
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
        selectFood: {},
        deleteSelectFood: {},
        editStatus: false,
        editStyle: 'position:absolute; right:15px;top:2px;font-size: 0.4rem; font-weight: 600;',
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
      noSelectDelete(key, foodKey) {
        this.deleteSelectFood[key][foodKey] = false;
        this.deleteSelectFood[key]['allSelect'] = false;
        this.deleteSelectFood = {...this.deleteSelectFood};   //拓展运算符使vue更新视图
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
      selectDelete(key, foodKey) {
        this.deleteSelectFood[key][foodKey] = true;
        //判读是否全选
        let newObj = {...this.deleteSelectFood[key]};
        delete newObj.allSelect;
        let values = Object.values(newObj);
        let noAllSelect = values.some((el) => {
          if (el === false)
            return true;
        })
        this.deleteSelectFood[key]['allSelect'] = noAllSelect === true ? false : true;
        this.deleteSelectFood = {...this.deleteSelectFood};   //拓展运算符使vue更新视图
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
        this.selectFood = {...this.selectFood};   //拓展运算符使vue更新视图
      },
      isAllSelectDelete(key,boolean){
        this.deleteSelectFood[key]['allSelect'] = boolean;
        Object.keys(this.deleteSelectFood[key]).forEach(el => {
          if (Number(el))
            this.deleteSelectFood[key][el] = boolean;
        })
        this.deleteSelectFood = {...this.deleteSelectFood};   //拓展运算符使vue更新视图
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
      },
      edit() {
        this.editStatus = true;
      },
      cancelEdit() {
        this.editStatus = false;
      },
      deleteCart() {       //删除购物车
        console.log(this.deleteSelectFood);
        Object.keys(this.deleteSelectFood).forEach((restaurant_id) => {
          let restaurant = this.deleteSelectFood[restaurant_id];
          Object.keys(restaurant).forEach(food_id => {
            if (Number(food_id) && restaurant[food_id]) {
              this.$store.dispatch('deleteFood', {restaurant_id, food_id})
            }
            delete restaurant[food_id];
          })
        })
      }
    },
    created() {
//      this.$store.dispatch('emptyCart', {restaurant_id: 22});
      Object.keys(this.cartList).forEach(key => {  //初始化选中列表
        console.log('cartList', this.cartList)
        this.selectFood[key] = {
          allSelect: true,
          totalPrice: 0
        };
        this.deleteSelectFood[key] = {
          allSelect: false
        }
        let restaurant = this.cartList[key];
        Object.keys(restaurant).forEach(data => {
          if (Number(data)) {
            this.deleteSelectFood[key][data] = false;
            this.selectFood[key][data] = true;
            this.selectFood[key]['totalPrice'] += Number(restaurant[data]['price']) * Number(restaurant[data]['num']);
          }
        })
        console.log()
      });
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin";

  #cart {
    .title {
      padding: 0.2rem;
      .restaurant_name {
        font-size: 0.4rem;
        vertical-align: middle;
      }
      .restaurant_picture {
        display: inline-block;
        @include px2rem(width, 42);
        @include px2rem(height, 42);
        vertical-align: middle;
        margin: 0 0.05rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .select, .selected {
      display: inline-block;
      @include px2rem(width, 40);
      @include px2rem(height, 40);
      border-radius: 50%;
    }
    .select {
      @include px2rem(height, 30);
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
    .delete_selected {
      background: #ff4b37;
    }
    .main_wrap {
      padding: 0.05rem 0 0.05rem 0.3rem;
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
            font-size: 0.4rem;
            font-weight: 600;
          }
          div {
            padding-top: 0.6rem;
            .num {
              font-size: 0.4rem;
            }
            .price {
              font-size: 0.4rem;
              float: right;
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
      padding: 0.5rem 0;
      border-top: 1px solid #e9e8ea;
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

    .btn_delete {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      @include px2rem(line-height, 68);
      background: #333;
      .delete_text {
        color: #fff;
        font-size: 0.4rem;
      }
    }
  }
</style>
