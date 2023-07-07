import { getUsers } from '@/api/users';

export default {
  state: {
    users: [],
  },
  getters: {
    allUsers(state) {
      return state.users;
    },
  },
  mutations: {
    updateAllUsers(state, payload) {
      state.users = payload;
    },
  },
  actions: {
    fetchUsers(context) {
      getUsers(context);
    },
  },
};
