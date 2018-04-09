## 关于 ##
2019届大三学生，前段时间一直想一个人单独开发一个较为完整的项目，在众多应用中，考虑之后选择了美团外卖来模仿，这段时间就利用课余时间进行开发，前端用vue+vuex+vue-router+axios，因为需要用到定位和支付等功能，需要后端配合，而且不想一直用mock假数据，所以用express(基于nodejs的框架)做后台，数据库用NOSQL的mongodb。 项目包含20多个路由，涉及到vue文件有40个，功能设计登录，定位，浏览商品，加购物车，下订单，支付(支持微信和支付宝的扫码支付和调起app支付)，评价，个人信息更改，是一个较为完整的项目。

### 注意：此项目为个人开发实践练习，不作为任何商业用途

## 重要事情先讲一遍 ##
求广深实习，现在可以开始上班(要求暑假上班也可以)，每周保证4天以上的上班时间
    
## 功能 ##
- 登录/注销
- IP定位
- 搜索地址
- 获取商店(计算当前位置和商店的距离)
- 加购物车
- 下订单
- 支付(支持微信和支付宝的扫码支付和调起app支付)
- 评价
- 头像上传(用了七牛云存储)
- 图片懒加载


## 技术栈 ##
- Webpack-cli搭建项目
- Vue全家桶(vue+vuex+vue-router)
- CSS预处理器SCSS
- axios与后端进行请求数据
- 七牛云存储图片
- 支付宝和微信支付
- 使用better-scroll滚动
- Express搭建后端服务
- Mongoose对MongoDB进行便捷操作
- 使用Charles抓取数据


## 效果演示
 
![主界面](screenshots/index.gif)
    
>   [定位和搜索](https://github.com/zwStar/vue-meituan/blob/master/screenshots/location.gif)
    
>   [下订单](https://github.com/zwStar/vue-meituan/blob/master/screenshots/makeOrder.gif) 
   
>   [清除购物车](https://github.com/zwStar/vue-meituan/blob/master/screenshots/clearCart.gif) 
    
## 说明
    后端接口文档
    项目地址：
    项目线上地址：服务器部署和域名备案中，稍后更新上


## 项目运行

```
项目运行之前，请确保系统已经安装以下应用
1、node
2、mongodb (开启状态)
```

```
git clone https://github.com/zwStar/vue-meituan.git

cd vue-meituan

npm install

npm run dev

访问: http://localhost:8080 (确保后端项目服务已开启)

```

# 项目布局

```
.
├── api                        后端接口
│   ├── index.js                    axios配置
│   ├── location.js                 定位
│   ├── order.js                    订单
│   ├── restaurant.js               餐馆
│   ├── uoload.js                   七牛云上传
│   ├── user.js                     用户信息
├── config.js                       运行配置
├── assets                          静态资源
├── components                      全局组件
├── router                          路由
├── store                           vuex
├── styles                          全局样式
├── views                           页面
├── App.vue                         入口页面
├── main.js                         入口
├── .babelrc                        babel-loader 配置
├── .gitignore                      git 忽略项
├── favicon.ico                     favicon图标
├── index.html                      html模板
└── package.json                    package.json
.

```

## 最后
    如果有问题，可以在 Issues 中提问。
    如果您对这个项目感兴趣，请Star支持下，谢谢！


# License
    MIT


