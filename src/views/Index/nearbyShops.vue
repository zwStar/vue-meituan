<template>
  <div class="nearbyShops">
    <nav ref="nav">
      <ul>
        <li @click="scrollTo()">综合排序 <i class="iconfont icon-sort">&#xe601;</i></li>
        <li>销量最高</li>
        <li>距离最近</li>
        <li>筛选</li>
      </ul>
      <!--选择排序-->
      <transition name="fade">
        <Sort v-show="showSort"></Sort>
      </transition>
    </nav>
    <!--商家列表-->
    <article>
      <router-link v-for="(list,index) in shopLists" :to="{path:'store',query:{id:list.id}}" :key="list.id"
                   tag="section">
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

    <!--加载更多-->
    <div class="loading_wrap" ref="loading">
      <span class="loading" v-show="loading && !noMore">正在努力加载中…</span>
      <span class="no_more" v-show="noMore">已经到底了</span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Sort from './sort.vue'
  import {getRestaurants} from '@/api/restaurant'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        shopLists: [],      //商家列表
        showSort: false,  //显示选择排序列表
        BScrollEvent: null,   //better-scroll实例
        loading: false,  //加载更多
        page: 1,                    //当前餐馆列表加载到第几页
        limit: 5,    //每次拉去的餐馆数量
        lat: '',
        lng: '',
        noMore: false
      }
    },
    computed: {
      ...mapGetters(['locationReady', 'address'])
    },
    props: ['scrollWrapper', 'ready'], //进行better-scroll的DOM对象 餐馆类型 是否地位好准备开始拉去餐馆数据
    methods: {
      closeSelectSort() { //关闭选择排序列表
        this.showSort = false;
      },
      scrollTo() {  //点击排序  nav元素滚动到页面的顶部
        //获取元素离顶部的距离 并滚动到顶部
        let _this = this;
        let offsetTop = _this.$refs['nav'].offsetTop;
        let BScroll = _this.BScrollEvent;
        if (Math.abs(BScroll.y) !== offsetTop) {
          _this.BScrollEvent.scrollTo(0, -offsetTop, 500);
          setTimeout(function () {
            _this.showSort = true
          }, 500)
        } else {
          this.showSort = true   //如果当前位置是顶部 不需要滚动
        }
      },
      //监听better-scroll滚动事件  判断是否滑动到底部 加载更多
      listenScroll() {
        let _this = this;
        _this.BScrollEvent.on('scroll', function (obj) {
          //如果到达底部  请求加载更多数据
          if (Math.abs(obj.y) + _this.scrollWrapper.clientHeight >= _this.scrollWrapper.childNodes[0].clientHeight - 30) {
            if (!_this.loading) {   //避免加载过程中 重复请求
              _this.loading = true;
              //请求加载更多
              _this.getRestaurants(_this.page, _this.limit, function (data) {
                _this.page++;
                data.forEach((el) => {
                  _this.shopLists.push(el);
                });
                //DOM重新渲染完毕后 重新计算better-scroll
                _this.$nextTick(() => {
                  _this.loading = false;
                  _this.BScrollEvent.refresh();
                })
              })
            }
          }
        })
      },
      getRestaurants(page, limit, callback) {
        let offset = (page - 1) * limit;
        let lat = this.address.lat;
        let lng = this.address.lng;
        getRestaurants({offset, limit, lng, lat}).then((response) => {
          let data = response.data.data;
          if (!data.length) {
            this.noMore = true;
          } else {
            callback(data);
          }
        });
      },
      firstFetch() {
        let _this = this;
        //获取餐馆列表
        this.page = 1;
        this.getRestaurants(this.page, this.limit, function (data) {
          _this.shopLists = data;
          _this.$nextTick(() => {
            //dom渲染完成 初始化better-scroll
            _this.BScrollEvent = new BScroll(_this.scrollWrapper, {click: true, probeType: 2});
            //监听scroll事件
            _this.listenScroll();
          })
        })
      }
    },
    mounted() {
      if (this.$route.path === '/category') {
        if (this.address.lat && this.address.lng) {
          this.firstFetch();
        } else {
          this.$store.dispatch('location');
        }
      }
    },
    watch: {
      locationReady(boolean) {
        if (boolean) {
          this.firstFetch();
        }
      }
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
    margin: 0.1rem 0;
    /*选择排序功能样式*/
    nav {
      border-bottom: 1px solid $bottomLine;
      position: relative;
      @include px2rem(line-height, 80);
      ul {
        display: flex;
        li {
          font-size: 0.4rem;
          text-align: center;
          padding: 0 0.1rem;
          flex: 1;
          .icon-sort {
            display: inline-block;
            @include px2rem(width, 20);
            font-size: 0.3rem;
          }
        }
      }
    }
    article {
      position: relative;

      section {
        display: flex;
        padding: 0.3rem 0;
        margin: 0 0.2rem;
        border-bottom: 1px solid $mtGrey;
        .imgShow {
          @include px2rem(width, 170);
          @include px2rem(height, 130);
          margin-right: 0.2rem;
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
            font-size: 0.45rem;
            font-weight: bold;
          }
          .shopsMessage {
            display: flex;
            margin-top: 0.3rem;
            align-items: center;
            span {
              display: inline-block;
              vertical-align: bottom;
              font-size: 0.3rem;
            }
            .sellNum {
              flex: 1;
            }
            .delivery-info {
              display: flex;
              align-items: center;
            }
          }
          .priceMessage {
            span {
              font-size: 0.2rem;
            }
          }

          .activeMeaage {
            ul {
              li {
                .info {
                  font-size: 0.3rem;
                  display: inline-block;
                  @include px2rem(width, 260);
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .icon {
                  display: inline-block;
                  vertical-align: top;
                  @include px2rem(width, 34);
                  @include px2rem(height, 34);
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                .icon-entry {
                  font-size: 0.3rem;
                  float: right;
                  margin-right: 0.2rem;
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

    /*loading部分*/
    .loading_wrap {
      @include loading;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave {
    opacity: 0
  }
</style>
