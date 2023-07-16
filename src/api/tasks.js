import axios from 'axios';
import { getAllUsers } from '@/api/users';
import {
  getItemAuthor,
  getItemAuthorAvatar,
  getItemAuthorEdited,
} from '@/helpers/getItemAuthorInfo';
import formatTaskStatus from '@/helpers/formatTaskStatus';
import { getPagPages } from '@/helpers/getPagPages';

const url = 'http://45.12.239.156:8081/api';

export function getAllTasks(params) {
  return axios.post(
    `${url}/tasks/search`,
    {
      page: params.page,
      limit: 10,
      sort: params.sort,
      filter: params.filter,
    },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

export function getTasks(context, params) {
  context.commit('SET_TS_LOADING', true);

  const users = [];

  getAllUsers()
    .then((res) => {
      users.push(...res.data.users);
    })
    .then(() => {
      getAllTasks(params)
        .then((res) => {
          const tasks = [];

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
              authorId: '',
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
            task.authorId = el.author;
            task.authorEdited = authorEdited;
            task.dateCreated = el.dateCreated;
            task.dateEdited = el.dateEdited;

            if (authorAvatar !== null) {
              task.authorAvatar = `http://45.12.239.156:8081/${authorAvatar}`;
            } else {
              task.authorAvatar = null;
            }

            tasks.push(task);
          });

          context.commit('SET_TS_LOADING', false);
          context.commit('SET_TASKS', tasks);
          context.commit(
            'SET_TOTAL_TS_PAGES',
            getPagPages(res.data.total, params.page)
          );
        })
        .catch((err) => {
          context.commit('SET_TS_LOADING', false);
          console.log('error', err);
        });
    })
    .catch((err) => {
      context.commit('SET_TS_LOADING', false);
      console.log('error', err);
    });
}

function addItem(params) {
  return axios.post(
    `${url}/tasks`,
    {
      name: params.name,
      description: params.description,
      projectId: params.projectId,
      executor: params.executor,
    },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

export function addTask(context, params) {
  context.commit('SET_TS_LOADING', true);

  addItem(params)
    .then((res) => {
      console.log(res.data);
    })
    .then(() => {
      getTasks(context, params);
    })
    .catch((err) => {
      context.commit('SET_TS_LOADING', false);
      console.log('error', err);
    });
}

function deleteItem(params) {
  return axios.delete(`${url}/tasks/${params.id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
}

export function deleteTask(context, params) {
  context.commit('SET_TS_LOADING', true);

  deleteItem(params)
    .then((res) => {
      console.log(res.data);
    })
    .then(() => {
      getTasks(context, params);
    })
    .catch((err) => {
      context.commit('SET_TS_LOADING', false);
      console.log('error', err);
    });
}

export function searchTasks(context, params) {
  context.commit('SET_TS_LOADING', true);
  const users = [];

  getAllUsers()
    .then((res) => {
      users.push(...res.data.users);
    })
    .then(() => {
      getAllTasks(params)
        .then((res) => {
          console.log(params);
          if (res.data.tasks.length < 1) {
            context.commit('SET_TS_LOADING', false);
            context.commit('SET_TS_SEARCH_RESULT', false);
          } else {
            const tasks = [];

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
                authorId: '',
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
              task.authorId = el.author;
              task.authorEdited = authorEdited;
              task.dateCreated = el.dateCreated;
              task.dateEdited = el.dateEdited;

              if (authorAvatar !== null) {
                task.authorAvatar = `http://45.12.239.156:8081/${authorAvatar}`;
              } else {
                task.authorAvatar = null;
              }

              tasks.push(task);
            });

            context.commit('SET_TS_LOADING', false);
            context.commit('SET_TASKS', tasks);
            context.commit(
              'SET_TOTAL_TS_PAGES',
              getPagPages(res.data.total, params.page)
            );
          }
        })
        .catch((err) => {
          context.commit('SET_TS_LOADING', false);
          console.log('error', err);
        });
    })
    .catch((err) => {
      context.commit('SET_TS_LOADING', false);
      console.log('error', err);
    });
}
