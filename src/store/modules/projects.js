import { getProjects, deleteProject } from '@/api/projects';

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
    totalPages(state) {
      return state.pages;
    },
    visiblePages(state) {
      if (state.pages.length > 5 && state.selectedPage < 5) {
        return state.pages.slice(0, 5);
      } else if (
        state.pages.length > 5 &&
        state.selectedPage > 4 &&
        state.selectedPage <= state.pages.length - 4
      ) {
        return state.pages.slice(
          state.selectedPage - 2,
          state.selectedPage + 1
        );
      } else if (
        state.pages.length > 5 &&
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
    updateAllProjects(state, payload) {
      state.projects = payload;
    },
    updateProjectsLoading(state, payload) {
      state.isLoading = payload;
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
    updateProjectsSort(state, payload) {
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
