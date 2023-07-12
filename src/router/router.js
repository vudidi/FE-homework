import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login/Login.vue';
import Projects from '@/views/Projects/Projects.vue';
import Tasks from '@/views/Tasks/Tasks.vue';
import CreateTask from '@/views/CreateTask/CreateTask.vue';
import Users from '@/views/Users/Users.vue';
import Profile from '@/views/Profile/Profile.vue';
import CreateUser from '@/views/CreateUser/CreateUser.vue';
import NotFound from '@/views/NotFound/NotFound.vue';
import TaskLayout from '@/components/Layouts/TaskLayout.vue';
import ProjectLayout from '@/components/Layouts/ProjectLayout.vue';
import UsersLayout from '@/components/Layouts/UsersLayout.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: 'projects',
      query: {
        page: 1,
        field: 'dateCreated',
        type: 'desc',
        filter: null,
      },
    },
  },
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
    component: UsersLayout,
    children: [
      { path: '', name: 'users', component: Users },
      {
        path: 'profile/:id',
        name: 'user-profile',
        component: Profile,
        props: true,
      },
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
    beforeEnter: (to, from, next) => {
      store.dispatch('fetchCurrentUser');
      const isAuth = localStorage.getItem('isAuth');
      if (to.name === 'login' && isAuth === 'true') {
        next({ name: 'projects' });
      } else next();
    },
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

router.beforeEach((to, from, next) => {
  store.dispatch('fetchCurrentUser');
  const isAuth = localStorage.getItem('isAuth');
  if (to.name !== 'login' && isAuth === 'false') next({ name: 'login' });
  else next();
});

export default router;
