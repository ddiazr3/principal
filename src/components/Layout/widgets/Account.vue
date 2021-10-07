<template>
  <v-menu
    bottom
    left
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-list
      :tile="false"
      flat
      nav
    >

      <bar-item
          :key="'0'"
          to="#"
        >
          <v-list-item-title v-text="userLoged.nombreCompleto" />
        </bar-item>
         <v-divider
          :key="`divider-1`"
          class="mb-2 mt-2"
        />
        <bar-item
          :key="'1'"
          to="#"
        >
          <v-list-item-title v-text="'Salir'" @click="salir" />
        </bar-item>
    </v-list>
  </v-menu>
</template>

<script>
import BarItem from '../App/BarItem.vue'
import { mapState } from 'vuex'
export default {
  data: () => ({
    profile: [
      { title: 'Perfil' },
      { divider: true },
      { title: 'Salir' }
    ]
  }),
  components: {
    BarItem
  },
  computed: {
    ...mapState('layout', ['userLoged'])
  },
  methods: {
    salir(){
      this.$store.commit("errorCatch", true)
    }
  }
}
</script>
