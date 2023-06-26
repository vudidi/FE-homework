import Vue from 'vue';
import SvgIcon from '@/UI/SvgIcon/SvgIcon.vue'; // svg component

// register globally
Vue.component('svg-icon', SvgIcon);

const req = require.context('../assets/icons/svg', false, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);
