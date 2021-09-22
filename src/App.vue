<template>
  <div id="app">
      <!--router-link to="/">Home</!--router-link> |
        <router-link to="/about">About</router-link -->
         <v-fade-transition mode="out-in">
          <v-app>
            <v-main>
               <v-container fluid>
                 <Header></Header>
                 <Nav></Nav>
                 <Contentenido></Contentenido>
                 <Footer/>
               </v-container>
            </v-main>
          </v-app>
      </v-fade-transition>
  </div>
</template>
<script>
import '@/styles/overrides.sass'
import Header from '@/components/Layout/Header'
import Nav from '@/components/Layout/Nav'
import Contentenido from '@/components/Layout/Content'
import Footer from './components/Layout/Footer.vue'

export default {
  components: {
    Header,
    Nav,
    Contentenido,
    Footer
  }
}
</script>
