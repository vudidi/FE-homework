import { clickNavProjects, clickNavTasks } from './utils/onClickNavBtn.js';
import getToken from './api/getToken.js';
import {
  addProjectXML,
  addProjectFetch,
  addProjectAxios,
} from './api/addProjects.js';
import {
  getProjectsXML,
  getProjectsFetch,
  getProjectsAxios,
} from './api/getProjects.js';
import {
  updateProjectXML,
  updateProjectFetch,
  updateProjectAxios,
} from './api/updateProjects.js';
import {
  deleteProjectXML,
  deleteProjectFetch,
  deleteProjectAxios,
} from './api/deleteProjects.js';
import { addTaskXML, addTaskFetch, addTaskAxios } from './api/addTasks.js';
import { getTasksXML, getTasksFetch, getTasksAxios } from './api/getTasks.js';
import {
  updateTaskXML,
  updateTaskFetch,
  updateTaskAxios,
} from './api/updateTasks.js';
import {
  deleteTaskXML,
  deleteTaskFetch,
  deleteTaskAxios,
} from './api/deleteTasks.js';
import {
  projectsBtn,
  tasksBtn,
  addPjXMLBtn,
  addPjFetchBtn,
  addPjAxiosBtn,
  getPjXMLBtn,
  getPjFetchBtn,
  getPjAxiosBtn,
  updatePjXMLBtn,
  updatePjFetchBtn,
  updatePjAxiosBtn,
  deletePjXMLBtn,
  deletePjFetchBtn,
  deletePjAxiosBtn,
  addTaskXMLBtn,
  addTaskFetchBtn,
  addTaskAxiosBtn,
  getTaskXMLBtn,
  getTaskFetchBtn,
  getTaskAxiosBtn,
  updateTaskXMLBtn,
  updateTaskFetchBtn,
  updateTaskAxiosBtn,
  deleteTaskXMLBtn,
  deleteTaskFetchBtn,
  deleteTaskAxiosBtn,
} from './utils/constants.js';

const url = 'http://45.12.239.156:8081/api';

getToken(url);

// Навигация
projectsBtn.addEventListener('click', () => {
  clickNavProjects();
});

tasksBtn.addEventListener('click', () => {
  clickNavTasks();
});

// ПРОЕКТЫ

// Добавить проект
addPjXMLBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  addProjectXML(url, token);
});

addPjFetchBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  addProjectFetch(url, token);
});

addPjAxiosBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  addProjectAxios(url, token);
});

// Получить список проектов
getPjXMLBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  getProjectsXML(url, token);
});

getPjFetchBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  getProjectsFetch(url, token);
});

getPjAxiosBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  getProjectsAxios(url, token);
});

// Редактировать проект
updatePjXMLBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  const projectId = localStorage.getItem('ProjectXML');
  if (projectId) {
    updateProjectXML(url, token, projectId);
  } else {
    console.log('Проектов XML нет');
  }
});

updatePjFetchBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  const projectId = localStorage.getItem('ProjectFetch');

  if (projectId) {
    updateProjectFetch(url, token, projectId);
  } else {
    console.log('Проектов Fetch нет');
  }
});

updatePjAxiosBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  const projectId = localStorage.getItem('ProjectAxios');

  if (projectId) {
    updateProjectAxios(url, token, projectId);
  } else {
    console.log('Проектов Axios нет');
  }
});

// Удалить проект
deletePjXMLBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  const projectId = localStorage.getItem('ProjectXML');

  if (projectId) {
    deleteProjectXML(url, token, projectId);
  } else {
    console.log('Проектов XML нет');
  }
});

deletePjFetchBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  const projectId = localStorage.getItem('ProjectFetch');

  if (projectId) {
    deleteProjectFetch(url, token, projectId);
  } else {
    console.log('Проектов Fetch нет');
  }
});

deletePjAxiosBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  const projectId = localStorage.getItem('ProjectAxios');

  if (projectId) {
    deleteProjectAxios(url, token, projectId);
  } else {
    console.log('Проектов Axios нет');
  }
});

// ЗАДАЧИ

// Добавить задачу
addTaskXMLBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  addTaskXML(url, token);
});

addTaskFetchBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  addTaskFetch(url, token);
});

addTaskAxiosBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  addTaskAxios(url, token);
});

// Получить список задач
getTaskXMLBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  getTasksXML(url, token);
});

getTaskFetchBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  getTasksFetch(url, token);
});

getTaskAxiosBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  getTasksAxios(url, token);
});

// Редактировать задачу
updateTaskXMLBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  const taskId = localStorage.getItem('TaskXML');
  if (taskId) {
    updateTaskXML(url, token, taskId);
  } else {
    console.log('Задач XML нет');
  }
});

updateTaskFetchBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  const taskId = localStorage.getItem('TaskFetch');

  if (taskId) {
    updateTaskFetch(url, token, taskId);
  } else {
    console.log('Задач Fetch нет');
  }
});

updateTaskAxiosBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  const taskId = localStorage.getItem('TaskAxios');

  if (taskId) {
    updateTaskAxios(url, token, taskId);
  } else {
    console.log('Задач Axios нет');
  }
});

// Удалить задачу
deleteTaskXMLBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  const taskId = localStorage.getItem('TaskXML');

  if (taskId) {
    deleteTaskXML(url, token, taskId);
  } else {
    console.log('Проектов XML нет');
  }
});

deleteTaskFetchBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  const taskId = localStorage.getItem('TaskFetch');

  if (taskId) {
    deleteTaskFetch(url, token, taskId);
  } else {
    console.log('Проектов Fetch нет');
  }
});

deleteTaskAxiosBtn.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  const taskId = localStorage.getItem('TaskAxios');

  if (taskId) {
    deleteTaskAxios(url, token, taskId);
  } else {
    console.log('Проектов Axios нет');
  }
});
