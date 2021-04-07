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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Welcome" */ '../views/Welcome.vue'),
  },
  {
    path: '/ErrorPage',
    name: 'ErrorPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Error" */ '../views/Error.vue'),
  },
  {
    path: '/Quiz',
    name: 'Quiz',
    component: () => import(/* webpackChunkName: "Quiz" */ '../views/Quiz.vue'),
  },
  {
    path: '/Finished',
    name: 'Finished',
    component: () => import(/* webpackChunkName: "Finished" */ '../views/Finished.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
