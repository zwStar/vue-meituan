<template>
  <nav class="category slide" ref="slide">
    <div class="slide-box" ref="slide-box">
      <div class="lists sMain" v-for="(item, index) in category_list" :key="index">
        <ul>
          <router-link tag="li" v-for="foodItem in item"
                       :to="{path:'order',query:{type:foodItem.type}}" :key="foodItem.id">
            <div class="category_img">
              <img :src="foodItem.url">
            </div>
            <span class="category_name">{{foodItem.name}}</span>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import {Carousel} from '@/utils/carousel.js'

  export default {
    data() {
      return {
        category_list_res: [
          {
            name: '美食',
            url: 'http://p1.meituan.net/jungle/bd3ea637aeaa2fb6120b6938b5e468a13442.png',
            type: 'food'
          },
          {
            name: '美团超市',
            url: 'http://p0.meituan.net/94.0.100/jungle/6b93ee96be3df7cf2bb6e661280b047d3975.png',
            type: 'supermarket'
          },
          {
            name: '生鲜果蔬',
            url: 'http://p0.meituan.net/94.0.100/jungle/f33ed552c52b4466b6308a2c14dbc62d4882.png',
            type: 'fruit'
          },
          {
            name: '下午茶',
            url: 'http://p0.meituan.net/94.0.100/jungle/af6cf63a5dfeb3557bf3099b03002ec34124.png',
            type: 'tea'
          },
          {
            name: '正餐优选',
            url: 'http://p1.meituan.net/94.0.100/jungle/1543bbcb048218424e2420a6934e17b24236.png',
            type: 'dinner'
          },
          {
            name: '汉堡披萨',
            url: 'http://p1.meituan.net/94.0.100/jungle/0e63b86b4ff14d214c1999a979fd21d14273.png',
            type: 'pizza'
          },
          {
            name: '跑腿代购',
            url: 'http://p1.meituan.net/94.0.100/jungle/b40b7d72233f7a76dd9d97af40b4b8975414.png',
            type: 'buyOnSomebody'
          },
          {
            name: '快餐简餐',
            url: 'http://p0.meituan.net/94.0.100/jungle/deeea00bb23e4fae31ea154678c7a8003838.png',
            type: 'fastFood'
          },
          {
            name: '地方菜',
            url: 'http://p1.meituan.net/94.0.100/jungle/b6033c2f9aa26cdf37ea24fb1346d2dc4690.png',
            type: 'localDish'
          },
          {
            name: '炸鸡美食',
            url: 'http://p0.meituan.net/94.0.100/jungle/0ce9a33a4accc536ac9e2d8d91951c924673.png',
            type: 'chicken'
          },
          {
            name: '免配送费',
            url: 'http://p0.meituan.net/94.0.100/jungle/f5ef975cae40ecc1a21dae61f44575d59129.png',
            type: 'freeDeliver'
          }
        ],
        category_list:[]
      }

    },
    mounted() {
      let refs = this.$refs;

//      let resArr = [...res]; // 返回一个新的数组
      let resArr = [...this.category_list_res];
      let foodArr = [];
      for (let i = 0, j = 0; i <  this.category_list_res.length; i += 8, j++) {
//        this.category_list[j] = resArr.splice(0, 8);
        foodArr[j] =  resArr.splice(0, 8);

      }
      this.category_list = foodArr;
      console.log(this.category_list)
      this.$nextTick(()=>{
        let obj = {

          slide: refs['slide'],
          slideBox: refs['slide-box'],
          sMain: document.querySelectorAll('.sMain'),
          time: 5000,
          item: 0
        };
        new Carousel(obj);
      })
    },
    methods:{
      aaa(){
        console.log(111)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .category {
    margin: 1.5rem 0;
    .slide-box {
      font-size: 0;
      .lists {
        width: 100vw;
        display: inline-block;
        vertical-align: top;
        ul {
          font-size: 0;
          li {
            width: 25%;
            display: inline-block;
            padding: 0.5rem;
            text-align: center;
            .category_img {
              img {
                width: 70%;
                height: 70%;
                margin-bottom: 0.3rem;
              }
            }
            .category_name {
              font-size: 1.3rem;
            }
          }
        }
      }
    }
  }
</style>
