import { getProjects } from '@/api/projects';

export default {
  state: {
    projects: [],
  },
  getters: {
    allProjects(state) {
      return state.projects;
    },
  },
  mutations: {
    updateAllProjects(state, payload) {
      state.projects = payload;
    },
  },
  actions: {
    fetchProjects(context) {
      getProjects(context);
    },
  },
};
