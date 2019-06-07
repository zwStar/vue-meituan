<template>
  <div id="cart">
    <v-head title="购物车" goBack="true" bgColor="#f4f4f4">
      <span slot="edit-cart" class="edit" @click="editStatus = true;" v-if="!editStatus">编辑</span>
      <span slot="cancel-edit-cart" class="edit" @click="editStatus = false;" v-else>取消</span>
    </v-head>

    <div class="empty-cart" v-if="emptyCart">
      <div class="info-container">
        <img src="../../assets/nothing.png">
        <span class="text">购物车空空如也，快去逛逛吧</span>
        <router-link class="redirect-index" to="/index"><span>去逛逛</span></router-link>
      </div>
    </div>

    <article v-for="(item,restaurant_id) in cartList" :key="restaurant_id">
      <section class="title">
        <span
          class="delete-selected selected"
          v-if="editStatus && deleteSelectFood[restaurant_id]['allSelect'] === true"
          @click="allSelectDelete(restaurant_id,false)">
            <i class="iconfont">&#xe6da;</i>
        </span>
        <span
          class="select"
          v-else-if="editStatus"
          @click="allSelectDelete(restaurant_id,true)">
        </span>
        <span
          class="selected"
          v-if="!editStatus && selectFood[restaurant_id]['allSelect'] === true"
          @click="allSelect(restaurant_id,false)">
          <i class="iconfont">&#xe6da;</i>
        </span>
        <span
          class="select"
          v-else-if="!editStatus"
          @click="allSelect(restaurant_id,true)">
        </span>
        <span class="restaurant-picture">
          <img :src="item.pic_url">
        </span>
        <span class="restaurant-name">{{item.restaurant_name}}</span>
      </section>
      <section
        v-for="(food,foodKey) in item"
        v-if="Number(foodKey)"
        class="main-container"
        :key="foodKey">
        <div class="foods">
           <span class="selected delete-selected"
                 v-if="editStatus && deleteSelectFood[restaurant_id][foodKey] === true"
                 @click="cancelSelectDelete(restaurant_id,foodKey)">
             <i class="iconfont">&#xe6da;</i>
           </span>
          <span class="select delete-select"
                v-else-if="editStatus"
                @click="selectDelete(restaurant_id,foodKey)">
          </span>
          <span
            class="selected"
            v-if="!editStatus && selectFood[restaurant_id][foodKey] === true"
            @click="cancelSelect(restaurant_id,foodKey)">
            <i class="iconfont">&#xe6da;</i>
          </span>
          <span
            class="select"
            v-else-if="!editStatus"
            @click="select(restaurant_id,foodKey)">
          </span>
          <div class="picture-container">
            <img :src="food.foods_pic">
          </div>
          <div class="info">
            <span class="name">{{food.name}}</span>
            <div>
              <span class="num">x{{food.num}}</span>
              <span class="price">￥{{food.price}}</span>
            </div>
          </div>
        </div>
      </section>
      <div class="bottom" v-show="!editStatus">
        <span class="submit"
              @click="submit(restaurant_id)"
              :class="{active:!selectFood[restaurant_id]['totalPrice']}">去结算
        </span>
        <span class="total-price">￥{{selectFood[restaurant_id]['totalPrice'].toFixed(2)}}</span>
      </div>
    </article>

    <footer class="btn-delete" v-show="editStatus" @click="deleteCart()">
      <span>删除</span>
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
        selectFood: {},   //选中列表
        deleteSelectFood: {},   //选中删除列表
        editStatus: false,      //编辑状态
        emptyCart: true          //购物车为空
      }
    },
    methods: {
      cancelSelect(restaurant_id, foodKey) {    //取消选中商品
        this.selectFood[restaurant_id][foodKey] = false;    //该商品取消选中
        this.selectFood[restaurant_id]['allSelect'] = false;    //全选标志为false
        let cartFoodData = this.cartList[restaurant_id][foodKey];  //购物车中 该商品信息
        this.selectFood[restaurant_id]['totalPrice'] -= cartFoodData['num'] * cartFoodData['price'];  //修改价格
        this.selectFood = {...this.selectFood};   //拓展运算符使vue更新视图
      },
      cancelSelectDelete(restaurant_id, foodKey) {  //取消删除选中
        this.deleteSelectFood[restaurant_id][foodKey] = false;      //该商品删除选中为false
        this.deleteSelectFood[restaurant_id]['allSelect'] = false;    //全选标志为false
        this.deleteSelectFood = {...this.deleteSelectFood};   //拓展运算符使vue更新视图
      },
      select(restaurant_id, foodKey) {      //选中商品
        this.selectFood[restaurant_id][foodKey] = true;   //该商品选中置true
        let cartFoodData = this.cartList[restaurant_id][foodKey];  //购物车中 该商品信息
        this.selectFood[restaurant_id]['totalPrice'] += cartFoodData['num'] * cartFoodData['price'];  //修改价格

        //判读是否全选
        let newObj = {...this.selectFood[restaurant_id]};
        let allSelect = this.isAllSelect(newObj, restaurant_id);
        this.selectFood[restaurant_id]['allSelect'] = allSelect;
        this.selectFood = {...this.selectFood};   //拓展运算符使vue更新视图
      },
      selectDelete(restaurant_id, foodKey) {  //选中删除商品
        this.deleteSelectFood[restaurant_id][foodKey] = true; //该商品选中置为true
        //判读是否全选
        let newObj = {...this.deleteSelectFood[restaurant_id]};
        let allSelect = this.isAllSelect(newObj, restaurant_id);
        this.deleteSelectFood[restaurant_id]['allSelect'] = allSelect;
        this.deleteSelectFood = {...this.deleteSelectFood};   //拓展运算符使vue更新视图
      },
      isAllSelect(newObj) {      //判断商品是否全选中了 如果全选中那么商家头像左边的按钮对应选中
        delete newObj.allSelect;
        let values = Object.values(newObj);
        let noAllSelect = values.some((el) => {
          if (el === false)
            return true;
        });
        return !noAllSelect;
      },
      allSelect(restaurant_id, boolean) {     //全选
        this.selectFood[restaurant_id]['allSelect'] = boolean;  //全选标志
        Object.keys(this.selectFood[restaurant_id]).forEach(el => { //每个商品都选中
          if (Number(el))
            this.selectFood[restaurant_id][el] = boolean;
        })

        if (boolean) {    //如果是选中 计算价格
          let restaurant = this.cartList[restaurant_id];
          Object.keys(restaurant).forEach(el => {
            if (Number(el)) {
              this.selectFood[restaurant_id]['totalPrice'] += restaurant[el]['num'] * restaurant[el]['price'];
            }
          });
        } else {    //取消全选
          this.selectFood[restaurant_id]['totalPrice'] = 0;
        }
        this.selectFood = {...this.selectFood};   //拓展运算符使vue更新视图
      },
      allSelectDelete(restaurant_id, boolean) {   //删除状态下的全选
        this.deleteSelectFood[restaurant_id]['allSelect'] = boolean;
        Object.keys(this.deleteSelectFood[restaurant_id]).forEach(el => {
          if (Number(el))
            this.deleteSelectFood[restaurant_id][el] = boolean;
        })
        this.deleteSelectFood = {...this.deleteSelectFood};   //拓展运算符使vue更新视图
      },
      submit(restaurant_id) { //提交订单
        if (!this.selectFood[restaurant_id].totalPrice)   //如果没有选中食物 不能提交订单
          return;
        let restaurant = this.selectFood[restaurant_id];    //选中食物的餐馆
        let foods = {
          totalPrice: 0,
          totalNum: 0
        };
        Object.keys(restaurant).forEach(el => {   //计算价格
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
        localStorage.setItem('confirmOrderData', JSON.stringify(data));
        this.$router.push({path: '/confirm_order'});
      },
      deleteCart() {       //删除购物车
        Object.keys(this.deleteSelectFood).forEach((restaurant_id) => {
          let restaurant = this.deleteSelectFood[restaurant_id];  //商店
          Object.keys(restaurant).forEach(food_id => {    //要删除的商品
            if (Number(food_id) && restaurant[food_id]) {   //删除购物车数据
              this.$store.dispatch('deleteFood', {restaurant_id, food_id})
              delete this.selectFood[restaurant_id][food_id];
            }
            this.allSelect(restaurant_id, false);      //重置选中列表为false
            delete restaurant[food_id];
          })
        })
        this.editStatus = false;
        this.emptyCart = !Object.keys(this.cartList).length;
      }
    },
    created() {
      this.emptyCart = !Object.keys(this.cartList).length
      Object.keys(this.cartList).forEach(restaurant_id => {  //初始化选中列表
        this.selectFood[restaurant_id] = {
          allSelect: true,
          totalPrice: 0
        };
        this.deleteSelectFood[restaurant_id] = {
          allSelect: false
        }
        let restaurant = this.cartList[restaurant_id];
        Object.keys(restaurant).forEach(data => {
          if (Number(data)) {
            this.deleteSelectFood[restaurant_id][data] = false;
            this.selectFood[restaurant_id][data] = true;
            this.selectFood[restaurant_id]['totalPrice'] += Number(restaurant[data]['price']) * Number(restaurant[data]['num']);
          }
        })
      });
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin";

  #cart {
    .info-container {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 3rem;
        height: 3rem;
      }
      .text {
        display: block;
        font-size: 0.35rem;
      }
      .redirect-index {
        display: flex;
        width: 3rem;
        height: 1rem;
        margin: 0.3rem auto;
        justify-content: center;
        align-items: center;
        background: $mtYellow;
        span {
          font-size: 0.3rem;
        }
      }
    }
    .edit {
      position: absolute;
      right: 15px;
      top: 2px;
      font-size: 0.4rem;
      font-weight: 600;
    }
    .title {
      padding: 0.2rem;
      display: flex;
      align-items: center;
      .restaurant-name {
        font-size: 0.4rem;
        vertical-align: middle;
      }
      .restaurant-picture {
        display: inline-block;
        margin: 0 0.2rem;
        img {
          @include px2rem(width, 42);
          @include px2rem(height, 42);
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
      border: 1px solid #e9e8ea;
      vertical-align: middle;
    }
    .selected {
      text-align: center;
      background: $mtYellow;
      @include px2rem(line-height, 35);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      .iconfont {
        font-size: 0.5rem;
      }
    }
    .delete-selected {
      background: #ff4b37;
    }
    .main-container {
      padding: 0.05rem 0 0.05rem 0.3rem;
      .foods {
        display: flex;
        align-items: center;
        margin: 0.2rem 0;
        .picture-container {
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
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #f7f7f7;
          padding: 0.1rem 0 0.1rem 0.3rem;
          @include px2rem(height, 150);
          .name {
            font-size: 0.4rem;
            font-weight: 600;
          }
          div {
            display: flex;
            justify-content: space-between;
            @include px2rem(padding-top, 50);
            .num {
              font-size: 0.4rem;
            }
            .price {
              font-size: 0.4rem;
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
      .total-price {
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
        &.active {
          background: $mtGrey;
        }
      }
    }

    .btn-delete {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      @include px2rem(line-height, 68);
      background: #c54144;
      span {
        color: #fff;
        font-size: 0.4rem;
      }
    }
  }


</style>
