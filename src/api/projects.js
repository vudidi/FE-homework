import axios from 'axios';

const url = 'http://45.12.239.156:8081/api';

export function getProjects(context) {
  return axios
    .post(
      `${url}/projects/search`,
      {
        page: 1,
        limit: 10,
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

      res.data.projects.forEach((el) => {
        const project = {
          id: '',
          name: '',
          author: '',
          authorEdited: '',
          code: '',
          dateCreated: '',
          dateEdited: '',
          isDropdownOpen: false,
        };

        project.id = el._id;
        project.name = el.name;
        project.author = el.author;
        project.authorEdited = el.authorEdited;
        project.code = el.code;
        project.dateCreated = el.dateCreated;
        project.dateEdited = el.dateEdited;

        projects.push(project);
      });

      context.commit('updateAllProjects', projects);
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
      localStorage.setItem('ProjectAxios', res.data._id);
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
