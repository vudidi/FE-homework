import { getUsers } from '@/api/users';

export default {
  state: {
    user: {},
  },
  getters: {
    allUsers(state) {
      return state.user;
    },
  },
  mutations: {
    // updateAllUsers(state, payload) {
    //   state.users = payload;
    // },
  },
  actions: {
    // fetchUsers(context) {
    //   getUsers(TOKEN, context);
    // },
  },
};
