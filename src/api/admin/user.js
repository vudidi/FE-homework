import axios from 'axios';

const url = 'http://45.12.239.156:8081/api';

export function uploadAvatar(context, data) {
  return axios
    .put(
      `${url}/users/picture`,
      {
        _id: data.id,
        picture: data.formData,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((res) => {
      context.commit('updateUserProfile', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}

export function uploadCurrentAvatar(context, data) {
  return axios
    .put(
      `${url}/users/picture`,
      {
        _id: data.id,
        picture: data.formData,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((res) => {
      context.commit('updateCurrentUser', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
