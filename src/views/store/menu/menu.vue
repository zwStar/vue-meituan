<template>
  <div id="menu">
    <div class="left" ref="left">
      <ul>
        <li v-for="(food_spu_tag,index) in food_spu_tags" :key="index" @click="mappingScroll(index)" :class="{activity_menu: index == menuIndex}">
          {{food_spu_tag.name}}
        </li>
      </ul>
    </div>
    <div class="right" ref="right">
      <article>
        <section v-for="(food_spu_tag,index) in food_spu_tags" :key="index">
          <h2>{{food_spu_tag.name}}</h2>
          <ul>
            <li v-for="sups in food_spu_tag.spus">
              <div class="img-wrap">
                <img :src="sups.picture">
              </div>
              <div class="info">
                <span class="name">{{sups.name}}</span>
                <span class="sell-num">{{sups.month_saled_content}} {{sups.praise_content}}</span>
                <span class="price">￥{{sups.praise_num}}</span>
              </div>
              <Selector :sups="sups" @showDot="showDotFun"></Selector>
            </li>
          </ul>
        </section>
      </article>
    </div>

    <div class="balls">
          <transition v-for="ball in balls" v-show="ball" appear  @after-appear = 'afterEnter' @before-appear="beforeEnter">
            <span class="ball"></span>
          </transition>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Selector from './selector.vue'
  import {getRestaurant} from '@/api/getData'

  export default {
    components: {
      Selector
    },
    data() {
      return {
        food_spu_tags: [],
        topPosition:[],
        menuIndex:0,
        balls:[],
        elLeft: 0, //当前点击加按钮在网页中的绝对top值
        elBottom: 0, //当前点击加按钮在网页中的绝对left值
      }
    },
    methods: {
      mappingScroll(index){
        //判断当前是左侧index  右侧滚动到对应的位置
        this.rightScroll.scrollTo(0, -this.topPosition[index], 500);
        this.menuIndex = index;
      },
      listenScroll(){
        this.rightScroll.on('scroll',(pos)=>{
          this.topPosition.forEach((item,index)=>{
            if(item <= Math.abs(pos.y) && this.topPosition[index+1]>=Math.abs(pos.y) && this.menuIndex !== index){
              this.menuIndex = index;
            }
          })
        })
      },
      showDotFun(balls,elLeft,elBottom){
        this.balls.push(true)
        this.elLeft = elLeft;
        this.elBottom = elBottom;
      },
      beforeEnter(el){
        console.log(el)
        console.log(this.elLeft)
        console.log(this.elBottom)

        el.style.transform = `translate3d(${this.elLeft }px,${this.elBottom }px,0)`;
//        el.style.transform =
//        el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`;
//        el.children[0].style.opacity = 0;
      },
      afterEnter(el){
        el.style.transform = `translate3d(20px,630px,0)`;
//        el.children[0].style.transform = `translate3d(0,0,0)`;
        el.style.transition = 'transform 3.55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
//        el.children[0].style.transition = 'transform .55s linear';
        this.balls = this.balls.map(item => false);
//        el.children[0].style.opacity = 1;
//        el.children[0].addEventListener('transitionend', () => {
//          this.listenInCart();
//        })
//        el.children[0].addEventListener('webkitAnimationEnd', () => {
//          this.listenInCart();
//        })
      }
    },
    mounted() {
      this.windowHeight = window.innerHeight;
      let restaurant_id = localStorage.getItem('restaurant_id');
      getRestaurant(restaurant_id).then((result) => {
        console.log(result)
        this.food_spu_tags = result.data.data.food_spu_tags;
        this.$nextTick(() => {
          this.leftScroll = new BScroll(this.$refs.left, {click:true});
          this.rightScroll = new BScroll(this.$refs.right, {click:true,probeType: 3,});
          let dom = (this.$refs.right.children)[0];
//          console.log(dom.childNodes[1].offsetTop);
          let listsArr =  Array.from(dom.childNodes);
          listsArr.forEach((item,index)=>{
            this.topPosition[index] = item.offsetTop;
          });
          this.listenScroll();
        })
      })
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../style/mixin.scss";

  #menu {
    display: flex;
    .left, .right {
      height: calc(100vh - 19rem);
      overflow: hidden;
    }
    .left {
      width: 7rem;
      background: rgb(244, 244, 244);
      ul {
        li {
          display: flex;
          height: 5.24rem;
          padding: 0 1rem;
          justify-content: center;
          align-items: center;
          font-size: 1.2rem;
          border-bottom: 1px dashed $mtGrey;
          &.activity_menu{
            background: #fff;
          }
        }
      }
    }
    .right {
      flex: 1;
      article {
        section {
          padding-top:1rem;
          h2 {
            font-size: 1.3rem;
            font-weight: bold;
            margin: 0 1rem;
            padding-left: 0.5rem;
            border-left: 3px solid $mtYellow;
          }
          ul {
            li {
              margin: 0 1.5rem;
              padding: 1rem 0;
              border-bottom: 1px solid $mtGrey;
              display: flex;
              .img-wrap {
                width: 6rem;
                height: 6rem;
                /*display: inline-block;*/
                margin-right: 1rem;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .info {
                flex: 1;
                /*display: inline-block;*/
                vertical-align: top;
                .name, .sell-num, .price {
                  display: block;
                }
                .name, .price {
                  font-weight: bold;
                }
                .name {
                  font-size: 1.3rem;
                }
                .sell-num {
                  margin: 0.3rem 0;
                }
                .price {
                  color: rgb(251, 79, 69);
                  font-size: 1.8rem;

                }
              }
            }
          }
        }
      }
    }
    .balls{
      position:absolute;
      top:0;
      left:0;
      z-index: 999;
      .ball{
        display: inline-block;
        width:1rem;
        height:1rem;
        border-radius: 50%;
        background: #C40000;
      }
    }
  }
</style>
