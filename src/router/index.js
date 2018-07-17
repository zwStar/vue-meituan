import Vue from 'vue'
import Router from 'vue-router'

const Index = r => require.ensure([], () => r(require('@/views/Index/Index')), 'Index')     //主页
const Search = r => require.ensure([], () => r(require('@/views/search/search')), 'Search')     //查找组件
const Location = r => require.ensure([], () => r(require('@/views/location/location'), 'Location'))   //定位
const Home = r => require.ensure([], () => r(require('@/views/home/home'), 'Home'))         //我的
const Order = r => require.ensure([], () => r(require('@/views/order/order'), 'Order'))     //订单
const Login = r => require.ensure([], () => r(require('@/views/login/login'), 'Login'))   //登录
const Store = r => require.ensure([], () => r(require('@/views/store/store'), 'Store'))   //商店
const Menu = r => require.ensure([], () => r(require('@/views/store/menu/menu'), 'Menu'))   //菜单
const Comment = r => require.ensure([], () => r(require('@/views/store/comment/comment'), 'Comment')) //商店评价页
const Seller = r => require.ensure([], () => r(require('@/views/store/seller/seller'), 'Seller')) //商家信息
const ConfirmOrder = r => require.ensure([], () => r(require('@/views/confirmOrder/confirmOrder'), 'ConfirmOrder'))  //确认下单
const Address = r => require.ensure([], () => r(require('@/views/confirmOrder/children/address'), 'Address'))  //收货地址
const Add_Address = r => require.ensure([], () => r(require('@/views/confirmOrder/children/children/add_Address'), 'Add_Address')) //添加收货地址
const Pay = r => require.ensure([], () => r(require('@/views/pay/pay'), 'PAY'))        //支付
const Cart = r => require.ensure([], () => r(require('@/views/cart/cart'), 'CART'))   //购物车
const OrderDetail = r => require.ensure([], () => r(require('@/views/order/orderDetail'), 'OrderDetail'))   //订单详情
const Category = r => require.ensure([], () => r(require('@/views/category/category'), 'CATEGORY'))   //食物分类
const MyAddress = r => require.ensure([], () => r(require('@/views/home/children/address'), 'MyAddress'))   //我的收货地址
const MakeComment = r => require.ensure([], () => r(require('@/views/order/comment'), 'MakeComment'))   //作评论

const Collection = r => require.ensure([], () => r(require('@/views/home/children/collection'), 'Collection'))   //我的收藏
const ThankRecord = r => require.ensure([], () => r(require('@/views/home/children/thankRecord'), 'ThankRecord'))   //答谢记录
const FootPrint = r => require.ensure([], () => r(require('@/views/home/children/footprint'), 'FootPrint'))   //答谢记录
const Friend = r => require.ensure([], () => r(require('@/views/home/children/friend'), 'Friend'))   //我的好友
const MyComment = r => require.ensure([], () => r(require('@/views/home/children/comment'), 'MyComment'))   //我的评论
const Error = r => require.ensure([], () => r(require('@/views/404/error'), 'Error'))   //404
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: '首页',
      component: Index,
      meta: {keepAlive: true},
    },
    {
      path: '/category',
      name: '分类',
      component: Category
    },
    {
      path: '/order',
      name: '我的订单',
      component: Order,
      children: [
        {
          path: 'comment',
          name: '作评价',
          component: MakeComment
        }
      ]
    },
    {
      path: '/search',
      name: '搜索商家',
      component: Search
    },
    {
      path: '/location',
      name: '定位',
      component: Location
    },
    {
      path: '/add_address',
      name: '添加地址',
      component: Add_Address,
      children: [
        {
          path: 'location',
          name: '地址定位',
          component: Location
        }
      ]
    },
    {
      path: '/home',
      name: '我的',
      component: Home,
      keepAlive: true,
      children: [
        {
          path: 'address',
          name: '我的收获地址',
          component: MyAddress
        },
        {
          path: 'collection',
          name: '我的收藏',
          component: Collection
        },
        {
          path: 'thank',
          name: '答谢记录',
          component: ThankRecord
        },
        {
          path: 'footprint',
          name: '我的足迹',
          component: FootPrint
        },
        {
          path: 'friend',
          name: '我的好友',
          component: Friend
        },
        {
          path: 'comment',
          name: '我的评论',
          component: MyComment
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/confirmOrder',
      name: '确认订单',
      component: ConfirmOrder,
      children: [{
        path: 'address',
        name: '订单收货地址',
        component: Address
      }]
    },
    {
      path: '/store',
      component: Store,
      children: [
        {
          path: 'menu',
          name: '菜单',
          component: Menu
        },
        {
          path: 'comment',
          name: '评论',
          component: Comment
        },
        {
          path: 'seller',
          name: '商家信息中心',
          component: Seller
        },
        {
          path: '',
          redirect: '/store/menu'
        }
      ]
    },
    {
      path: '/cart',
      name: '购物车',
      component: Cart
    },
    {
      path: '/pay',
      name: '支付',
      component: Pay
    },
    {
      path: '/order_detail',
      name: '订单详情',
      component: OrderDetail
    },
    {
      path: '/error',
      name: '找不到该页面',
      component: Error
    },
    {
      path: '*',
      redirect: '/error'
    }
  ]
})
