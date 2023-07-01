import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './helpers/register.js';

Vue.config.productionTip = false;

new Vue({ router, render: (h) => h(App) }).$mount('#app');
