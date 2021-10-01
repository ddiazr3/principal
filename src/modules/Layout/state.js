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
  items: [
    {
      title: 'Principal',
      icon: 'mdi-view-dashboard',
      to: '/principal'
    },
    {
      title: 'Configuración',
      icon: 'mdi-cog-outline',
      items: [
        {
          title: 'Roles',
          icon: 'mdi-key',
          to: '/configuracion/roles'
        },
        {
          title: 'Usuarios',
          icon: 'mdi-account',
          to: '/configuracion/usuarios'
        },
        {
          title: 'Empresas',
          icon: 'mdi-align-vertical-bottom',
          to: '/configuracion/empresas'
        }
      ]
    }
  ]
  /* items: [
    {
      title: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/'
    },
    {
      title: 'User Profile',
      icon: 'mdi-account',
      to: '/components/profile/'
    },
    {
      title: 'Regular Tables',
      icon: 'mdi-clipboard-outline',
      to: '/tables/regular/'
    },
    {
      title: 'Typography',
      icon: 'mdi-format-font',
      to: '/components/typography/'
    },
    {
      title: 'Icons',
      icon: 'mdi-chart-bubble',
      to: '/components/icons/'
    },
    {
      title: 'Google Maps',
      icon: 'mdi-map-marker',
      to: '/maps/google/'
    },
    {
      title: 'Notifications',
      icon: 'mdi-bell',
      to: '/components/notifications/'
    }
  ]
  */
}
