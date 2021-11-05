<template>
<v-row>
  <v-col cols="12" md="12">
    <v-card>
      <v-card-actions>
        <v-checkbox
          class="checkbox-role"
          label="Seleccionar Todos"
          v-model="seleccionarTodos"
          @change="seleccionar"
        ></v-checkbox>
     </v-card-actions>
      <v-expand-transition>
        <div>
          <v-divider></v-divider>
          <v-card-text>
            <v-simple-table dense>
              <thead>
                <tr>
                  <th>Seleccionar</th>
                  <th>Producto</th>
                  <th>Precio Bodega</th>
                  <th>Cantidad Bodega</th>
                  <th>Precio PV</th>
                  <th>Cantidad PV</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="producto in productos" :key="producto.id">
                  <td>
                    <v-checkbox
                      class="checkbox-role"
                      v-model="producto.checked"
                      :value="producto.checked"
                    ></v-checkbox>
                  </td>
                  <td v-text="producto.nombre"></td>
                  <td v-text="producto.precioBodega"></td>
                  <td v-text="producto.stockBodega"></td>
                  <td>
                    <v-text-field  v-if="producto.checked"
                                   v-model="producto.precio"
                                   :rules="textNumberRules"
                    />
                    <v-text-field v-else
                                  v-model="producto.precio"
                    />
                  </td>
                  <td>
                    <v-text-field v-if="producto.checked"
                      v-model="producto.cantidad"
                      :rules="textNumberRules"
                    />
                    <v-text-field v-else
                      v-model="producto.cantidad"
                    />
                  </td>

                </tr>
              </tbody>
            </v-simple-table>

         </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    textNumberRules:[
      v => !!v || 'Campo es requerido',
      v => (v && v > 0) || 'Valor mayor a 0',
      v => /[0-9]/.test(v) || 'El campo es de tipo numerico',
    ],
    seleccionarTodos: false,
  }),
  props: {
    productos: {
      type: Array,
      default: null
    }
  },
  methods: {
    seleccionar() {
       if(this.seleccionarTodos){
         this.productos.filter(elem =>{
            elem.checked = true
         })
       }else{
         this.productos.filter(elem =>{
           elem.checked = false
         })
       }
    }
  }
}
</script>
<style scoped>
.checkbox-role {
  margin-top: 0px;
}
</style>
