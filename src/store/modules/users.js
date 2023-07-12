import { getUsers } from '@/api/users';

export default {
  state: {
    users: [],
    isLoading: false,
  },
  getters: {
    allUsers(state) {
      return state.users;
    },
    isUsersLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    updateAllUsers(state, payload) {
      state.users = payload;
    },
    updateUsersLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    fetchUsers(context) {
      getUsers(context);
    },
  },
};
