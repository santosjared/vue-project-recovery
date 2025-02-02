import { createRouter, createWebHistory } from 'vue-router'
import EmpleadoView from '../views/EmpleadoView.vue'

const routes = [
  {
    path: '/',
    name: 'Empleados',
    component: EmpleadoView
  },
  {
    path: '/vehiculos',
    name: 'Vehiculos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Vehiculo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
