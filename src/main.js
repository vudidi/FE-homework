import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router/router';
import './helpers/SvgRegister.js';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import vClickOutside from 'v-click-outside';

Vue.use(vClickOutside);

Vue.config.productionTip = false;

const requireComponent = require.context(
  './components',
  true,
  /[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    camelCase(
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({ store, router, render: (h) => h(App) }).$mount('#app');
