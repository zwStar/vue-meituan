// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'
import './utils/rem'

import Head from '@/components/head'
import Bottom from '@/components/Bottom'
import Star from '@/components/star'
import 'iview/dist/styles/iview.css'
import { Carousel,CarouselItem  } from 'iview'

// Vue.use(Carousel)
// Vue.use(CarouselItem)
Vue.component('Carousel',Carousel)
Vue.component('CarouselItem',CarouselItem)
Vue.component('v-head', Head);
Vue.component('v-bottom',Bottom);
Vue.component('Star',Star);
Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  next();
    // let email = localStorage("email");
    // if (email === "") {
    //   push("/");
    // }
    // else {
    //   next();
    // }
  })

router.afterEach(() => {
  // NProgress.done(); // 结束Progress
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
