<template>
  <v-container
    id="icons-view"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <material-card
          color="pink lighten-1"
          full-header
        >
          <template #heading>
            <div class="pa-6 white--text">
              <div class="text-h3 font-weight-light text-center">
                Ventas
              </div>
            </div>
          </template>

          <v-container class="py-0">

            <v-row>
              <v-col cols="12">
                <v-card
                  color="dark"
                  dark
                >
                  <v-card-title class="text-h5">
                    Datos del cliente
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="2">
                        <v-text-field label="Nit"  v-model="venta.nit" />
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field label="Nombre Completo" v-model="venta.nombre" />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-card
                  color="dark"
                  dark
                >
                  <v-card-title class="text-h5">
                    Busqueda de productos
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="2">
                        <v-select style="margin-right: 50px;width:"
                                  :items="['producto','codigo']"
                                  label="Seleccionar Buscador"
                                  v-model="selectbuscar"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-text-field label="Ingrese valor" v-model="textoBuscador" @input="buscarProducto" />
                      </v-col>
                      <v-col cols="12" md="4" v-if="productos.length">
                        <v-autocomplete
                          :items="productos"
                          :item-text="item => 'producto:'+item.nombre+' - Q.'+item.precio+' - stock.'+item.cantidad"
                          :item-value="item => item"
                          chips
                          deletable-chips
                          v-model="productoselected"
                          label="Seleccione el producto"
                          @input="addProducto"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row v-if="venta.detalleVenta.length">
              <v-col cols="12">
                <v-card
                  color="dark"
                  dark
                >
                  <v-card-title class="text-h5">
                    Detalle de la compra
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-simple-table dark fixed-header >
                          <thead>
                            <tr>
                              <th>Producto</th>
                              <th>Cantidad Bodega</th>
                              <th>Precio Bodega</th>
                              <th>Cantidad</th>
                              <th>Pago</th>
                              <th>Eliminar</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="p in venta.detalleVenta">
                              <td v-text="p.nombre"></td>
                              <td v-text="p.cantidad"></td>
                              <td v-text="p.precio"></td>
                              <td>
                                <v-text-field type="number" @input="count(p)" v-model="p.cantidadcompra"/>
                              </td>
                              <td v-text="p.pago"></td>
                              <td>
                                <btn
                                  fab
                                  small
                                  height="44"
                                  width="44"
                                  color="error"
                                  texto="Quitar"
                                  textoIcon="mdi-delete"
                                  v-on:accion="quitar(p)"
                                ></btn>
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colspan="4" class="text-right text-h3">Total a Pagar</td>
                              <td class="text-left text-h3">Q. {{ calcularPago }}</td>
                              <td>
                                <btn
                                  fab
                                  small
                                  height="44"
                                  width="44"
                                  color="blue"
                                  texto="Pagar"
                                  textoIcon="mdi-check"
                                  v-on:accion="pagar"
                                ></btn>
                              </td>
                            </tr>
                          </tfoot>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>

        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from '../../components/view/MaterialCard.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import axios from 'axios'
import Btn from '../../components/Layout/App/Btn'
export default {
  components: { Btn, MaterialCard },
  data: () => ({
    selectbuscar: "producto",
    textoBuscador: null,
    productoselected: null,
    productos: [],
  }),
  computed: {
    ...mapState('ventas',['venta']),
    calcularPago : function (){
      var pago = 0;
      for(var i = 0; i < this.venta.detalleVenta.length; i++){
        pago += this.venta.detalleVenta[i].pago
      }
      this.venta.totalcobrado = pago;
      return pago
    },
  },
  methods: {
    ...mapActions('ventas', ['saveVenta']),
    ...mapMutations('ventas', ['clearVenta']),
    count(object){
     var data =  this.venta.detalleVenta.filter((e) => {
         if(e.id == object.id){
            let pago = e.cantidadcompra * e.precio
            e.pago = pago
         }
         return e
      })
      if(data.length){
        this.venta.detalleVenta = data
      }
    },
    addProducto(){
      if(!this.productoselected){
        return
      }
      if(this.venta.detalleVenta.length){
        var it = this.venta.detalleVenta.filter((e) => {
          return e.id == this.productoselected.id
        })

        if(it.length){
          this.$swal({
            title: "producto ya existe",
            icon: "warning"
          })
          return;
        }
      }

      this.productoselected.cantidadcompra = 1
      this.productoselected.pago = this.productoselected.cantidadcompra * this.productoselected.precio

      this.venta.detalleVenta.push(this.productoselected)
      this.productoselected = null
    },
    quitar (p) {
      this.$swal({
        title: 'Seguro de eliminar el producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
      }).then((result) => {
        if(result.isConfirmed){
          var result = this.venta.detalleVenta.filter((e) => {
            return e.id != p.id
          })
          this.venta.detalleVenta = result;
        }
      })
    },
    pagar () {
      this.$swal({
        title: 'Seguro de confirmar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
      }).then((result) => {
        if(result.isConfirmed){
           console.log(this.venta)
          this.saveVenta(this.venta).
          then((res) => {
              this.clearVenta()
              this.limpiar()
          })
            .catch((e) => {
              if (e.response.status == 401) {
                this.$store.commit("errorCatch", true)
                return
              }
              throw e;
            })
        }
      })
    },
    limpiar(){
      this.selectbuscar = "producto"
      this.textoBuscador= null
      this.productoselected= null
      this.productos= []
    },
    buscarProducto(){
      const url = process.env.VUE_APP_URL_API + '/api/productos/getProductosVenta'
      axios.post(url,{
        'select': this.selectbuscar,
        'texto' : this.textoBuscador
      })
        .then((response) => {
          this.productos = response.data
        })
        .catch((e) => {
          if (e.response.status == 401) {
            this.$store.commit("errorCatch", true)
            return
          }
          throw e;
        })
    }
  }
}
</script>
