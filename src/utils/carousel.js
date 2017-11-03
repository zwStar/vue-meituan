export const Carousel  = (function () {

  function Carousel(obj) {
    this._init(obj);
  }

  Carousel.prototype = {
    _init: function (options) {
      var _this = this;
      this.options = options;
      this.newStyle();    //初始化宽度和高度
      this.bindTouch();   //绑定触摸事件
    },
    newStyle: function () {
      this.winWidth = window.innerWidth;
      this.options.slideBox.style.width = this.winWidth * this.options.sMain.length + "px";   //盒子宽度设置为4个内容的宽度

      // for (var i = 0; i < this.options.sMain.length; i++) {   //给每个轮播图设置宽度
      //   this.options.sMain[i].style.width = this.winWidth + "px";
      // }
    },
    bindTouch: function () {
      var _this = this;
      var startPos = null;
      window.onresize = function () {
        _this.newStyle()
      };
      //滑动开始事件
      this.options.slide.addEventListener('touchstart', function (e) {
        _this.isScrolling = true;
        var startTouch = e.changedTouches[0];
        startPos = {        //保存开始触摸的位置
          x: startTouch.pageX,
          y: startTouch.pageY,
          time: +new Date()
        }
      }, false);
      //滑动移动事件
      this.options.slide.addEventListener('touchmove', function (e) {
        if (!_this.isScrolling) {
          return;
        }
        e.preventDefault(); //阻止默认事件
        var moveTouch = e.changedTouches[0];
        var movePos = { //移动多少像素
          x: moveTouch.pageX - startPos.x,
          y: moveTouch.pageY - startPos.y
        };

        _this.isScrolling = Math.abs(movePos.x) > Math.abs(movePos.y);
        if (_this.isScrolling) {
          var moveOffset = movePos.x - _this.options.item * _this.winWidth;
          _this.options.slideBox.style.webkitTransform = "translate3d(" + moveOffset + "px,0,0)";
          _this.options.slideBox.style.webkitTransition = "all .6s ease-out";
        }


      }, false);
      //滑动结束事件
      this.options.slide.addEventListener('touchend', function (e) {
        if (!_this.isScrolling) {
          return;
        }
        var duration = +new Date() - startPos.time;
        var endTouch = e.changedTouches[0];
        var endPos = {  //移动了多少像素
          x: endTouch.pageX - startPos.x,
          y: endTouch.pageY - startPos.y
        };

        if (duration > 10) {  /*间隔事件*/  //这里是毫秒
          if (Math.abs(endPos.x) > 50) {  /*两次滑动的距离>10*/
            if (endPos.x > 0) {     //向右滑动
              if (_this.options.item == 0) {
                _this.isScrolling = false;
                _this.objAnimation();
                /*回弹到第一张*/
              } else {
                _this.prevPage();
                /*往左*/
              }

            } else if (endPos.x < 0) {      //向左滑动
              if (_this.options.item == _this.options.sMain.length - 1) { //判断是否是最后一张
                _this.isScrolling = false;
                _this.objAnimation();
                /*回调到最后一张*/
              } else {
                _this.nextPage();
                /*往右*/
              }

            } else {
              _this.isScrolling = false;
            }
          }
        }
      }, false)
    },
    nextPage: function () {
      if (this.isScrolling == false) {
        return;
      }
      if (this.options.item == 3) {
        this.options.item = -1;
      }
      if (this.options.item == this.options.sMain.length - 1) {
        return;
      }
      this.options.item++;
      this.objAnimation(this.options.item);
      /*处理动画*/
      // this.curItem(this.options.item);
      /*显示当前索引值*/
    },
    prevPage: function () {
      if (this.options.item == 0) {
        return;
      }
      this.options.item--;
      this.objAnimation();
      // this.curItem();
    },
    curItem: function () {
      for (var i = 0; i < this.options.sItem.length; i++) {
        this.options.sItem[i].className = "";
      }
      this.options.sItem[this.options.item].className = "cur";
    },
    objAnimation: function () {
      var setEq = -(this.options.item * this.winWidth) + "px";
      this.options.slideBox.style.webkitTransition = "all .6s ease-out";
      this.options.slideBox.style.webkitTransform = "translate3d(" + setEq + ",0,0)";
      /*用3D变形来开启GPU加速*/
    }

  }


  return Carousel
})();

