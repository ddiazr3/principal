<template>
  <v-list-item class="mb-0 justify-space-between pl-3">
    <v-list-item-avatar>
      <v-img
        :src="
          require('@/assets/vmd.svg')"
      />
    </v-list-item-avatar>

    <v-list-item-content class="pl-2">
      <v-list-item-title class="text-h3">
        <strong class="mr-1 font-weight-black">{{ inicialOne }}</strong>

        <span class="primary--text">{{ inicialTwo }}</span>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
// Utilities
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('layout', ['inicialOne', 'inicialTwo'])
  }
}
</script>
