import axios from 'axios';
import store from '@/store';
import {
  getItemAuthor,
  getItemAuthorEdited,
} from '@/helpers/getItemAuthorInfo';
import { getPagPages } from '@/helpers/getPagPages';

const url = 'http://45.12.239.156:8081/api';

export function getProjects(context, page, filter) {
  axios
    .post(
      `${url}/projects/search`,
      {
        page: page,
        limit: 10,
        sort: {
          field: 'dateCreated',
          type: 'asc',
        },
        filter: filter,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      const projects = [];
      const users = store.getters.allUsers;

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

      context.commit('updateAllProjects', projects);
      context.commit('getTotalPages', getPagPages(res.data.total, page));
    })
    .catch((err) => {
      console.log('error', err);
    });
}

export function addProject() {
  return axios
    .post(
      `${url}/projects`,
      {
        name: 'ProjectAxios',
        code: 'code#74563432',
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      console.log('ProjectAxios', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}

export function updateProject(id) {
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
          authorization: `Bearer ${localStorage.getItem('token')}`,
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

export function deleteProject(token, id) {
  return axios
    .delete(`${url}/projects/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
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
