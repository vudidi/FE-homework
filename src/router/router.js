import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login/Login.vue';
import Projects from '@/views/Projects/Projects.vue';
import Tasks from '@/views/Tasks/Tasks.vue';
import CreateTask from '@/views/CreateTask/CreateTask.vue';
// import Users from '@/views/Users/Users.vue';
import UsersVuex from '@/views/UsersVuex/UsersVuex.vue';
import CreateUser from '@/views/CreateUser/CreateUser.vue';
import NotFound from '@/views/NotFound/NotFound.vue';
import TaskLayout from '@/components/Layouts/TaskLayout.vue';
import ProjectLayout from '@/components/Layouts/ProjectLayout.vue';
import UserLayout from '@/components/Layouts/UserLayout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/projects',
    component: ProjectLayout,
    children: [
      {
        path: '',
        name: 'projects',
        component: Projects,
      },
    ],
  },
  {
    path: '/tasks',
    component: TaskLayout,
    children: [
      {
        path: '',
        name: 'tasks',
        component: Tasks,
      },
      {
        path: 'create',
        name: 'tasks-create',
        component: CreateTask,
      },
    ],
  },
  {
    path: '/users',
    component: UserLayout,
    children: [
      { path: '', name: 'users', component: UsersVuex },
      {
        path: 'create',
        name: 'user-create',
        component: CreateUser,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

// router.beforeEach((to, from, next) => {
//   const isAuth = localStorage.getItem('auth');

//   if (to.name === 'users' && isAuth === 'false') next({ name: 'auth' });
//   else next();
// });

export default router;
