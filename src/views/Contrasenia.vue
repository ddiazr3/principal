<template>
  <div id="app">
    <v-app>
      <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px" :retain-focus="false">
        <div>
          <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
            <v-tab>
              <div class="caption py-1">Contrasenia Nueva</div>
            </v-tab>
            <v-tab-item>
              <formulario :path="'passwordchange/'+$route.params.token"></formulario>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-dialog>
    </v-app>
  </div>
</template>
<script>

import Formulario from '../components/view/Contrasenia/Formulario'

export default ({
  mounted () {
    if (!this.$route.params.token) {
      window.location.href = '/'
    }
  },
  components: {
    Formulario
  },
  data: () => ({
    tab: 0,
    dialog: true,
    verify: ''
  })
})
</script>

