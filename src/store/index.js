import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import users from './modules/users';
import projects from './modules/projects';
import currentUser from './modules/currentUser';
import userProfile from './modules/userProfile';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, users, projects, currentUser, userProfile },
});
