import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import router from '@/router';
import App from './App.vue';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const baseAxios = axios.create({
  baseURL: 'https://api.npms.io/v2',
});

Vue.prototype.$axios = baseAxios;
store.$axios = baseAxios;

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

export default new Vue();

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
