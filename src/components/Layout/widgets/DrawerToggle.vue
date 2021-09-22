<template>
  <v-btn
    class="ml-3 mr-4"
    elevation="1"
    fab
    small
    @click="minis"
  >
    <v-icon>
      {{ mini ? 'mdi-format-list-bulleted' : 'mdi-dots-vertical' }}
    </v-icon>
  </v-btn>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('layout', ['mini'])
  },
  methods: {
    ...mapMutations('layout', ['minis'])
  }
}
</script>
