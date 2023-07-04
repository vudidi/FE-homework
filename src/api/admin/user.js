import axios from 'axios';

const url = 'http://45.12.239.156:8081/api';

export function uploadAvatar(token, id, FormData) {
  return axios
    .put(
      `${url}/users/picture`,
      {
        _id: `${id}`,
        picture: FormData,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((res) => {
      console.log('uploadAvatar', res.data.picture);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
