import Vue from 'vue'
import VueRouter from 'vue-router'
import Principal from '../views/Principal.vue'


import Login from '../views/Login.vue'

import Configuracion from '../views/Configuracion/Configuracion.vue'

// rutas de usuarios
import ListUser from '../views/Configuracion/Usuario/List.vue'
import CreateUser from '../views/Configuracion/Usuario/Create.vue'

// rutas de roles
import ListRoles from '../views/Configuracion/Roles/List.vue'
import CreateRoles from '../views/Configuracion/Roles/Create.vue'

// rutas de empresas
import ListEmpresa from '../views/Configuracion/Empresa/List.vue'
import CreateEmpresa from '../views/Configuracion/Empresa/Create.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/principal',
        name: 'Principal',
        component: Principal
    },
    {
        path: '/configuracion',
        component: Configuracion,
        children: [{
                path: 'roles',
                component: ListRoles
            },
            {
                path: 'roles/create',
                component: CreateRoles
            },
            {
                path: 'roles/edit/:id',
                component: CreateRoles
            },
            {
                path: 'empresas',
                component: ListEmpresa
            },
            {
                path: 'empresas/create',
                component: CreateEmpresa
            },
            {
                path: 'empresas/edit/:id',
                component: CreateEmpresa
            },
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
            }
        ]
    }
]

const router = new VueRouter({
    // necesito validar que si el usuairo esta autenticado y ingresa a la ruta del loguin que lo envie a la pagina principal
    routes
})

export default router
