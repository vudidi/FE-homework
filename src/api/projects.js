import axios from 'axios';
import { getAllUsers } from '@/api/users';
import {
  getItemAuthor,
  getItemAuthorEdited,
} from '@/helpers/getItemAuthorInfo';
import { getPagPages } from '@/helpers/getPagPages';

const url = 'http://45.12.239.156:8081/api';

function getAllProjects(params) {
  return axios.post(
    `${url}/projects/search`,
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

export function getProjects(context, params) {
  context.commit('SET_PR_LOADING', true);

  const users = [];

  getAllUsers(params)
    .then((res) => {
      users.push(...res.data.users);
    })
    .then(() => {
      getAllProjects(params)
        .then((res) => {
          const projects = [];

          res.data.projects.forEach((el) => {
            const project = {
              id: '',
              name: '',
              author: '',
              authorId: '',
              authorEdited: '',
              code: '',
              dateCreated: '',
              dateEdited: '',
              isDropdownOpen: false,
            };

            const author = getItemAuthor(users, el.author);
            const authorEdited = getItemAuthorEdited(users, el.authorEdited);

            project.id = el._id;
            project.name = el.name;
            project.author = author;
            project.authorId = el.author;
            project.authorEdited = authorEdited;
            project.code = el.code;
            project.dateCreated = el.dateCreated;
            project.dateEdited = el.dateEdited;

            projects.push(project);
          });

          context.commit('SET_PR_LOADING', false);
          context.commit('SET_PROJECTS', projects);
          context.commit(
            'SET_TOTAL_PR_PAGES',
            getPagPages(res.data.total, params.page)
          );
        })
        .catch((err) => {
          context.commit('SET_PR_LOADING', false);
          console.log('error', err);
        });
    })
    .catch((err) => {
      context.commit('SET_PR_LOADING', false);
      console.log('error', err);
    });
}

// export function addProject() {
//   return axios
//     .post(
//       `${url}/projects`,
//       {
//         name: 'Project 5',
//         code: 'code#74563432',
//       },
//       {
//         headers: {
//           authorization: `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     )
//     .then((res) => {
//       console.log('ProjectAxios', res.data);
//     })
//     .catch((err) => {
//       console.log('error', err);
//     });
// }

// export function updateProject(id) {
//   return axios
//     .put(
//       `${url}/projects`,
//       {
//         name: 'updatedProjectAxios',
//         code: 'code#74563432',
//         _id: id,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     )
//     .then((res) => {
//       console.log('updatedProjectAxios', res.data);
//     })
//     .catch((err) => {
//       console.log('error', err);
//     });
// }

function deleteItem(params) {
  return axios.delete(`${url}/projects/${params.id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
}

export function deleteProject(context, params) {
  context.commit('SET_PR_LOADING', true);

  deleteItem(params)
    .then((res) => {
      console.log(res.data);
    })
    .then(() => {
      getProjects(context, params);
    })
    .catch((err) => {
      context.commit('SET_PR_LOADING', false);
      console.log('error', err);
    });
}

export function searchProjects(context, params) {
  context.commit('SET_PR_LOADING', true);
  const users = [];

  getAllUsers(params)
    .then((res) => {
      users.push(...res.data.users);
    })
    .then(() => {
      getAllProjects(params)
        .then((res) => {
          if (res.data.projects.length < 1) {
            context.commit('SET_PR_LOADING', false);
            context.commit('SET_PR_SEARCH_RESULT', false);
            console.log('noRes');
          } else {
            context.commit('SET_PR_SEARCH_RESULT', true);
            console.log('Res');
            const projects = [];

            res.data.projects.forEach((el) => {
              const project = {
                id: '',
                name: '',
                author: '',
                authorId: '',
                authorEdited: '',
                code: '',
                dateCreated: '',
                dateEdited: '',
                isDropdownOpen: false,
              };

              const author = getItemAuthor(users, el.author);
              const authorEdited = getItemAuthorEdited(users, el.authorEdited);

              project.id = el._id;
              project.name = el.name;
              project.author = author;
              project.authorId = el.author;
              project.authorEdited = authorEdited;
              project.code = el.code;
              project.dateCreated = el.dateCreated;
              project.dateEdited = el.dateEdited;

              projects.push(project);
            });

            context.commit('SET_PR_LOADING', false);
            context.commit('SET_PROJECTS', projects);
            context.commit(
              'SET_TOTAL_PR_PAGES',
              getPagPages(res.data.total, params.page)
            );
          }
        })
        .catch((err) => {
          context.commit('SET_PR_LOADING', false);
          console.log('error', err);
        });
    })
    .catch((err) => {
      context.commit('SET_PR_LOADING', false);
      console.log('error', err);
    });
}
