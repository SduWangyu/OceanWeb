import { createRouter, createWebHistory} from 'vue-router'


import AuthLayout from  '../layout/auth-layout'
import AdminLayout from '../layout/admin-layout'
const routes = [
  {
    path:'/login',
    name:'login',
    component: () => import('../views/auth/login/login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/auth/login/login.vue')
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('../views/auth/login/login.vue'),
      },
    ],
  },
  {
    name:'admin',
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        name: 'overview',
        path: 'overview',
        component: () => import('../views/admin/overview/Overview.vue'),
      },
      {
        name:'devdata',
        path:'devdata',
        component: () => import('../views/admin/dataCenter/devDataView')
      },
      {
        name:'devhistorydata',
        path: 'devhistorydata',
        component: () => import('../views/admin/dataCenter/historyDataView')
      }

    ],
  }]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
