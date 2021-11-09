<template>
  <div>
    <v-autocomplete
      v-model="values"
      :items="items"
      item-text="nombre"
      item-value="id"
      outlined
      dense
      chips
      small-chips
      :label="label"
    ></v-autocomplete>
  </div>
</template>
<script>


export default({
  props: ['idselect', 'valores', 'label','clear'],
  data: () => ({
      items: [],
      values : null
  }),
  mounted () {
    setTimeout(() => {
      this.items = this.valores
    },1000)
  },
  watch: {
    values: function (val) {
      this.$emit('actualizarvalor',{ value: this.values, idselect: this.idselect })
    },
    clear: function (val){
      this.values = null
    }
  }
})
</script>
