<template>
  <div id="comment">
    <v-head title_head="评论" goBack="true" bgColor="#f4f4f4"></v-head>
    <div class="deliver_comment">
      <div class="deliver_info">
        <div class="avatar">
          <img src="http://img.go007.com/2016/05/21/c48d2b4e639e5255_1.jpg">
        </div>
        <div class="info_container">
          <span class="deliver_type">美团快送</span>
          <div class="deliver_time">
            <span>今天19：10左右送达</span>
            <a class="time_error" href="#">时间不准 <i class="iconfont">&#xe6d7;</i></a>
          </div>
        </div>
      </div>
      <Star @makeScore="setDeliveryScore"></Star>
    </div>

    <div class="main_container">
      <div class="restaurant_info">
        <span class="avatar">
          <img src="http://img.go007.com/2016/05/21/c48d2b4e639e5255_1.jpg">
        </span>
        <span class="restaurant_name">Ceechok至悼</span>
      </div>
      <Star @makeScore="setFoodScore"></Star>
      <div class="food_comment">
        <textarea class="comment_data" v-model="commentData" style="resize:none" placeholder="亲，菜品口味如何，对包装服务等还满意吗？"
                  @input="input($event);"></textarea>
        <span class="tip">至少输入8个字</span>
      </div>

      <div class="upload_picture_container">
        <div class="uplist_container" v-for="(item,index) in uploadList">
          <div class="pic">
            <img :src="item">
          </div>
          <div class="delete" @click="deletePic(index)">
            <i class="iconfont icon_delete">&#xe60d;</i>
          </div>
        </div>
        <label class="upload">
          <i class="iconfont upload_icon">&#xe782;</i>
          <input id="file" type="file" @change="fileUpload($event)" style="display: none;">
        </label>
        <div class="upload_description" v-show="!uploadList.length">
          <h3>上传图片</h3>
          <p>内容丰富的评论有机会成为优质评价哦</p>
        </div>
      </div>
    </div>

    <div class="hidden_name_comment">
      <span class="selector no_select" v-if="!hiddenName" @click="hiddenName = !hiddenName;"></span>
      <span class="selector select" v-else><i class="iconfont" @click="hiddenName = !hiddenName;">&#xe6da;</i></span>
      <h4>匿名评价</h4>
    </div>
    <div class="submit" :class="{active:satisfySubmit}" @click="submit()">
      <span>提交</span>
    </div>

    <Loading v-show="loading"></Loading>
    <alertTip :text="alertText" :showTip.sync="showTip"></alertTip>
  </div>
</template>

