import { getProjects } from '@/api/projects';

export default {
  state: {
    projects: [],
    pages: [],
    currentPage: '1',
  },
  getters: {
    allProjects(state) {
      return state.projects;
    },
    totalPages(state) {
      return state.pages;
    },
    visiblePages(state) {
      if (state.pages.length > 5 && state.currentPage < 5) {
        return state.pages.slice(0, 5);
      } else if (
        state.pages.length > 5 &&
        state.currentPage > 4 &&
        state.currentPage <= state.pages.length - 4
      ) {
        return state.pages.slice(state.currentPage - 2, state.currentPage + 1);
      } else if (
        state.pages.length > 5 &&
        state.currentPage > state.pages.length - 4
      ) {
        return state.pages.slice(state.pages.length - 5, state.pages.length);
      } else {
        return state.pages;
      }
    },
    currentPage(state) {
      state.pages.forEach((page) => {
        if (page.isSelected === true) {
          state.currentPage = page.num;
        }
      });
      return state.currentPage;
    },
  },
  mutations: {
    updateAllProjects(state, payload) {
      state.projects = payload;
    },
    getTotalPages(state, payload) {
      state.pages = payload;
    },
    updateTotalPages(state, payload) {
      state.pages.forEach((page) => {
        if (page.num === payload) {
          page.isSelected = true;
        } else {
          page.isSelected = false;
        }
      });
    },
  },
  actions: {
    fetchProjects(context, page, filter) {
      getProjects(context, page, filter);
    },
  },
};
