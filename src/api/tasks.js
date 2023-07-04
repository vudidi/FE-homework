import axios from 'axios';

const url = 'http://45.12.239.156:8081/api';

export function getTasksAxios(token) {
  return axios
    .post(
      `${url}/tasks/search`,
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
      console.log('TasksAxios', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}

export function addTaskAxios(token) {
  return axios
    .post(
      `${url}/tasks`,
      {
        name: 'taskAxios',
        description: 'description',
        projectId: '6491be72da30960a23d88b96',
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      localStorage.setItem('TaskAxios', res.data._id);
      console.log('TaskAxios', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}

export function updateTaskAxios(token, id) {
  return axios
    .put(
      `${url}/tasks`,
      {
        name: 'updatedTaskAxios',
        executor: '648af1a17287972ce8676ee6',
        description: 'updated description',
        projectId: '6491be49da30960a23d88b81',
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
      console.log('updatedTaskAxios', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}

export function deleteTaskAxios(token, id) {
  return axios
    .delete(`${url}/tasks/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      localStorage.removeItem('TaskAxios');
      console.log(res.data.message);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
