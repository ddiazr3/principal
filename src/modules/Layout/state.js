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
  images: [
    'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-2.jpg',
    'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-3.jpg',
    'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-4.jpg'
  ],
  sales: [
    {
      country: 'USA',
      flag: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/US.png',
      salesInM: 2920
    },
    {
      country: 'Germany',
      flag: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/DE.png',
      salesInM: 1300
    },
    {
      country: 'Australia',
      flag: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/AU.png',
      salesInM: 760
    },
    {
      country: 'United Kingdom',
      flag: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/GB.png',
      salesInM: 690
    },
    {
      country: 'Romania',
      flag: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/RO.png',
      salesInM: 600
    },
    {
      country: 'Brasil',
      flag: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/flags/BR.png',
      salesInM: 550
    }
  ],
  notifications: [],
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
          title: 'Usuarios',
          icon: 'mdi-account',
          to: '/configuracion/usuarios'
        },
        {
          title: 'Roles',
          icon: 'mdi-key',
          to: '/configuracion/roles'
        },
        {
          title: 'Empresas',
          icon: 'mdi-align-vertical-bottom',
          to: '/configuracion/empresas'
        },
        {
          title: 'Modulos',
          icon: 'mdi-application-brackets-outline',
          to: '/configuracion/modulos'
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
