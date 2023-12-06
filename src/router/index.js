import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Verify from '../views/Verify.vue'
import Create from '../views/Create.vue'
import Overview from '../views/Overview.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/verify',
    name: 'verify',
    component: Verify
  },
  {
    path: '/create',
    name: 'create',
    component: Create
  },
  {
    path: '/overview',
    name: 'overview',
    component: Overview
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
