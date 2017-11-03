<template>
  <div id="menu">
    <div class="left" ref="left">
      <ul>
        <li v-for="food_spu_tag in food_spu_tags">
          {{food_spu_tag.name}}
        </li>
      </ul>
    </div>
    <div class="right" ref="right">
      <article>
        <section v-for="food_spu_tag in food_spu_tags" >
          <h2 >{{food_spu_tag.name}}</h2>
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
              <Selector></Selector>
            </li>
          </ul>
        </section>
      </article>
    </div>
  </div>
</template>

<script>
  import data from '@/api/goods.json'
  import BScroll from 'better-scroll'
  import Selector from './selector.vue'

  export default {
    components: {
      Selector
    },
    data() {
      return {
        food_spu_tags: []
      }
    },
    methods: {
    },
    mounted() {
      this.food_spu_tags = data.food_spu_tags;
      this.$nextTick(() => {
        this.leftScroll = new BScroll(this.$refs.left, {});
        this.rightScroll = new BScroll(this.$refs.right, {});
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
        }
      }
    }
    .right {
      flex: 1;
      article {
        section {

          h2 {
            font-size: 1.3rem;
            font-weight: bold;
            margin: 1rem;
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
  }
</style>
