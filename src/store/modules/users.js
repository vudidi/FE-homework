const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGFmMGQ1MDNjOGZmNGE0MDYwNzE3NyIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTY4ODQ3ODI2NSwiZXhwIjoxNjg4NTY0NjY1fQ.1kVX7309goWN40zYu6gZzHrrs78t-dEyHTD07MXvyl4';

import { getUsers } from '@/api/users';

export default {
  state: {
    users: [],
  },
  getters: {
    allUsers(state) {
      return state.users;
    },
  },
  mutations: {
    updateAllUsers(state, payload) {
      state.users = payload;
    },
  },
  actions: {
    fetchUsers(context) {
      getUsers(TOKEN, context);
    },
  },
};
