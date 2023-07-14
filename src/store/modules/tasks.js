import { getTasks, deleteTask } from '@/api/tasks';

export const mutation = {
  SET_TASKS: 'SET_TASKS',
  SET_TS_LOADING: 'SET_TS_LOADING',
  SET_TOTAL_TS_PAGES: 'SET_TOTAL_TS_PAGES',
  SET_UPD_TS_PAGES: 'SET_UPD_TS_PAGES',
  SET_TS_SORT: 'SET_TS_SORT',
  SET_TS_FILTER: 'SET_TS_FILTER',
  SET_TS_SEARCH_RESULT: 'SET_TS_SEARCH_RESULT',
};

export default {
  state: {
    tasks: [],
    isLoading: false,
    pages: [],
    selectedPage: '1',
    sort: {
      field: 'dateCreated',
      type: 'desc',
      value: 'По дате создания',
    },
    filter: {
      name: null,
      status: null,
      author: null,
      executor: null,
      projectId: null,
      dateStart: null,
      dateEnd: null,
    },
    isSearchResults: false,
  },
  getters: {
    allTasks(state) {
      return state.tasks;
    },
    isTasksLoading(state) {
      return state.isLoading;
    },
    totalTasksPages(state) {
      return state.pages;
    },
    visibleTasksPages(state) {
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
    tasksPage(state) {
      state.pages.forEach((page) => {
        if (page.isSelected === true) {
          state.selectedPage = page.num;
        }
      });
      return state.selectedPage;
    },
    tasksSort(state) {
      return state.sort;
    },
    tasksFilter(state) {
      return state.filter;
    },
    tasksSearchResult(state) {
      return state.isSearchResults;
    },
  },
  mutations: {
    [mutation.SET_TASKS]: (state, payload) => {
      state.tasks = payload;
    },
    [mutation.SET_TS_LOADING]: (state, payload) => {
      state.isLoading = payload;
    },
    [mutation.SET_TOTAL_TS_PAGES]: (state, payload) => {
      state.pages = payload;
    },
    [mutation.SET_UPD_TS_PAGES]: (state, payload) => {
      state.pages.forEach((page) => {
        if (page.num === payload) {
          page.isSelected = true;
        } else {
          page.isSelected = false;
        }
      });
    },
    [mutation.SET_TS_SORT]: (state, payload) => {
      state.sort = payload;
    },
    [mutation.SET_TS_FILTER]: (state, payload) => {
      state.filter = payload;
    },
    [mutation.SET_TS_SEARCH_RESULT]: (state, payload) => {
      state.isSearchResults = payload;
    },
  },
  actions: {
    fetchTasks(context, params) {
      getTasks(context, params);
    },
    removeTask(context, params) {
      deleteTask(context, params);
    },
  },
};
