import axios from 'axios';

const url = 'http://45.12.239.156:8081/api';

export function getUsers(token, context) {
  return axios
    .post(
      `${url}/users/search`,
      {
        page: 1,
        limit: 10,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      context.commit('updateAllUsers', res.data.users);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
