import { getTasks } from '@/api/tasks';

export default {
  state: {
    tasks: [],
    isLoading: false,
  },
  getters: {
    allTasks(state) {
      return state.tasks;
    },
    isTasksLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    updateAllTasks(state, payload) {
      state.tasks = payload;
    },
    updateTasksLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    fetchTasks(context, filter) {
      getTasks(context, filter);
    },
  },
};
