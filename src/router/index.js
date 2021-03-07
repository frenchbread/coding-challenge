import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: require('../components/home.vue').default
  },
  {
    path: '/create',
    name: 'create',
    component: require('../components/create.vue').default
  },
  {
    path: '/login',
    name: 'login',
    component: require('../components/login.vue').default
  },
  {
    path: '/edit/:id/:text',
    name: 'edit',
    component: require('../components/edit.vue').default
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default new Router({ routes })
