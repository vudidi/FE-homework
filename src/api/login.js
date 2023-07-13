import axios from 'axios';
import router from '@/router/router';

const url = 'http://45.12.239.156:8081/api';

export function loginUser(context, user) {
  context.commit('UPDATE_AUTH_LOADING', true);

  axios
    .post(
      `${url}/login`,
      {
        login: user.login,
        password: user.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      context.commit('UPDATE_AUTH_LOADING', false);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('isAuth', true);

      router.push({
        name: 'projects',
        query: {
          page: 1,
          field: 'dateCreated',
          type: 'desc',
          filter: null,
        },
      });
    })
    .catch((err) => {
      console.log('error', err);
      context.commit('UPDATE_AUTH_LOADING', false);
      context.commit('UPDATE_ERROR', err.response.data.message);
    });
}
