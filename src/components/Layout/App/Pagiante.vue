<template>
  <div class="text-center">
      <v-pagination
        v-model="page"
        :length="length"
        :total-visible="10"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      >
      </v-pagination>
  </div>
</template>
<script>

import { mapActions } from 'vuex'

export default({
  props: ['length'],
  data: () => ({
    page: 1,
  }),
  watch: {
    page: function (val) {
      this.$emit('cambiopagina', val)
    }
  }
})
</script>
