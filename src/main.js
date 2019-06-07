// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'

import Head from '@/components/head'
import Bottom from '@/components/bottom'
import Star from '@/components/star'
import AlertTip from '@/components/alertTip'
import Loading from '@/components/loading'
import FastClick from 'fastclick'

//全局注册组件
Vue.component('v-head', Head);
Vue.component('v-bottom', Bottom);
Vue.component('v-star', Star);
Vue.component('alert-tip', AlertTip);
Vue.component('v-loading',Loading);

Vue.config.productionTip = false

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}


/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
