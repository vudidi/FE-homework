import { getUsers, deleteUser } from '@/api/users';

export const mutation = {
  SET_USERS: 'SET_USERS',
  SET_US_LOADING: 'SET_US_LOADING',
  SET_TOTAL_US_PAGES: 'SET_TOTAL_US_PAGES',
  SET_UPD_US_PAGES: 'SET_UPD_US_PAGES',
  SET_US_SORT: 'SET_US_SORT',
  SET_US_MAX_LIMIT: 'SET_US_MAX_LIMIT',
};

export default {
  state: {
    users: [],
    isLoading: false,
    pages: [],
    selectedPage: '1',
    sort: 'asc',
    filter: null,
    maxLimit: '50',
  },
  getters: {
    allUsers(state) {
      return state.users;
    },
    isUsersLoading(state) {
      return state.isLoading;
    },
    totalUsersPages(state) {
      return state.pages;
    },
    visibleUsersPages(state) {
      if (state.pages.length > 10 && state.selectedPage < 5) {
        return state.pages.slice(0, 10);
      } else if (
        state.pages.length > 10 &&
        state.selectedPage > 4 &&
        state.selectedPage <= state.pages.length - 4
      ) {
        return state.pages.slice(
          state.selectedPage - 2,
          state.selectedPage + 1
        );
      } else if (
        state.pages.length > 10 &&
        state.selectedPage > state.pages.length - 4
      ) {
        return state.pages.slice(state.pages.length - 5, state.pages.length);
      } else {
        return state.pages;
      }
    },
    usersPage(state) {
      state.pages.forEach((page) => {
        if (page.isSelected === true) {
          state.selectedPage = page.num;
        }
      });
      return state.selectedPage;
    },
    usersSort(state) {
      return state.sort;
    },
    usersFilter(state) {
      return state.filter;
    },
    usersMaxLimit(state) {
      return state.maxLimit;
    },
  },
  mutations: {
    [mutation.SET_USERS]: (state, payload) => {
      state.users = payload;
    },
    [mutation.SET_US_LOADING]: (state, payload) => {
      state.isLoading = payload;
    },
    [mutation.SET_TOTAL_US_PAGES]: (state, payload) => {
      state.pages = payload;
    },
    [mutation.SET_UPD_US_PAGES]: (state, payload) => {
      state.pages.forEach((page) => {
        if (page.num === payload) {
          page.isSelected = true;
        } else {
          page.isSelected = false;
        }
      });
    },
    [mutation.SET_US_SORT]: (state, payload) => {
      state.sort = payload;
    },
    [mutation.SET_US_MAX_LIMIT]: (state, payload) => {
      state.maxLimit = payload;
    },
  },
  actions: {
    fetchUsers(context, params) {
      getUsers(context, params);
    },
    changeUserStatus(context, params) {
      deleteUser(context, params);
    },
  },
};
