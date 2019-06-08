import Vue from 'vue'
import Router from 'vue-router'

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
      component: r => require.ensure([], () => r(require('@/views/index/index')), 'Index'),
      meta: {keepAlive: true},
    },
    {
      path: '/category',
      name: '分类',
      component: r => require.ensure([], () => r(require('@/views/category/category'), 'CATEGORY'))
    },
    {
      path: '/order',
      name: '我的订单',
      component: r => require.ensure([], () => r(require('@/views/order/order'), 'Order')),
      children: [
        {
          path: 'comment',
          name: '作评价',
          component: r => require.ensure([], () => r(require('@/views/order/comment'), 'MakeComment'))
        }
      ]
    },
    {
      path: '/search',
      name: '搜索商家',
      component: r => require.ensure([], () => r(require('@/views/search/search')), 'Search')
    },
    {
      path: '/location',
      name: '定位',
      component: r => require.ensure([], () => r(require('@/views/location/location'), 'Location'))
    },
    {
      path: '/add_address',
      name: '添加地址',
      component: r => require.ensure([], () => r(require('@/views/confirm_order/children/children/add_address'), 'Add_Address')),
      children: [
        {
          path: 'location',
          name: '地址定位',
          component: r => require.ensure([], () => r(require('@/views/location/location'), 'Location'))
        }
      ]
    },
    {
      path: '/home',
      name: '我的',
      component: r => require.ensure([], () => r(require('@/views/home/home'), 'Home')),
      keepAlive: true,
      children: [
        {
          path: 'address',
          name: '我的收获地址',
          component: r => require.ensure([], () => r(require('@/views/home/children/address'), 'MyAddress'))
        },
        {
          path: 'collection',
          name: '我的收藏',
          component: r => require.ensure([], () => r(require('@/views/home/children/collection'), 'Collection'))
        },
        {
          path: 'thank',
          name: '答谢记录',
          component: r => require.ensure([], () => r(require('@/views/home/children/thank_record'), 'ThankRecord'))
        },
        {
          path: 'footprint',
          name: '我的足迹',
          component: r => require.ensure([], () => r(require('@/views/home/children/footprint'), 'FootPrint'))
        },
        {
          path: 'friend',
          name: '我的好友',
          component: r => require.ensure([], () => r(require('@/views/home/children/friend'), 'Friend'))
        },
        {
          path: 'comment',
          name: '我的评论',
          component: r => require.ensure([], () => r(require('@/views/home/children/comment'), 'MyComment'))
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: r => require.ensure([], () => r(require('@/views/login/login'), 'Login'))
    },
    {
      path: '/confirm_order',
      name: '确认订单',
      component: r => require.ensure([], () => r(require('@/views/confirm_order/confirm_order'), 'ConfirmOrder')),
      children: [{
        path: 'address',
        name: '订单收货地址',
        component: r => require.ensure([], () => r(require('@/views/confirm_order/children/address'), 'Address'))
      }]
    },
    {
      path: '/store',
      component: r => require.ensure([], () => r(require('@/views/store/store'), 'Store')),
      children: [
        {
          path: 'menu',
          name: '菜单',
          component: r => require.ensure([], () => r(require('@/views/store/menu/menu'), 'Menu'))
        },
        {
          path: 'comment',
          name: '评论',
          component: r => require.ensure([], () => r(require('@/views/store/comment/comment'), 'Comment'))
        },
        {
          path: 'seller',
          name: '商家信息中心',
          component: r => require.ensure([], () => r(require('@/views/store/seller/seller'), 'Seller'))
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
      component: r => require.ensure([], () => r(require('@/views/cart/cart'), 'CART'))
    },
    {
      path: '/pay',
      name: '支付',
      component: r => require.ensure([], () => r(require('@/views/pay/pay'), 'PAY'))
    },
    {
      path: '/order_detail',
      name: '订单详情',
      component: r => require.ensure([], () => r(require('@/views/order/order_detail'), 'OrderDetail'))
    },
    {
      path: '/error',
      name: '找不到该页面',
      component: r => require.ensure([], () => r(require('@/views/404/error'), 'Error'))
    },
    {
      path: '*',
      redirect: '/error'
    }
  ]
})
