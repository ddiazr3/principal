import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Principal from '../views/Principal.vue'

import Configuracion from '../views/Configuracion/Configuracion.vue'
import Usuario from '../views/Configuracion/Usuario.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/principal',
    name: 'Principal',
    component: Principal
  },
  {
    path: '/configuracion',
    component: Configuracion,
    children: [
      {
        path: 'usuarios',
        component: Usuario
      },
      {
        path: 'roles',
        component: Home
      },
      {
        path: 'empresas',
        component: Home
      },
      {
        path: 'modulos',
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
