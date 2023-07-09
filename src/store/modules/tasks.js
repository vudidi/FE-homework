import { getTasks } from '@/api/tasks';

export default {
  state: {
    tasks: [],
  },
  getters: {
    allTasks(state) {
      return state.tasks;
    },
  },
  mutations: {
    updateAllTasks(state, payload) {
      state.tasks = payload;
    },
  },
  actions: {
    fetchTasks(context) {
      getTasks(context);
    },
  },
};
