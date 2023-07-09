import axios from 'axios';
import store from '@/store';
import {
  getItemAuthor,
  getItemAuthorAvatar,
  getItemAuthorEdited,
} from '@/helpers/getItemAuthorInfo';
import formatTaskStatus from '@/helpers/formatTaskStatus';

const url = 'http://45.12.239.156:8081/api';

export function getTasks(context) {
  axios
    .post(
      `${url}/tasks/search`,
      {
        page: 1,
        limit: 10,
        sort: {
          field: 'dateCreated',
          type: 'desc',
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
      const tasks = [];
      const users = store.getters.allUsers;

      res.data.tasks.forEach((el) => {
        const task = {
          id: '',
          projectId: '',
          name: '',
          description: '',
          status: '',
          time: '',
          number: '',
          executor: '',
          author: '',
          authorAvatar: '',
          authorEdited: '',
          dateCreated: '',
          dateEdited: '',
          isDropdownOpen: false,
        };

        const author = getItemAuthor(users, el.author);
        const authorAvatar = getItemAuthorAvatar(users, el.author);
        const authorEdited = getItemAuthorEdited(users, el.authorEdited);
        const status = formatTaskStatus(el.status);

        task.id = el._id;
        task.projectId = el.projectId;
        task.name = el.name;
        task.description = el.description;
        task.status = status;
        task.time = el.time;
        task.number = el.number;
        task.executor = el.executor;
        task.author = author;
        task.authorAvatar = authorAvatar;
        task.authorEdited = authorEdited;
        task.dateCreated = el.dateCreated;
        task.dateEdited = el.dateEdited;

        tasks.push(task);
      });

      context.commit('updateAllTasks', tasks);
    })
    .catch((err) => {
      console.log('error', err);
    });
}

export function addTask() {
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
          authorization: `Bearer ${localStorage.getItem('token')}`,
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

export function updateTask(id) {
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
          authorization: `Bearer ${localStorage.getItem('token')}`,
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

export function deleteTask(id) {
  return axios
    .delete(`${url}/tasks/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
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
