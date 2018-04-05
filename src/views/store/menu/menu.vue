<template>
  <div id="menu">
    <!--skeleton-loading-->
    <div class="skeleton_loading" v-if="!getInfoReady">
      <img src="../../../assets/restaurant.jpg">
    </div>
    <div class="left" ref="left">
      <ul>
        <li v-for="(category,index) in foodsData" :key="category.id" @click="mappingScroll(index)"
            :class="{activity_menu: index == menuIndex}">
          {{category.name}}
        </li>
      </ul>
    </div>
    <div class="right" ref="right">
      <article>
        <section v-for="(category,index) in foodsData" :key="index">
          <h2>{{category.name}}</h2>
          <article>
            <section v-for="spus in category.spus">
              <div class="img_container">
                <img :src="spus.pic_url">
              </div>
              <div class="info">
                <div class="name">{{spus.name}}</div>
                <div class="sell-num">月售 {{spus.month_saled_content}}</div>
                <span class="price"> ￥{{spus.skus[0].price}}</span>
              </div>
              <Selector @showDot="showDotFun" :name="spus.name" :food_id="spus.skus[0].id"
                        :price="spus.skus[0].price" :pic="spus.pic_url"></Selector>
            </section>
          </article>
        </section>
      </article>
    </div>
    <transition appear
                @after-appear='afterEnter'
                @before-appear="beforeEnter" v-for="(ball,index) in balls" :key="index">
      <div class="balls" ref="balls" v-if="ball">
        <span class="ball"></span>
      </div>
    </transition>
    <Bottom v-if="getInfoReady"></Bottom>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {getRestaurant, getFoods} from '@/api/restaurant'
  import Bottom from './bottom'
  import Selector from '@/components/selector'

  export default {
    data() {
      return {
        categoryPosition: [],    //存放各个分类的categoryPosition 为了点击左侧让右侧对应滚动
        menuIndex: 0,   //左侧当前是第几个分类
        balls: [],      //加入购物车时的小球
        elRight: 0, //当前点击加按钮在网页中的绝对top值
        elBottom: 0, //当前点击加按钮在网页中的绝对left值
        fontSize: 0,      //用来获取当前1rem等于多少px 因为小球用transition运动 需要用到px 而左下角购物车的位置是rem为单位 需要转换成px 才能让小球找到落地点
        foodsData: [],       //食物数据
        getInfoReady:false
      }
    },
    methods: {
      mappingScrolli(pos) {   //右侧滚动时  判断当前左侧是第几个分类
        for (let i = 0; i < this.categoryPosition.length; i++) {
          if (this.categoryPosition[i] <= Math.ceil(Math.abs(pos.y)) && i === this.categoryPosition.length - 1 || this.categoryPosition[i + 1] > Math.ceil(Math.abs(pos.y))) {
            this.menuIndex = i;
            break;
          }
        }
      },
      mappingScroll(index) {    //点击左侧  右侧滚动到对应的位置
        this.rightScroll.off('scroll', this.mappingScrolli)
        this.rightScroll.scrollTo(0, -this.categoryPosition[index], 500);
        this.menuIndex = index;
        setTimeout(this.listenScroll, 500);
      },
      listenScroll() {  //监听滚动事件
        this.rightScroll.on('scroll', this.mappingScrolli)
      },
      showDotFun(elRight, elBottom) { //触发购物车小球
        this.balls.push(true)
        this.elRight = elRight;
        this.elBottom = elBottom;
      },
      beforeEnter(el) {
        let _this = this;
        this.fontSize = document.documentElement.style.fontSize.split("px")[0];
        el.style.transform = `translate3d(${this.elRight - this.fontSize * 1}px,${this.elBottom - this.fontSize * 1}px,0)`
        el.children[0].addEventListener('transitionend', function () {
          _this.balls.splice(0, 1);
          _this.$store.dispatch('ballInCart',true);
        })
      },
      afterEnter(el) {
        el.style.transform = `translate3d(${this.elRight - this.fontSize * 1}px,${window.innerHeight - 50}px,0)`
        el.children[0].style.transform = `translate3d(-${this.elRight - this.fontSize * 2}px,0px,0)`
        el.style.transition = 'transform .55s cubic-bezier(0.29,-0.25, 0.79,-0.14)';
        el.children[0].style.transition = 'transform .55s linear';
      }
    },
    created() {
      this.windowHeight = window.innerHeight;       //设备显示高度
      let restaurant_id = this.$route.query.id;
      //根据餐馆id获取食物
      getFoods({restaurant_id}).then((response) => {
        this.foodsData = response.data.data;
        this.getInfoReady = true;
        this.$nextTick(() => {       //初始化better-scroll
          this.leftScroll = new BScroll(this.$refs.left, {click: true});
          this.rightScroll = new BScroll(this.$refs.right, {click: true, probeType: 3,});
          let dom = (this.$refs.right.children)[0];   //确定各分类categoryPosition
          let listsArr = Array.from(dom.childNodes);
          listsArr.forEach((item, index) => {
            this.categoryPosition[index] = item.offsetTop;
          });
          this.listenScroll();    //监听滚动
        })
      })
    },
    components: {
      Bottom,
      Selector
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../style/mixin.scss";

  #menu {
    display: flex;
    flex: 1;
    padding-bottom: 1.368rem;
    .skeleton_loading{
      position:fixed;
      top:0;
      left:0;
      right:0;
      bottom:0;
      z-index: 999;
    }
    .left, .right {
      overflow: hidden;
    }
    /*菜单左侧列表样式*/
    .left {
      @include px2rem(width, 140);
      background: rgb(244, 244, 244);
      ul {
        li {
          display: flex;
          @include px2rem(height, 100);
          padding: 0 0.2rem;
          /*justify-content: center;*/
          align-items: center;
          font-size: 0.3rem;
          @include px2rem(line-height, 40);
          border-bottom: 1px dashed $mtGrey;
          &.activity_menu {
            background: #fff;
          }
        }
      }
    }
    /*右侧商品样式*/
    .right {
      position: relative;
      flex: 1;
      article {
        & > section {
          padding-top: 0.2rem;
          h2 {
            font-size: 0.4rem;
            font-weight: bold;
            margin: 0 0.2rem;
            padding-left: 0.2rem;
            border-left: 3px solid $mtYellow;
          }
          article {
            section {
              display: flex;
              position: relative;
              margin: 0 0.5rem;
              padding: 0.2rem 0;
              border-bottom: 1px solid $mtGrey;
              .img_container {
                @include px2rem(width, 122);
                @include px2rem(height, 126);
                margin-right: 0.2rem;
                img {
                  width: 100%;
                  height: 100%;
                }
              }

              .info {
                flex: 1;
                vertical-align: top;
                .name, .price {
                  font-weight: bold;
                }
                .name {
                  font-size: 0.3rem;
                }
                .sell-num {
                  font-size: 0.3rem;
                  margin: 0.2rem 0;
                }
                .price {
                  color: rgb(251, 79, 69);
                  font-size: 0.4rem;

                }
              }
            }
          }
        }
      }
    }
    .balls {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      .ball {
        display: inline-block;
        @include px2rem(width, 20);
        @include px2rem(height, 20);
        border-radius: 50%;
        background: $mtYellow;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to { /* .fade-leave-active in below version 2.1.8 */
    opacity: 0
  }
</style>
