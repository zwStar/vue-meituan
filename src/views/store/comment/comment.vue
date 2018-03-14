<template>
  <div id="comment">
    <!--评分大小部分-->
    <div class="comment_score_container">
      <div>
        <span class="comment_score">{{poi_info.wm_poi_score}}</span>
        <h3>商家评分</h3>
      </div>
      <div>
        <div>
          <span>口味</span>
          <Star :score="poi_info.food_score"></Star>
          <span class="food_score">{{poi_info.food_score}}</span>
        </div>
        <div>
          <span>包装</span>
          <Star :score="poi_info.pack_score"></Star>
          <span class="pack_score">{{poi_info.pack_score}}</span>
        </div>
      </div>
      <div>
        <span class="delivery_score">{{poi_info.delivery_score}}</span>
        <h3>配送评分</h3>
      </div>
    </div>

    <!--评分类型部分-->
    <ul class="comment_score_type_infos">
      <li class="active">全部</li>
      <li>有图</li>
      <li><i class="iconfont">&#xe741;</i> 点评(0.0分)</li>
    </ul>

    <ul class="comment_score_type_tip">
      <li v-for="tip in commentData.comment_score_type_infos" :key="tip.comment_score_title">{{tip.comment_score_title}} {{tip.total_count}}</li>
      <li v-for="tip in commentData.labels" :key="tip.label_id">{{tip.content}} {{tip.label_count}}</li>
    </ul>

    <!--评价部分-->
    <article class="comments_container">
      <section v-for="item in commentData">
        <div class="user_pic_url">
          <img :src="item.avatar">
        </div>
        <div class="comment_main_part">
          <div>
            <span class="user_name">{{item.user_name}}</span>
            <span class="comment_time">{{item.comment_time.slice(0,10)}}</span>
          </div>
          <div class="order_comment_score"><span>评分 <Star :score="item.food_score"></Star></span>
          </div>
          <p class="comment">{{item.commentData}}</p>
          <div class="comment_pics">
            <div v-for="pic in  item.pic_url" @click="show_big_pic_event(pic)">
              <img :src="pic">
            </div>
          </div>
          <!--<div class="praise_food_tip_container">
            <span class="give_prise"><i class="iconfont">&#xe607;</i></span>
            <span class="praise_food_tip" v-for="tip in food_tip_arr(list.praise_food_tip)"
                  v-if="food_tip_arr(list.praise_food_tip).length">{{tip}}</span>
          </div>-->
          <div class="poi_reply_contents_container" v-if="item.add_comment_list">
            <!--<p>{{item.add_comment_list[0].desc + item.add_comment_list[0].content}}</p>-->
          </div>
        </div>
      </section>
    </article>

    <!--图片大图-->
    <transition>
      <div class="show_big_pic" v-show="show_big_pic" @click="show_big_pic = false;">
        <div>
          <img :src="big_pic_url">
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {restaurantComment,getRestaurant} from '@/api/restaurant'
  export default {
    data() {
      return {
        commentData: [],
        comment_score_type: {0: '全部', 1: '好评', 5: '有图好评'},
        big_pic_url: '',   //大图url
        show_big_pic: false,  //显示大图
        poi_info:{}
      }
    },
    mounted() {
      let restaurant_id = this.$route.query.id;
      restaurantComment({restaurant_id}).then((response)=>{
        console.log('comment',response)
        this.commentData = response.data.data;
      })
      //根据商店id获取店家信息
      getRestaurant({restaurant_id}).then((response) => {
        console.log('res',response)
        this.poi_info = response.data.data;
      })
    },
    methods: {
      date_format(time_stamp) {    //因为后端数据是时间戳 这里需要进行格式化
        let date = new Date(time_stamp * 1000);
        return date.getFullYear() + '.' + date.getMonth() + '.' + date.getDay()
      },
      food_tip_arr(food_tip) {   //因为 后端food_tip是字符串 这里需要切割为数组
        let arr = []
        if (food_tip !== '')
          arr = food_tip.split(',')
        return arr;
      },
      show_big_pic_event(url) {     //显示大图
        this.big_pic_url = url;
        this.show_big_pic = true;
      },
      match_topic(string) {
        let re = /(#[^#]*#)(.+)/g
        let match = re.exec(string);
        console.log(match)
        console.log("match", match === null)
        return match == null ? string : `<strong style="color:#576b95; font-weight: normal">${match[1]}</strong>${match[2]}`
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../style/mixin.scss";

  #comment {
    flex: auto;
    background: grey;
    .comment_score_container {
      display: flex;
      align-items: center;
      padding: 0.35rem 0.3rem;
      background: #fff;
      margin: 0.2rem 0;
      & > div:first-child, & > div:last-child {
        text-align: center;
        span {
          font-size: 1.2rem;
        }
        .comment_score {
          color: #ffb000;
        }
        .delivery_score {
          color: #999;
        }
        h3 {
          font-size: 0.3rem;
          margin-top: 0.2rem;
        }

      }
      /*口味 和 包装 评分样式*/
      & > div:nth-child(2) {
        flex: 1;
        text-align: center;
        & > div:first-child {
          @include px2rem(margin-bottom, 30);
        }
        div {
          span:first-child {
            font-size: 0.4rem;
          }
          span:last-child {
            font-size: 0.5rem;
            color: #ffb000;
          }
        }
      }
    }

    .comment_score_type_infos {
      background: #fff;
      display: flex;
      padding: 0.4rem;
      li {
        flex: 1;
        color: #ffb000;
        display: inline-block;
        font-size: 0.3rem;
        border-radius: 2px;
        text-align: center;
        border: 1px solid #ffb000;
        @include px2rem(line-height, 70);
        &.active {
          background: $mtYellow;
          color: #000;
          font-weight: bold;
        }
      }
    }

    .comment_score_type_tip {
      background: #fff;
      padding: 0 0.4rem;
      li {
        display: inline-block;
        padding: 0 0.1rem;
        background: #f4f4f4;
        font-size: 0.3rem;
        @include px2rem(line-height, 55);
        margin: 0 0.1rem 0.1rem 0;
      }
    }

    .comments_container {
      background: #fff;
      section {
        display: flex;
        padding: 0.53rem 0.1rem 0.1rem;
        .user_pic_url {
          @include px2rem(width, 80);
          @include px2rem(height, 70);
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .comment_main_part {
          flex: 1;
          padding-left: 0.1rem;
          & > div:first-child {
            display: flex;
            justify-content: space-between;
            .user_name {
              font-size: 0.3rem;
              font-weight: 600;
            }
            .comment_time {
              font-size: 0.3rem;
            }

          }
          /*评分*/
          .order_comment_score {
            margin: 0.1rem 0;
            span {
              font-size: 0.3rem;
              color: #999;
            }
          }
          /*评语*/
          .comment {
            font-size: 0.35rem;
            @include px2rem(line-height, 40);
            color: #222;
            font-weight: 500;
          }
          .comment_pics {
            div {
              display: inline-block;
              @include px2rem(width, 120);
              @include px2rem(height, 120);
              margin: 0.1rem 0.2rem 0.1rem 0;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .praise_food_tip_container {
            .praise_food_tip {
              padding: 0 0.1rem;
              border: 1px solid $mtGrey;
              border-radius: 3px;
              margin: 0 0.1rem;
            }
            .give_prise {
              .iconfont {
                font-size: 0.3rem;
                font-weight: bold;
              }
            }
            .praise_food_tip {
              font-size: 0.3rem;
            }
          }
        }
      }
      .poi_reply_contents_container {
        margin: 0.28rem 0;
        padding: 0.1rem;
        background: #f8f8f8;
        p {
          font-size: 0.2rem;
          @include px2rem(line-height, 32);
          color: #999;
        }
      }
    }

    .show_big_pic {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #000;
      z-index: 999;
      div {
        width: 100%;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