<script>
  import Star from './star.vue'
  import {makeComment, orderInfo} from '@/api/order'
  import {upload_token, upload} from '@/api/upload'
  import config from '@/config'

  export default {
    data() {
      return {
        deliveryScore: 0,
        foodScore: 0,
        hiddenName: false,
        commentValueLength: 0,
        satisfySubmit: false,
        commentData: '',
        uploadList: ["http://p3d0ne50u.bkt.clouddn.com/FhpqzjdxM_FKKyzXxI8QNpprxUsu"],
        loading: false,
        alertText: '',      //提示
        showTip: false
      }
    },
    methods: {
      setDeliveryScore(score) {
        this.deliveryScore = score;
      },
      setFoodScore(score) {
        this.foodScore = score;
      },
      input($event) {
        this.commentValueLength = $event.target.value.length;
        this.satisfySubmit = this.commentValueLength >= 8;
      },
      deletePic(index) {
        this.uploadList.splice(index, 1);
      },
      fileUpload(event) {
        if (this.uploadList.length >= 3) {      //最多上传3张图片
          this.alertText = '最多上传3张图片'
          this.showTip = true;
          return;
        }

        this.loading = true;
        let file = event.target.files[0];
        upload_token().then((response) => {   //获取上传凭证
          if (response.data.status === 1) {
            let data = {token: response.data.uptoken, file}
            upload(data).then((upResponse) => {     //上传到七牛云
              this.uploadList.push(config.domain + upResponse.data.key)
              this.loading = false;


            })
          } else {
            this.alertText = response.data.message
            this.showTip = true;
          }
        })
      },
      submit() {
        console.log('配送评分', this.deliveryScore)
        console.log('食物评分', this.foodScore)
        console.log('评论内容', this.commentData)
        makeComment({
          order_id: 1,
          commentData: this.commentData,
          foodScore: this.foodScore,
          deliveryScore: this.deliveryScore,
          pic_url: this.uploadList
        }).then((response) => {
          console.log('comment_result', response)
        })
      }
    },
    created() {
      let order_id = this.order_id = this.$route.query.order_id;
      orderInfo({order_id}).then((response) => {
        console.log('orderInfo response',response)
        let data = response.data;
      })
    },
    components: {
      Star
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";

  #comment {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: #f4f4f4;
    .avatar {
      display: inline-block;
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid $mtGrey;
      @include px2rem(width, 80);
      @include px2rem(height, 80);
      margin-right: 0.5rem;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .deliver_comment {
      background: #fff;
      .deliver_info {
        display: flex;
        padding: 0.5rem;

        .info_container {
          flex: 1;
          .deliver_type {
            font-size: 0.5rem;
            display: inline-block;
            margin-bottom: 0.2rem;
          }
          .deliver_time {
            font-size: 0.5rem;
            .time_error {
              float: right;
              font-size: 0.4rem;
              margin-top: 0.1rem;
              color: #508aca;
              .iconfont {
                border-radius: 50%;
                border: 1px solid #508aca;
              }
            }
          }
        }
      }
    }

    .main_container {
      background: #fff;
      margin-top: 0.5rem;
      padding: 0.2rem 0.5rem;
      .restaurant_info {
        display: flex;
        align-items: center;
        margin: 0.2rem 0;
        .restaurant_name {
          font-size: 0.5rem;
        }
      }

      .food_comment {
        position: relative;
        .comment_data {
          width: 100%;
          height: 100px;
          border: 1px solid $mtGrey;
        }
        .tip {
          color: $mtGrey;
          font-size: 0.4rem;
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
      }

      .upload_picture_container {
        display: flex;
        margin: 0.3rem 0;
        align-items: center;

        .uplist_container {
          position: relative;
          margin-right: 0.2rem;
          border: 1px solid $mtGrey;
          .pic {
            @include px2rem(width, 140);
            @include px2rem(height, 140);
            img {
              width: 100%;
              height: 100%;
            }
          }
          .delete {
            position: absolute;
            right: -10px;
            top: -10px;
            @include px2rem(width, 45);
            @include px2rem(height, 45);
            text-align: center;
            border-radius: 50%;
            background: rgb(255, 76, 69);
            display: flex;
            justify-content: center;
            align-items: center;
            .icon_delete {
              font-size: 0.35rem;
              color: #fff;
            }
          }
        }

        .upload {
          display: inline-block;
          margin-right: 0.2rem;
          text-align: center;
          border: 1px solid $mtGrey;
          @include px2rem(width, 140);
          @include px2rem(height, 140);
          .upload_icon {
            @include px2rem(line-height, 140);
            font-size: 1rem;
          }
        }
        .upload_description {
          font-size: 0.4rem;
          p {
            margin-top: 0.2rem;
            color: $mtGrey;
          }
        }
      }
    }

    .hidden_name_comment {
      margin: 0.4rem 0.5rem;
      .selector {
        border-radius: 50%;
        display: inline-block;
        @include px2rem(width, 35);
        @include px2rem(height, 35);

      }
      .no_select {
        border: 1px solid $mtGrey;

      }
      .select {
        text-align: center;
        @include px2rem(line-height, 35);
        color: #fff;
        background: $mtYellow;
      }
      h4 {
        display: inline-block;
        font-size: 0.4rem;
      }
    }

    .submit {
      margin-top: 0.3rem;
      background: #cbcbcb;
      @include px2rem(line-height, 95);
      text-align: center;
      &.active {
        background: $mtYellow;
      }
      span {
        color: #fff;
        font-size: 0.5rem;
      }
    }
  }
</style>
