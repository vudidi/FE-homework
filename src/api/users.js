import axios from 'axios';
import { getPagPages } from '@/helpers/getPagPages';

const url = 'http://45.12.239.156:8081/api';

export function getCurrentUser(context) {
  const token = localStorage.getItem('token');

  if (token) {
    axios
      .get(`${url}/users/current`, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        localStorage.setItem('isAuth', true);
        context.commit('updateCurrentUser', res.data);
      })
      .catch((err) => {
        localStorage.setItem('isAuth', false);
        console.log('error', err.response.status);
      });
  } else {
    localStorage.setItem('isAuth', false);
  }
}

export function getUsers(context, params) {
  context.commit('SET_US_LOADING', true);

  axios
    .post(
      `${url}/users/search`,
      {
        page: params.page,
        limit: params.limit,
        sort: params.sort,
        filter: params.filter,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      const users = [];

      res.data.users.forEach((el) => {
        const user = {
          id: '',
          role: '',
          name: '',
          description: '',
          status: '',
          picture: null,
          isDropdownOpen: false,
        };
        user.id = el._id;
        user.role = el.roles[0];
        user.name = el.name;
        user.description = el.description;
        user.status = el.status;
        if (el.picture) {
          user.picture = `http://45.12.239.156:8081/${el.picture}`;
        } else {
          user.picture = null;
        }
        users.push(user);
      });

      context.commit('SET_US_LOADING', false);
      context.commit('SET_USERS', users);
      context.commit(
        'SET_TOTAL_US_PAGES',
        getPagPages(res.data.total, params.page)
      );
    })

    .catch((err) => {
      context.commit('SET_US_LOADING', false);
      console.log('error', err);
    });
}

export function getUserProfile(context, userID) {
  context.commit('updateProfileLoading', true);

  axios
    .post(
      `${url}/users/search`,
      {
        page: 1,
        limit: 10,
        filter: {
          _id: userID,
        },
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      context.commit('updateProfileLoading', false);
      context.commit('updateUserProfile', res.data.users[0]);
    })
    .catch((err) => {
      context.commit('updateProfileLoading', false);
      console.log('error', err);
    });
}

function deleteItem(params) {
  return axios.put(
    `${url}/users/status`,
    {
      _id: params.id,
      status: 'DELETED',
    },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

export function deleteUser(context, params) {
  context.commit('SET_US_LOADING', true);

  deleteItem(params)
    .then((res) => {
      console.log(res.data);
    })
    .then(() => {
      getUsers(context, params);
    })
    .catch((err) => {
      context.commit('SET_US_LOADING', false);
      console.log('error', err);
    });
}

export function getAllUsers() {
  return axios.post(
    `${url}/users/search`,
    {
      page: 1,
      limit: 100000,
      sort: 'asc',
    },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

export function searchUsers(context, params) {
  context.commit('SET_US_LOADING', true);

  axios
    .post(
      `${url}/users/search`,
      {
        page: params.page,
        limit: params.limit,
        sort: params.sort,
        filter: params.filter,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      if (res.data.users.length < 1) {
        context.commit('SET_US_SEARCH_RESULT', false);
        context.commit('SET_US_LOADING', false);
      } else {
        context.commit('SET_US_SEARCH_RESULT', true);
        context.commit('SET_US_LOADING', false);

        const users = [];

        res.data.users.forEach((el) => {
          const user = {
            id: '',
            role: '',
            name: '',
            description: '',
            status: '',
            picture: null,
            isDropdownOpen: false,
          };
          user.id = el._id;
          user.role = el.roles[0];
          user.name = el.name;
          user.description = el.description;
          user.status = el.status;
          if (el.picture) {
            user.picture = `http://45.12.239.156:8081/${el.picture}`;
          } else {
            user.picture = null;
          }
          users.push(user);
        });

        context.commit('SET_US_LOADING', false);
        context.commit('SET_USERS', users);
        context.commit(
          'SET_TOTAL_US_PAGES',
          getPagPages(res.data.total, params.page)
        );
      }
    })
    .catch((err) => {
      context.commit('SET_US_LOADING', false);
      console.log('error', err);
    });
}

export function getUsersForSelect(context) {
  axios
    .post(
      `${url}/users/search`,
      {
        page: 1,
        limit: 100000,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      const users = [];

      res.data.users.forEach((el) => {
        const user = {
          name: '',
          value: '',
          isActive: false,
        };

        user.name = el.name;
        user.value = el._id;

        users.push(user);
      });

      context.commit('SET_USERS_FOR_SELECT', users);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
