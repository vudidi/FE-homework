import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Tasks from '@/views/Tasks.vue';
import TaskDetail from '@/views/TaskDetail.vue';
import Users from '@/views/Users.vue';
import Auth from '@/views/Auth.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks,
  },
  {
    path: '/tasks/:id',
    name: 'task-detail',
    component: TaskDetail,
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('auth');

  if (to.name === 'users' && isAuth === 'false') next({ name: 'auth' });
  else next();
});

export default router;
