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
        <v-spacer></v-spacer>
        <v-select style="margin-right: 50px;width:"
          :items="['producto','precio','cantidad']"
          label="Seleccionar Buscador"
                  v-model="selectbuscar"
        ></v-select>
        <v-text-field
         label="Buscar"
         append-icon="mdi-magnify"
         v-model="buscar"
         @input="buscarProducto"
        />
        </v-text-field>
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
                <tr v-for="producto in produsctoshow" :key="producto.id">
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
            <paginate-object :totalpage="totalpage" :cantidadPage="cantidadPage" v-on:cambiopagina="paginacion"></paginate-object>
         </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-col>
  </v-row>
</template>

<script>
import PaginateObject from '../../Layout/App/PaginateObject'
export default {
  data: () => ({
    textNumberRules:[
      v => !!v || 'Campo es requerido',
      v => (v && v > 0) || 'Valor mayor a 0',
      v => /[0-9]/.test(v) || 'El campo es de tipo numerico',
    ],
    seleccionarTodos: false,

    //datos para el buscador incluyendo la paginaciòn
    buscar: null,
    selectbuscar: 'producto',
    produsctoshow : null,
    totalpage: 0,
    cantidadPage: 10,
    page: 1
  }),
  props: {
    productos: {
      type: Array,
      default: null
    }
  },
  components: { PaginateObject },
  watch: {
    page: function (val) {
      var p = this.productos
      this.produsctoshow = p.slice((this.page - 1) * this.cantidadPage,this.page * this.cantidadPage);
     }
  },
  mounted () {
    setTimeout(() => {
      this.totalpage  = Math.ceil(this.productos.length / this.cantidadPage);
      var p = this.productos
      this.produsctoshow = p.slice((this.page - 1) * this.cantidadPage,this.page * this.cantidadPage);
    }, 1000);
   },
  methods: {
    paginacion(val) {
      this.page = val
    },
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
    },
    buscarProducto(){

      if(this.buscar == null || this.buscar.length < 1){
        this.produsctoshow = this.productos
        return
      }
      var pr = [];
      pr = this.produsctoshow.filter(elem =>{

        if(this.selectbuscar == 'producto'){
          return elem.nombre.indexOf(this.buscar) > -1;
        }
        if(this.selectbuscar == 'cantidad'){
          return elem.cantidad == this.buscar
        }
        if(this.selectbuscar == 'precio'){
          return elem.precio == this.buscar
        }
      })

      if(pr.length > 0){
        this.produsctoshow = pr;
      }else{
        this.produsctoshow = this.productos
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
