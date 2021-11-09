<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="totalpage"
      :total-visible="cantidadPage"
    ></v-pagination>
  </div>
</template>
<script>

export default({
  props: ['totalpage','cantidadPage'],
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
