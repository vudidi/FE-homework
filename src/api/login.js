import axios from 'axios';
import router from '@/router/router';

const url = 'http://45.12.239.156:8081/api';

export function loginUser(context, user) {
  return axios
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
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('isAuth', true);
      router.push('/projects').catch((err) => {
        throw new Error(`Problem handling something: ${err}.`);
      });
    })
    .catch((err) => {
      console.log('error', err);
      context.commit('updateError', err.response.data.message);
    });
}
