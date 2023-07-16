import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import users from './modules/users';
import projects from './modules/projects';
import tasks from './modules/tasks';
import currentUser from './modules/currentUser';
import userProfile from './modules/userProfile';
import select from './modules/select';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, users, projects, tasks, currentUser, userProfile, select },
});
