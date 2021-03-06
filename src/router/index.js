import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/new-notice',
    name: 'NewNotice',
    component: () => import('../views/NewNotice.vue')
  },
  {
    path: '/edit-notice/:id',
    name: 'EditNotice',
    component: () => import('../views/EditNotice.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
