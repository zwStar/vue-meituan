<template>
  <div class="nearbyShops">
    <div class="head">
      <span class="line"></span>
      <h2>附近商家</h2>
      <span class="line"></span>
    </div>
    <nav>
      <ul>
        <li>综合排序</li>
        <li>销量最高</li>
        <li>距离最近</li>
        <li>筛选</li>
      </ul>
    </nav>
    <article>
      <section>
        <div class="imgShow">
          <img src="" alt="">
        </div>
        <div class="detail">
          <h4>小啊便当</h4>
         <div class="shopsMessage">
           <span>*****</span>
           <span>月售1278</span>
           <span>57分钟</span>
           <span>3.0km</span>
         </div>
          <div class="priceMessage">
            <span>起送 ￥10 |</span>
            <span>配送 ￥0 |</span>
            <span>人均 ￥13</span>
          </div>
          <div class="activeMeaage">
            <span>满10减3;满20减7</span>
            <span>配送费立减10元</span>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";
  .nearbyShops{
    margin:1rem 0;
    .head{
      text-align: center;
      padding-bottom:1rem;
      border-bottom:1px solid $bottomLine;

      .line{
        vertical-align: middle;
        display: inline-block;
        width: 2rem;
        height:0;
        border-bottom:1px solid #000;
      }
      h2{
        display: inline-block;
        margin:0 1rem;
      }
    }
    nav{
      border-bottom: 1px solid $bottomLine;
      ul{
        display: flex;
        li{
          font-size:1.3rem;
          text-align: center;
          flex:1;
          line-height:3rem;
        }
      }
    }
    article{
      section{
        .detail{
          h4{
            font-size:1.6rem;

          }
          .priceMessage{
            span{
              font-size:1.3rem;
              line-height:2.6rem;
            }
          }
        }
      }
    }
  }
</style>
