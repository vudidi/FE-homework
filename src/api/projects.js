import axios from 'axios';

const url = 'http://45.12.239.156:8081/api';

export function getProjectsAxios(token) {
  return axios
    .post(
      `${url}/projects/search`,
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
      console.log('ProjectsAxios', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}

export function addProjectAxios(token) {
  return axios
    .post(
      `${url}/projects`,
      {
        name: 'ProjectAxios',
        code: 'code#74563432',
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      localStorage.setItem('ProjectAxios', res.data._id);
      console.log('ProjectAxios', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}

export function updateProjectAxios(token, id) {
  return axios
    .put(
      `${url}/projects`,
      {
        name: 'updatedProjectAxios',
        code: 'code#74563432',
        _id: id,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      console.log('updatedProjectAxios', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}

export function deleteProjectAxios(token, id) {
  return axios
    .delete(`${url}/projects/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      localStorage.removeItem('ProjectAxios');
      console.log(res.data.message);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
