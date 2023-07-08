import axios from 'axios';

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

export function getUsers(context) {
  axios
    .post(
      `${url}/users/search`,
      {
        page: 1,
        limit: 50,
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
      context.commit('updateAllUsers', users);
    })
    .catch((err) => {
      console.log('error', err);
    });
}

export function getUserProfile(context, userID) {
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
      context.commit('updateUserProfile', res.data.users[0]);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
