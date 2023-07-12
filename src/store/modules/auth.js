import { loginUser } from '@/api/login';

export default {
  state: {
    authError: '',
    isLoading: false,
  },
  getters: {
    currentError(state) {
      return state.authError;
    },
    isAuthLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    updateError(state, payload) {
      state.authError = payload;
    },
    updateAuthLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    loginAction(context, user) {
      loginUser(context, user);
    },
  },
};
