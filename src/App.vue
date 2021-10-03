<template>
  <div id="app">
      <!--router-link to="/">Home</!--router-link> |
        <router-link to="/about">About</router-link -->
        <loading :active.sync="loading"/>

        <template v-if="isLogged">
          <v-fade-transition mode="out-in" >
              <v-app>
                <v-main>
                  <v-container fluid>
                    <Header></Header>
                    <Nav></Nav>
                    <Contentenido></Contentenido>
                  </v-container>
                </v-main>
              </v-app>
          </v-fade-transition>
        </template>

        <template v-else>
          <!--Por si en su momento quiero agregar una ruta que no pase por el menu puedo validarlo con el nombre que viene de la ruta $route.path y asi poder mostrar el componente de la vista que quiera-->
           <login></login>
        </template>


  </div>
</template>
<script>
import '@/styles/overrides.sass'
import Header from '@/components/Layout/Header'
import Nav from '@/components/Layout/Nav'
import Contentenido from '@/components/Layout/Content'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapState } from 'vuex'
import Login from './views/Login.vue'

export default {
  components: {
    Header,
    Nav,
    Contentenido,
    Loading,
    Login
  },
  computed:{
    ...mapState(['loading']),
     ...mapState('layout',['isLogged'])
  },
  created () {
    /**
     * Con esto mantenemos escuchando cualquier evento que venga de cualquier lado
     * */
    // this.$socket.on('message-post', function (data){})
  },
  methods: {
    /**
     * Con este metodo solo hacemos la prueba del emit hacien el socket server
     * */
    // probar() {
    //  this.$socket.emit('messageget', "enviado desde vue con vuex")
    // }
  }
}
</script>
