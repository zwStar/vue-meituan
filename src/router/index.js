import Vue from 'vue'
import Router from 'vue-router'
// const _import = require('./_import_' + process.env.NODE_ENV);
// const User = _import('@/views/user/user');
const User = r => require.ensure([], () => r(require('@/views/user/user')), 'user')
const Index = r => require.ensure([], () => r(require('@/views/Index/Index')), 'Index')
const Search = r => require.ensure([], () => r(require('@/views/search/search')), 'Search')
const Location = r=>require.ensure([],()=>r(require('@/views/location/location'),'Location'))
const Home = r=>require.ensure([],()=>r(require('@/views/home/home'),'Home'))
const Order = r=>require.ensure([],()=>r(require('@/views/order/order'),'Order'))
const Login = r=>require.ensure([],()=>r(require('@/views/login/login'),'Login'))
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: { keepAlive: true },
    },
    {
      path:'/order',
      name:'Order',
      component:Order,
      meta:{keepAlive:true}
    },
    {
      path:'/search',
      name:'Search',
      component:Search
    },
    {
      path:'/location',
      name:'Location',
      component:Location
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    }
  ]
})
