import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Principal from '../views/Principal.vue'

import Configuracion from '../views/Configuracion/Configuracion.vue'

// rutas de usuarios
import ListUser from '../views/Configuracion/Usuario/List.vue'
import CreateUser from '../views/Configuracion/Usuario/Create.vue'

// rutas de roles
import ListRoles from '../views/Configuracion/Roles/List.vue'
import CreateRoles from '../views/Configuracion/Roles/Create.vue'
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
        component: ListUser
      },
      {
        path: 'usuarios/create',
        component: CreateUser
      },
      {
        path: 'usuarios/edit/:id',
        component: CreateUser
      },
      {
        path: 'roles',
        component: ListRoles
      },
      {
        path: 'roles/create',
        component: CreateRoles
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
