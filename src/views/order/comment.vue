<!--对订单进行评论页面-->
<template>
  <div id="comment">
    <v-head title="评论" goBack="true" bgColor="#f4f4f4"></v-head>
    <div class="deliver-comment">
      <div class="deliver-info">
        <div class="avatar">
          <img src="http://img.go007.com/2016/05/21/c48d2b4e639e5255_1.jpg">
        </div>
        <div class="info-container">
          <span class="deliver-type">美团快送</span>
          <div class="deliver-time">
            <span>今天19：10左右送达</span>
            <span class="time-error">时间不准 <i class="iconfont">&#xe6d7;</i></span>
          </div>
        </div>
      </div>
      <star @makeScore="setDeliveryScore"></star>
    </div>

    <div class="main-container">
      <div class="restaurant-info">
        <span class="avatar">
          <img :src="restaurant_info.pic_url">
        </span>
        <span class="restaurant-name">{{restaurant_info.name}}</span>
      </div>
      <star @makeScore="setFoodScore"></star>
      <div class="food-comment">
        <textarea
          class="comment-data"
          v-model="commentData"
          style="resize:none"
          placeholder="亲，菜品口味如何，对包装服务等还满意吗？"
          @input="input($event);"></textarea>
        <span class="tip">至少输入2个字</span>
      </div>

      <div class="upload-picture-container">
        <div class="uplist-container" v-for="(item,index) in uploadList" :key="index">
          <div class="pic">
            <img :src="item">
          </div>
          <div class="delete" @click="deletePic(index)">
            <i class="iconfont icon-delete">&#xe60d;</i>
          </div>
        </div>
        <label class="upload">
          <i class="iconfont upload-icon">&#xe782;</i>
          <input id="file" type="file" @change="fileUpload($event)" style="display: none;">
        </label>
        <div class="upload-description" v-show="!uploadList.length">
          <h3>上传图片</h3>
          <p>内容丰富的评论有机会成为优质评价哦</p>
        </div>
      </div>
    </div>

    <div class="hidden-name-comment">
      <span class="selector no-select" v-if="!hiddenName" @click="hiddenName = !hiddenName;"></span>
      <span class="selector select" v-else>
        <i class="iconfont" @click="hiddenName = !hiddenName;">&#xe6da;</i>
      </span>
      <h4>匿名评价</h4>
    </div>
    <div class="submit" :class="{active:satisfySubmit}" @click="submit()">
      <span>提交</span>
    </div>
    <v-loading v-show="loading"></v-loading>
    <alert-tip :text="alertText" :showTip.sync="showTip"></alert-tip>
  </div>
</template>

<script>
  import star from './star.vue'
  import {makeComment, orderInfo} from '@/api/order'
  import {uploadToken, upload} from '@/api/upload'
  import config from '@/config'

  export default {
    data() {
      return {
        restaurant_info: {},  //商店信息
        deliveryScore: 1,   //配送评分
        foodScore: 1,       //食物评分
        hiddenName: false,
        commentValueLength: 0,
        satisfySubmit: false,
        commentData: '',
        uploadList: [],
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
        this.satisfySubmit = this.commentValueLength >= 2;
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
        uploadToken().then((response) => {   //获取上传凭证
          if (response.data.status === 200) {
            let data = {token: response.data.uptoken, file};
            upload(data).then((upResponse) => {     //上传到七牛云
              this.uploadList.push(config.domain + upResponse.data.key);
              this.loading = false;
            })
          } else {
            this.alertText = response.data.message;
            this.showTip = true;
          }
        })
      },
      submit() {
        if (!this.satisfySubmit)
          return;
        makeComment({
          hidden_name: this.hiddenName,
          order_id: this.order_id,
          comment_data: this.commentData,
          food_score: this.foodScore,
          delivery_score: this.deliveryScore,
          pic_url: this.uploadList
        }).then((response) => {
          let res = response.data;
          let _this = this;
          _this.alertText = res.message;
          _this.showTip = true;
          if (res.status === 200) {
            setTimeout(() => {
              _this.$router.push('/index')
            }, 1000);
          }
        })
      },
    },
    created() {
      let order_id = this.order_id = this.$route.query.order_id;
      if (!order_id) {
        this.alertText = '参数有误';
        this.showTip = true;
        setTimeout(() => {
          this.$router.push('/index');
        }, 1000);
        return;
      }
      orderInfo({order_id}).then((response) => {
        let res = response.data;
        if (res.status === 200) {
          this.restaurant_info = res.data.restaurant;
        } else {
          this.alertText = res.message;
          this.showTip = true;
          setTimeout(() => {
            this.$router.go(-1)
          }, 500)
        }
      })
    },
    components: {
      star
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";

  #comment {
    min-height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
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

    .deliver-comment {
      background: #fff;
      .deliver-info {
        display: flex;
        padding: 0.5rem;
        .info-container {
          flex: 1;
          .deliver-type {
            font-size: 0.5rem;
            display: inline-block;
            margin-bottom: 0.2rem;
          }
          .deliver-time {
            font-size: 0.5rem;
            .time-error {
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

    .main-container {
      background: #fff;
      margin-top: 0.5rem;
      padding: 0.2rem 0.5rem;
      .restaurant-info {
        display: flex;
        align-items: center;
        margin: 0.2rem 0;
        .restaurant-name {
          font-size: 0.5rem;
        }
      }

      .food-comment {
        position: relative;
        .comment-data {
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

      .upload-picture-container {
        display: flex;
        margin: 0.3rem 0;
        align-items: center;
        .uplist-container {
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
            .icon-delete {
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
          .upload-icon {
            @include px2rem(line-height, 140);
            font-size: 1rem;
          }
        }
        .upload-description {
          font-size: 0.4rem;
          p {
            margin-top: 0.2rem;
            color: $mtGrey;
          }
        }
      }
    }

    .hidden-name-comment {
      margin: 0.4rem 0.5rem;
      .selector {
        border-radius: 50%;
        display: inline-block;
        @include px2rem(width, 35);
        @include px2rem(height, 35);
      }
      .no-select {
        border: 1px solid $mtGrey;
      }
      .select {
        text-align: center;
        @include px2rem(line-height, 35);
        color: #fff;
        background: $mtYellow;
        .iconfont {
          font-size: 0.5rem;
        }
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
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
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
