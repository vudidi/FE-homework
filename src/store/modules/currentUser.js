import { getCurrentUser } from '@/api/users';

const url = 'http://45.12.239.156:8081';

export default {
  state: {
    user: {
      id: '',
      role: '',
      name: '',
      description: '',
      status: '',
      picture: `${require('@/assets/images/avatar.png')}`,
    },
  },
  getters: {
    currentUser(state) {
      return state.user;
    },
  },
  mutations: {
    updateCurrentUser(state, payload) {
      state.user.id = payload._id;
      state.user.role = payload.roles[0];
      state.user.name = payload.name;
      state.user.description = payload.description;
      state.user.status = payload.status;
      if (payload.picture) {
        state.user.picture = `${url}/${payload.picture}`;
      } else {
        state.user.picture = require('@/assets/images/avatar.png');
      }
    },
  },
  actions: {
    fetchCurrentUser(context) {
      getCurrentUser(context);
    },
  },
};
