import { getProjects, deleteProject } from '@/api/projects';

export const mutation = {
  SET_PROJECTS: 'SET_PROJECTS',
  SET_PR_LOADING: 'SET_PR_LOADING',
  SET_TOTAL_PR_PAGES: 'SET_TOTAL_PR_PAGES',
  SET_UPD_PR_PAGES: 'SET_UPD_PR_PAGES',
  SET_PR_SORT: 'SET_PR_SORT',
};

export default {
  state: {
    projects: [],
    isLoading: false,
    pages: [],
    selectedPage: '1',
    sort: {
      field: 'dateCreated',
      type: 'desc',
      value: 'По дате создания',
    },
    filter: null,
  },
  getters: {
    allProjects(state) {
      return state.projects;
    },
    isProjectsLoading(state) {
      return state.isLoading;
    },
    totalProjectsPages(state) {
      return state.pages;
    },
    visibleProjectsPages(state) {
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
    projectsPage(state) {
      state.pages.forEach((page) => {
        if (page.isSelected === true) {
          state.selectedPage = page.num;
        }
      });
      return state.selectedPage;
    },
    projectsSort(state) {
      return state.sort;
    },
    projectsFilter(state) {
      return state.filter;
    },
  },
  mutations: {
    [mutation.SET_PROJECTS]: (state, payload) => {
      state.projects = payload;
    },
    [mutation.SET_PR_LOADING]: (state, payload) => {
      state.isLoading = payload;
    },
    [mutation.SET_TOTAL_PR_PAGES]: (state, payload) => {
      state.pages = payload;
    },
    [mutation.SET_UPD_PR_PAGES]: (state, payload) => {
      state.pages.forEach((page) => {
        if (page.num === payload) {
          page.isSelected = true;
        } else {
          page.isSelected = false;
        }
      });
    },
    [mutation.SET_PR_SORT]: (state, payload) => {
      state.sort = payload;
    },
  },
  actions: {
    fetchProjects(context, params) {
      getProjects(context, params);
    },
    removeProject(context, params) {
      deleteProject(context, params);
    },
  },
};
