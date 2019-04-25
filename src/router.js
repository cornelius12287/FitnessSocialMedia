import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MyFriends from './views/MyFriends.vue';
import MyActivities from './views/MyActivities.vue';
import MyGoals from './views/MyGoals.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import {Globals} from '@/models/api';

Vue.use(Router);

function gaurd(to, from, next){
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/MyFriends',
      name: 'myfriends',
      component: MyFriends,
    },
    {
      path: '/MyActivities',
      name: 'myactivities',
      component: MyActivities,
    },
    {
      path: '/MyGoals',
      name: 'mygoals',
      component: MyGoals,
    },
    {
      path: '/Register',
      name: 'register',
      component: Register,
      },
    {
      path: '/Login',
      name: 'login',
      component: Login,
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log({ to, from });
  const publicRoutes = ['home', 'login', 'register', 'myfriends'];
  if(!publicRoutes.includes(to.name) && !Globals.user){
    Globals.redirectRoute = { name: to.name, path: to.path, params: to.params, query: to.query, hash: to.hash }
    return next('login');
  }
  next();
})

export default router;
