// loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// <--- vee-validate
import {
  ValidationObserver, ValidationProvider, extend, localize, configure,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import TW from 'vee-validate/dist/locale/zh_TW.json';
// vee-validate --->

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

import $ from 'jquery';
import 'bootstrap';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import currencyFilter from './filters/currency';

import './bus';

window.$ = $;

Vue.use(VueAxios, axios);
Vue.use(VueAwesomeSwiper);

// 全域註冊 loading component
Vue.component('Loading', Loading);

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// <--- vee-validate
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

// vee-validate --->
localize('zh_TW', TW);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.filter('currency', currencyFilter);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
