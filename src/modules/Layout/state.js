// app.js
export default {
    namespaced: true,
    inicialOne: 'Sis.',
    inicialTwo: 'Control',
    drawerImage: false,
    mini: false,
    dark: true,
    drawer: true,
    drawerApp: {
        image: 0,
        gradient: 0,
        mini: false
    },
    gradients: [
        'rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
        'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)',
        'rgba(244, 67, 54, 0.8), rgba(244, 67, 54, 0.8)'
    ],
    rtl: false,
    /*items: [{
            title: 'Principal',
            icon: 'mdi-view-dashboard',
            to: '/principal'
        },
        {
            title: 'Configuración',
            icon: 'mdi-cog-outline',
            items: [{
                    title: 'Empresas',
                    icon: 'mdi-align-vertical-bottom',
                    to: '/configuracion/empresas'
                },
                {
                    title: 'Roles',
                    icon: 'mdi-key',
                    to: '/configuracion/roles'
                },
                {
                    title: 'Usuarios',
                    icon: 'mdi-account',
                    to: '/configuracion/usuarios'
                }
            ]
        }
    ],*/


    items: JSON.parse(localStorage.getItem("modulo")), //opciones del menu que trae desde el sistema

    userLoged: JSON.parse(localStorage.getItem("usuario")), //datos del usuario mas su token de peticiones y sus roles que tiene asignado

    isLogged: localStorage.getItem("bool"), // para validarlo que si este logueado en algunas rutas

    permisosGet: JSON.parse(localStorage.getItem("permisosGet")),

    permisovalue: { //para buscar por la ruta el nombre del botton si se muestra
        to: null,
        permiso: null
    }
}