<template>
  <div class="nearbyShops">
    <div class="head">
      <span class="line"></span>
      <h2>附近商家</h2>
      <span class="line"></span>
    </div>
    <nav ref="nav">
      <ul>
        <li @click="scrollTo()">综合排序 <i class="iconfont icon-sort">&#xe601;</i></li>
        <li>销量最高</li>
        <li>距离最近</li>
        <li>筛选</li>
      </ul>
      <transition name="fade">
        <Sort v-show="showSort"></Sort>
      </transition>
    </nav>
    <article>
      <router-link v-for="(list,index) in foodLists" :to="{path:'store',query:{id:list.id}}" :key="index" tag="section">
        <div class="imgShow">
          <img :src="list.pic_url">
        </div>
        <div class="detail">
          <h4>{{list.name}}</h4>
          <div class="shopsMessage">
            <star :score="list.wm_poi_score"></star>
            <span class="sellNum">{{list.month_sales_tip}}</span>
            <div class="delivery-info">
              <span class="deliverTime">{{list.delivery_time_tip}}</span>
              <span class="distance">{{list.distance}}</span>
            </div>
          </div>
          <div class="priceMessage">
            <span>{{list.min_price_tip}} |</span>
            <span>{{list.shipping_fee_tip}} |</span>
            <span>{{list.average_price_tip}}</span>
          </div>
          <div class="activeMeaage">
            <ul>
              <li v-for="(discount,index) in list.discounts2" v-if="index <= 1">
                <span class="icon">
                  <img :src="discount.icon_url">
                </span>
                <span class="info">{{discount.info}}</span>
                <router-link to="/shops" v-if="index === 0">
                  <i class="iconfont icon-entry">&#xe645;</i>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </router-link>
      <div class="shade" v-show="showSort" @click="closeSelectSort()">
      </div>
    </article>
    <div class="loading" v-show="loading" ref="loading">
      加载中
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import data from '@/api/nearbyShops.json'
  import Sort from './sort.vue'
  import {getRestaurants} from '@/api/getData'

  export default {
    data() {
      return {
        foodLists: [],
        showSort: false,  //显示选择排序列表
        indexScroll: null,
        loading: false  //加载更多
      }
    },
    //props: ['indexScroll','scrollWrapper'],
    props: ['scrollWrapper'],
    methods: {
      closeSelectSort() { //关闭选择排序
        this.showSort = false;
      },
      scrollTo() {
        //获取元素离顶部的距离 并活动到顶部
        let offsetTop = this.$refs['nav'].offsetTop
        this.indexScroll.scrollTo(0, -offsetTop, 500);
        this.showSort = false;
      },
      initBetterScroll() {

      }
      /*scrollToTop(scrollPosition, scrollDuration) { //动画实现 滚动条滑动到指定位置
        let _this = this;
        const scrollHeight = scrollPosition - window.scrollY  //要滚动的高度
        let scrollStep = Math.PI / ( scrollDuration / 15 ) //每次滚动的步伐
        let cosParameter = scrollHeight / 2;
        let scrollCount = 0,
          scrollMargin,
          scrollInterval = setInterval(function () {
            if (window.scrollY <= scrollPosition) {
              scrollCount = scrollCount + 1;
              scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
              window.scrollTo(0, ( window.scrollY + scrollMargin ));
            }
            else {
              window.scrollTo(0, scrollPosition);
              clearInterval(scrollInterval);

            }
          }, 15);
      }*/
    },
    mounted() {
      getRestaurants().then((result) => {
        this.foodLists = result.data.data;
        this.$nextTick(() => {
          let _this = this;
          //dom渲染完成 初始化better-scroll
          _this.indexScroll = new BScroll(this.scrollWrapper, {click: true, probeType: 2});
          //监听scroll事件
          _this.indexScroll.on('scroll', function (obj) {
            //如果到达底部  请求加载更多数据
            if (Math.abs(obj.y) + _this.scrollWrapper.clientHeight >= _this.scrollWrapper.childNodes[0].clientHeight - 30) {

              if (!_this.loading) {   //避免加载过程中 重复请求
                _this.loading = true
                getRestaurants(1, 10).then((result) => {
                  _this.loading = false
                  let data = result.data.data;
//                  data.forEach((el)=>{
//                    _this.foodLists.push(el);
//                  })
                  for (let i = 0; i < data.length; i++) {
                    _this.foodLists.push(data[i]);
                  }
                  _this.$nextTick(() => {
                    _this.indexScroll.refresh();
                  })
                })
              }
            }
          })
        })
      })
    },
    components: {
      Sort
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";
  /*附近商家*/
  .nearbyShops {
    margin: 1rem 0;
    padding-bottom: 7rem;
    /*标题*/
    .head {
      text-align: center;
      padding-bottom: 1rem;
      border-bottom: 1px solid $bottomLine;
      .line {
        vertical-align: middle;
        display: inline-block;
        width: 2rem;
        height: 0;
        border-bottom: 1px solid #000;
      }
      h2 {
        display: inline-block;
        margin: 0 1rem;
      }
    }
    /*选择排序功能样式*/
    nav {
      border-bottom: 1px solid $bottomLine;
      position: relative;
      ul {
        display: flex;
        li {
          font-size: 1.3rem;
          text-align: center;
          padding: 1rem 0 1rem 0.3rem;
          flex: 1;
          .icon-sort {
            display: inline-block;
            width: 2rem;
            font-size: 1.3rem;
          }
        }
      }
    }
    article {
      position: relative;
      section {
        display: flex;
        padding: 1.5rem 0;
        margin: 0 0.5rem;
        border-bottom: 1px solid $mtGrey;
        .imgShow {
          width: 7.262rem;
          height: 5.46rem;
          margin-right: 1rem;
          border: 1px solid $mtGrey;
          text-align: center;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .detail {
          flex: 1;
          h4 {
            font-size: 1.5rem;
            font-weight: bold;
          }
          .priceMessage {
            margin: 0.5rem 0;
            span {
              font-size: 1.1rem;
              line-height: 2.6rem;
            }

          }
          .shopsMessage {
            margin: 0.5rem 0;

            span {
              display: inline-block;
              vertical-align: bottom;
              font-size: 1.1rem;
            }
            .sellNum {
              margin-left: 0.5rem;
            }
            .delivery-info {
              vertical-align: top;
              float: right;
            }
          }
          .activeMeaage {
            ul {
              li {
                margin-top: 0.5rem;
                .info {
                  display: inline-block;
                  width: 13rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .icon {
                  display: inline-block;
                  width: 1.4rem;
                  height: 1.4rem;
                  vertical-align: top;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                .icon-entry {
                  font-size: 1.3rem;
                  float: right;
                  margin-right: 0.8rem;
                }
              }
            }
          }
        }
      }
      .shade {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(47, 43, 43, 0.8);
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave {
    opacity: 0
  }
</style>
