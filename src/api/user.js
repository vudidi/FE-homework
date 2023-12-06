import axios from 'axios';
import { getUsers } from '@/api/users';

const url = 'http://45.12.239.156:8081/api';

export function uploadAvatar(context, data) {
  context.commit('updateProfileAvaLoading', true);

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
      context.commit('updateProfileAvaLoading', false);
      context.commit('updateUserProfile', res.data);
    })
    .catch((err) => {
      context.commit('updateProfileAvaLoading', false);
      console.log('error', err);
    });
}

export function uploadCurrentAvatar(context, data) {
  context.commit('updateProfileAvaLoading', true);

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
      context.commit('updateProfileAvaLoading', false);
      context.commit('updateCurrentUser', res.data);
    })
    .catch((err) => {
      context.commit('updateProfileAvaLoading', false);
      console.log('error', err);
    });
}

// Create new user

function regUser(params) {
  return axios.post(
    `${url}/registration`,
    {
      name: params.name,
      login: params.login,
      password: params.password,
    },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

function setUserInfo(params, id) {
  return axios.put(
    `${url}/users`,
    {
      _id: id,
      description: params.description,
      roles: [params.role],
    },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

function setUserStatus(params, id) {
  return axios.put(
    `${url}/users/status`,
    {
      _id: id,
      status: params.status,
    },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

function setUserAvatar(params, id) {
  return axios.put(
    `${url}/users/picture`,
    {
      _id: id,
      picture: params.formData,
    },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
}

export function createUser(context, params) {
  context.commit('SET_US_LOADING', true);
  regUser(params)
    .then((res) => {
      context.commit('SET_US_LOADING', false);
      console.log('res.data._id', res.data._id);
      Promise.all([
        setUserInfo(params, res.data._id),
        setUserStatus(params, res.data._id),
        setUserAvatar(params, res.data._id),
      ])
        .then(([userInfo, userStatus, userAvatar]) => {
          context.commit('SET_US_LOADING', false);

          console.log('userInfo', userInfo);
          console.log('userStatus', userStatus);
          console.log('userAvatar', userAvatar);
        })
        .then(() => {
          getUsers(context, params);
        })
        .catch((err) => {
          context.commit('SET_US_LOADING', false);

          console.log('error', err);
        });
    })
    .catch((err) => {
      context.commit('SET_US_LOADING', false);

      console.log('error', err);
    });
}
