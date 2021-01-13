import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'Loguin'}
  },
  {
    path: '/loguin',
    name: 'Loguin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Loguin.vue')
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/editar',
    name: 'Editar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "editar" */ '../views/Editar.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '*',
    redirect: {name: 'Loguin'}
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  let usuario = firebase.auth().currentUser; // traemos la información del usuario conextado en el momento, si no hay usuario, será null.
  let login = to.matched.some(result => result.meta.requiresAuth); //buscamos cual ruta tiene activo un meta

  if (!usuario && login) {
    next({name: 'Login'}); // si la ruta tiene activo el meta y no hay usuario conectado en el sistema, no se deje ingresar a la ruta y se envia a login.
  } else if(usuario && !login) {
    next();
  } else {
    next();
  }
});


export default router
