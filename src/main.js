import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate from 'vee-validate';

import './bus';
import currencyFilter from './filters/currency';
import timestampToDate from './filters/timestampToDate';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;

Vue.use(VeeValidate);

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('timestampToDate', timestampToDate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

router.beforeEach((to, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API_PATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/'
        });
      }
    });
  } else {
    next();
  }
});

const originalPush = router.prototype.push;
router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
