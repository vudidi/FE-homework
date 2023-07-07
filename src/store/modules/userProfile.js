import { getUserProfile } from '@/api/users';

const url = 'http://45.12.239.156:8081';

export default {
  state: {
    userProfile: {
      id: '',
      role: '',
      name: '',
      description: '',
      status: '',
      picture: '',
    },
  },
  getters: {
    updatedUserProfile(state) {
      return state.userProfile;
    },
  },
  mutations: {
    updateUserProfile(state, payload) {
      state.userProfile.id = payload._id;
      state.userProfile.role = payload.roles[0];
      state.userProfile.name = payload.name;
      state.userProfile.description = payload.description;
      state.userProfile.status = payload.status;
      if (payload.picture) {
        state.userProfile.picture = `${url}/${payload.picture}`;
      } else {
        state.userProfile.picture = require('@/assets/images/avatar.png');
      }
    },
  },
  actions: {
    fetchUserProfile(context, userID) {
      getUserProfile(context, userID);
    },
  },
};
