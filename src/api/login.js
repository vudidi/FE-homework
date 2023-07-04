import axios from 'axios';

const url = 'http://45.12.239.156:8081/api';

export default function login() {
  return axios
    .post(
      `${url}/login`,
      {
        login: 'admin',
        password: '6ps4hu',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      console.log('token', res.data.token);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
