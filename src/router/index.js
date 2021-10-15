import Vue from 'vue'
import VueRouter from 'vue-router'
import Principal from '../views/Principal.vue'


import Login from '../views/Login.vue'
import Contrasenia from '../views/Contrasenia.vue'
import Bienvenida from '../views/Bienvenida.vue'
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
import CryptoJS from 'crypto-js'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/contrasenia/:token',
        name: 'contrasenia',
        component: Contrasenia
    },
    {
        path: '/bienvenida/:token',
        name: 'bienvenida',
        component: Bienvenida
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
                name: 'rolescreate',
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'roles/edit/:id',
                component: CreateRoles,
                name: 'rolesedit',
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
                name: 'empresascreate',
                component: CreateEmpresa,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'empresas/edit/:id',
                component: CreateEmpresa,
                name: 'empresasedit',
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
                name: 'usuarioscreate',
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'usuarios/edit/:id',
                component: CreateUser,
                name: 'usuariosedit',
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

    switch (to.name) {
        case 'contrasenia':
            if (validaToken()) {
                //valida que el token no sea nulo retorna true si no es nulo
                const modulo_usuario = getModulos()
                next({ name: modulo_usuario[0][0] })
            } else {
                next()
            }
            break
        case 'bienvenida':
            if (validaToken()) {
              next()
            } else {
                next('/')
            }
            break
        case 'login':
            if (validaToken()) {
                //valida que el token no sea nulo retorna true si no es nulo
                const modulo_usuario = getModulos()
                next({ name: modulo_usuario[0][0] })
            } else {
                next()
            }
            break
        default:

            // si viene cualquier ruta y el token esta nullo lo redirecciona a la vista del login
            if (!validaToken()) {
                next('/')
            } else {
                const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
                    //este requiresAuth todas las rutas lo debe de contener para que valide los permisos si no los va a saltar
                if (requiresAuth) {

                    const modulo_usuario = getModulos()

                    // del storage obtengo los permisos del usuario para validar si tiene o no la url que el usuario selecciono
                    let tiene_permiso = modulo_usuario.filter(function(per) {
                        return per[0].indexOf(to.name) > -1
                    })

                    // si no tiene lo redirecciona a la primera ruta del usuario que tiene permisos
                    if (tiene_permiso.length <= 0) {
                        next({ name: modulo_usuario[0][0] })
                    } else {
                        next()
                    }
                }
            }
            break
    }

})

function validaToken() {
    let key = '111222333444'
        //   items: JSON.parse(this.$CryptoJS.AES.decrypt(localStorage.getItem("usuario"), this.$keyCryp).toString(this.$CryptoJS.enc.Utf8)), //opciones del menu que trae desde el sistema
    const usuarioLogueado = localStorage.getItem("usuario") != undefined ? JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("usuario"), key).toString(CryptoJS.enc.Utf8)) : null
    const token = usuarioLogueado ? usuarioLogueado.token.original.token : null
    if (token != null) {
        return true
    } else {
        return false
    }
}

function getModulos() {
    let key = '111222333444'
    const modulo_usuario = localStorage.getItem("validarpath") != undefined ? JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("validarpath"), key).toString(CryptoJS.enc.Utf8)) : null
    return modulo_usuario
}

export default router
