import { getUsersForSelect } from '@/api/users';
import { getProjectsForSelect } from '@/api/projects';

export const mutation = {
  SET_USERS_FOR_SELECT: 'SET_USERS_FOR_SELECT',
  SET_PROJECTS_FOR_SELECT: 'SET_PROJECTS_FOR_SELECT',
};

export default {
  state: {
    users: [],
    projects: [],
  },
  getters: {
    usersForSelect(state) {
      return state.users;
    },
    projectsForSelect(state) {
      return state.projects;
    },
  },
  mutations: {
    [mutation.SET_USERS_FOR_SELECT]: (state, payload) => {
      state.users = payload;
    },
    [mutation.SET_PROJECTS_FOR_SELECT]: (state, payload) => {
      state.projects = payload;
    },
  },
  actions: {
    fetchUsersForSelect(context) {
      getUsersForSelect(context);
    },
    fetchProjectsForSelect(context) {
      getProjectsForSelect(context);
    },
  },
};
