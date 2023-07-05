import axios from 'axios';

const url = 'http://45.12.239.156:8081/api';

export function loginUser(context, login, password) {
  return axios
    .post(
      `${url}/login`,
      {
        login: login,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      localStorage.setItem('token', res.data.token);
    })
    .catch((err) => {
      console.log('error', err);
      context.commit('updateError', err.response.data.message);
    });
}
