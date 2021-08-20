import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import LogIn from '../components/LogIn.vue';
import Welcome from '../views/Welcome.vue';
import Quiz from '../views/Quiz.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn,
  },
  {
    path: '/Welcome',
    name: 'Welcome',
    component: () => import('../views/Welcome.vue'),
  },
  {
    path: '/Quizzes',
    name: 'Quizzes',
    component: () => import('../views/Quizzes.vue'),
  },
  {
    path: '/ErrorPage',
    name: 'ErrorPage',
    component: () => import('../views/Error.vue'),
  },
  {
    path: '/Quiz',
    name: 'Quiz',
    component: () => import('../views/Quiz.vue'),
  },
  {
    path: '/Finished',
    name: 'Finished',
    component: () => import('../views/Finished.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
