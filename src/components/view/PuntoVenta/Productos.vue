<template>
<v-row>
  <v-col cols="12" md="12">
    <v-card>
      <v-card-actions>
        <v-btn
          color="green lighten-2"
          text
        >
         Elegir Productos Para el punto de venta
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-expand-transition>
        <div>
          <v-divider></v-divider>
          <v-card-text>
            <v-checkbox  v-for="producto in productos" :key="producto.id"
              class="checkbox-role"
              v-model="productosPuntoVenta"
              :label="producto.nombre"
              :value="producto.id"
            ></v-checkbox>
         </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    productos: {
      type: Array,
      default: null
    },
    productosPuntoVenta:{
      type: Array,
      default: []
    },
  }
}
</script>
<style scoped>
.checkbox-role {
  margin-top: 0px;
}
</style>
