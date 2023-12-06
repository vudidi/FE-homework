import { loginUser } from '@/api/login';

export const mutation = {
  UPDATE_ERROR: 'UPDATE_ERROR',
  UPDATE_AUTH_LOADING: 'UPDATE_AUTH_LOADING',
};

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
    [mutation.UPDATE_ERROR]: (state, payload) => {
      state.authError = payload;
    },
    [mutation.UPDATE_AUTH_LOADING]: (state, payload) => {
      state.isLoading = payload;
    },
  },
  actions: {
    loginAction(context, user) {
      loginUser(context, user);
    },
  },
};
