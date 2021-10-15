<template>
<div id="app">
  <v-app>
    <v-dialog v-model="dialog" persistent max-width="50%" min-width="25%" :retain-focus="false">
     <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" > Bienvenido </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" > Cambiar su contraseña </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Finalizar </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" height="200px">
            <v-card-text class="mb-2px">
               <div class="text-h5 text-center"> Le damos la Bienvenida a nuestra Plataforma Seguir con los siguientes pasos </div>
            </v-card-text>
          </v-card>
          <v-btn color="primary" @click="e1 = 2" > Siguiente </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px" >
             <formulario :path="'passwordchange/'+$route.params.token"></formulario>
          </v-card>

          <v-btn color="primary" @click="e1 = 1">Atras </v-btn>
          <v-btn color="primary" @click="e1 = 3" style="margin-left: 10px">Siguiente</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" height="200px" >
          <v-card-text class="mb-2px">
             <div class="text-h5 text-center"> Gracias por seguir con los pasos, Disfrute de su nuesva experiencia</div>
          </v-card-text>
          </v-card>

          <v-btn color="primary"@click="ir()">Finalizar </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    </v-dialog>
  </v-app>
</div>
</template>
<script>
import axios from 'axios'
import Formulario from '../components/view/Contrasenia/Formulario'
export default ({
 components: { Formulario },
  mounted () {
    if (!this.$route.params.token) {
      window.location.href = '/'
    }
  },
  methods: {
    ir() {
      window.location.href = '/'
    }
  },
  data: () => ({
     e1: 1,
     dialog: true,
  })
})
</script>

