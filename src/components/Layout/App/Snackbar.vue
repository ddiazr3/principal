<template>
  <v-snackbar
    v-model="snackbar"
    :multi-line="true"
    :color="colorSnackbar"
    absolute
    centered
    rounded="pill"
    top
  >
    {{ textoSnackbar }}
    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="this.$emit('cerrar')"
      >
        <v-icon>mdi-minus-circle</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    props: ['colorSnackbar','textoSnackbar','snackbar']
  }
</script>
