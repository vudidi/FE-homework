import { loginUser } from '@/api/login';

export default {
  state: {
    authError: '',
  },
  getters: {
    currentError(state) {
      return state.authError;
    },
  },
  mutations: {
    updateError(state, payload) {
      state.authError = payload;
    },
  },
  actions: {
    loginAction(context, login, password) {
      loginUser(context, login, password);
    },
  },
};