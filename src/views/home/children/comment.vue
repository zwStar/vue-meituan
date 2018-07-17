<!--我的评论-->
<template>
  <div id="my-comment">
    <v-head goBack="true" title="我的评论"></v-head>

    <div class="empty-container" v-show="!commentList.length">
      <img src="../../../assets/nothing.png">
      <span class="text">没有任何评论哦</span>
    </div>


    <div class="userinfo" v-show="commentList.length">
      <div class="avatar">
        <img :src="userInfo.avatar">
      </div>
      <h3 class="username">{{userInfo.username}}</h3>
      <span class="comment-count">已贡献{{commentList.length}}条评论</span>
    </div>

    <article v-for="(item,index) in commentList" :key="item.id">
      <div class="title">
        <div class="restaurant-info">
          <span class="icon"><img :src="item.restaurant.pic_url"></span>
          <span class="name">{{item.restaurant.name}}</span>
        </div>
        <span class="right"><i class="iconfont">&#xe6d7;</i></span>
      </div>
      <div class="main-container">
        <div class="avatar">
          <img :src="userInfo.avatar">
        </div>
        <div class="info-container">
          <div class="top margin-2">
            <span class="username">{{userInfo.username}}</span>
            <span class="time">{{item.comment_time.slice(0, 10)}}</span>
          </div>
          <div class="seller-info margin-2">
            <span>商家:</span>
            <star :score="item.restaurant.wm_poi_score"></star>
            <span class="delivery">美团快送 51分钟送达</span>
          </div>
          <div class="score-container margin-2">
            <span>口味：{{item.food_score}}星</span>
            <span>配送：{{item.delivery_score}}星</span>
          </div>
          <p class="comment-content margin-2">{{item.comment_data}}</p>
          <div class="bottom margin-2">
            <span class="delete" @click="deleteComment(item.id,index)"><i class="iconfont">&#xe615;</i> 删除</span>
          </div>
        </div>
      </div>
    </article>
    <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
  </div>
</template>

<script>
  import {userInfo, comment, deleteComment} from '@/api/user'

  export default {
    data() {
      return {
        userInfo: {},        //用户信息
        commentList: [],    //评论列表
        alertText: '',
        showTip: false
      }
    },
    methods: {
      deleteComment(id, index) {
        deleteComment({id}).then((response) => {
          if (response.data.status === 200) {
            this.alertText = '删除成功';
            this.showTip = true;
            this.commentList.splice(index, 1)
          } else {
            this.alertText = '删除失败';
            this.showTip = true;
          }
        })
      }
    },
    created() {
      userInfo().then((response) => {
        let res = response.data;
        if (res.status === 200) {
          this.userInfo = res.data;
        }
      })
      comment().then((response) => {
        let res = response.data;
        if (res.status === 200) {
          this.commentList = res.data;
        }
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../style/mixin";

  #my-comment {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;

    .empty-container {
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
    }

    .userinfo {
      margin-top: 1rem;
      text-align: center;
      .avatar {
        img {
          @include px2rem(width, 150);
          @include px2rem(height, 150);
          border-radius: 50%;
        }
      }
      .username {
        font-size: 0.5rem;
      }
      .comment-count {
        font-size: 0.35rem;
      }
    }

    article {
      padding: 0.3rem;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem 0;
        border-bottom: 1px solid $mtGrey;
        .restaurant-info {
          font-size: 0.4rem;
          display: flex;
          align-items: center;
          .icon {
            margin-right: 0.3rem;
            img {
              @include px2rem(width, 45);
              @include px2rem(height, 45);
            }
          }
          .name {
            font-size: 0.45rem;
            color: #666;
          }
        }
      }
      .main-container {
        display: flex;
        .avatar {
          margin: 0.3rem 0.5rem 0 0;
          img {
            @include px2rem(width, 80);
            @include px2rem(height, 80);
            border-radius: 50%;
            border: 1px solid #333;
          }
        }
        .info-container {
          flex: 1;
          .top {
            display: flex;
            justify-content: space-between;
            .username {
              font-size: 0.5rem;
            }
            .time {
              font-size: 0.3rem;
            }
          }
          .margin-2 {
            margin: 0.2rem 0;
          }
        }
        .seller-info, .score-container {
          color: #999;
          font-size: 0.35rem;
        }
        .score-container {
          span {
            margin-right: 0.3rem;
          }
        }
        .seller-info .delivery {
          margin-left: 0.2rem;
        }
        .comment-content {
          font-size: 0.40rem;
        }
        .bottom {
          border-top: 1px solid $mtGrey;
          text-align: right;
          .delete {
            font-size: 0.45rem;
            .iconfont {
              display: inline-block;
              font-size: 0.5rem;
              margin-right: 0.15rem;
            }
          }
        }
      }
    }
  }
</style>
