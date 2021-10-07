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

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/principal',
        name: 'principal',
        component: Principal,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/configuracion',
        component: Configuracion,
        children: [{
                path: 'roles',
                component: ListRoles,
                name: 'roles',
                meta: {
                  requiresAuth: true
                }
            },
            {
                path: 'roles/create',
                component: CreateRoles,
                name: 'roles-create',
                meta: {
                  requiresAuth: true
                }
            },
            {
                path: 'roles/edit/:id',
                component: CreateRoles,
                name: 'roles-edit',
                meta: {
                  requiresAuth: true
                }
            },
            {
                path: 'empresas',
                component: ListEmpresa,
                name: 'empresas',
                meta: {
                  requiresAuth: true
                }
            },
            {
                path: 'empresas/create',
                name: 'empresas-create',
                component: CreateEmpresa,
                meta: {
                  requiresAuth: true
                }
            },
            {
                path: 'empresas/edit/:id',
                component: CreateEmpresa,
                name: 'empresas-edit',
                meta: {
                  requiresAuth: true
                }
            },
            {
                path: 'usuarios',
                component: ListUser,
                name: 'usuarios',
                meta: {
                  requiresAuth: true
                }
            },
            {
                path: 'usuarios/create',
                component: CreateUser,
                name: 'usuarios-create',
                meta: {
                  requiresAuth: true
                }
            },
            {
                path: 'usuarios/edit/:id',
                component: CreateUser,
                name: 'usuarios-edit',
                meta: {
                  requiresAuth: true
                }
            }
        ]
    }
]

const router = new VueRouter({
    // necesito validar que si el usuairo esta autenticado y ingresa a la ruta del loguin que lo envie a la pagina principal
    routes
})

router.beforeEach((to, from, next) => {

  const modulo_usuario = JSON.parse(localStorage.getItem("validarpath"))
  const usuarioLogueado = localStorage.getItem("usuario") != undefined ? JSON.parse(localStorage.getItem("usuario")) : null
  const token = usuarioLogueado ? usuarioLogueado.token.original.token : null

  //validamos que si viene la ruta del login y tine toke lo redirecciona a la primera ruta de las que tiene permiso el usuario
  if(to.name === 'login' && token != null){
      next(modulo_usuario[0][0])
   }else {
        //validamos que si viene la ruta no es login y no tiene token lo manda a login
        if(to.name != 'login' && token === null){
         window.location.href = '/'
        }else{

            const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
          //este requiresAuth todas las rutas lo debe de contener para que valide los permisos si no los va a saltar
            if(requiresAuth){

              // del storage obtengo los permisos del usuario para validar si tiene o no la url que el usuario selecciono
               let tiene_permiso = modulo_usuario.filter(function (per) {
                 return per[0].indexOf(to.name) > -1
               })
              // si no tiene lo redirecciona a la primera ruta del usuario que tiene permisos
                if(tiene_permiso.length <= 0) {
                  next(modulo_usuario[0][0])
                }
            }else{
              // si no es requerida la ruta lo redirecciona al loguin y vuelve a validar lo del inicio
              next('/')
            }
        }
  }
  next()
})

export default router
