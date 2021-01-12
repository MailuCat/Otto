import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store';




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
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  
  {

    path: '/editar',
    name: 'Editar',
    meta: {
      login: true
      },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "editar" */ '../views/Editar.vue')
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
  let user = store.getters.enviandoUser;
  let requiredAuth = to.matched.some(res => res.meta.requiredAuth);

  if (!user && requiredAuth) {
    next({name: 'Loguin'});
  } else if(user && !requiredAuth){
    next();
  } else {
    next();
  }
})




export default router
