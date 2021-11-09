<template>
  <v-container
    id="icons-view"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col cols="12" md="12">
        <material-card
          color="pink lighten-1"
          full-header
        >
          <template #heading>
            <div class="pa-6 white--text">
              <div class="text-h3 font-weight-light text-center">
                Abastecer los productos activos
              </div>
            </div>
          </template>
          <v-container class="py-0">
            <v-row>
              <v-col cols="12">
                <v-card
                  dark
                >
                  <v-card-title class="text-h5">
                    Busqueda de productos
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="4">
                        <autocomplete :valores="proveedores" :idselect="'1'" @actualizarvalor="actualizarvalor" :label="'Proveedores'" v-bind:clear="clear"></autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <autocomplete :valores="categorias" :idselect="'2'" @actualizarvalor="actualizarvalor" :label="'Categorias'"  v-bind:clear="clear"></autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <autocomplete :valores="marcas" :idselect="'3'" @actualizarvalor="actualizarvalor" :label="'Marcas'"  v-bind:clear="clear"></autocomplete>
                      </v-col>
                      <v-col cols="12" md="4" v-if="this.lineashow.length > 0">
                        <autocomplete :valores="lineashow" :idselect="'4'" @actualizarvalor="actualizarvalor" :label="'Lineas'"  v-bind:clear="clear"></autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <btn
                          margenes="margin-bottom:15px"
                          fab
                          small
                          height="44"
                          width="44"
                          color="blue"
                          texto="Buscar"
                          textoIcon="mdi-magnify"
                          v-on:accion="buscar"
                        ></btn>
                        <btn
                          margenes="margin-left:5px;margin-bottom:15px"
                          fab
                          small
                          height="44"
                          width="44"
                          color="success"
                          texto="Limpiar"
                          textoIcon="mdi-broom"
                          v-on:accion="limpiar"
                        ></btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="2">
                <v-select style="margin-right: 50px;width:"
                          :items="['producto','cantidad']"
                          label="Seleccionar Buscador"
                          v-model="selectbuscar"
                ></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Buscar"
                  append-icon="mdi-magnify"
                  v-model="buscarP"
                  @input="buscarProducto"
                />
              </v-col>

            </v-row>
            <v-simple-table dark fixed-header style="height: 525px;" v-if="produsctoshow.length">
              <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Proveedor</th>
                <th>Categoria</th>
                <th>Marca</th>
                <th>Linea</th>
                <th>Agregar</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="p in produsctoshow">
                <td v-text="p.nombre"></td>
                <td v-text="p.precio.precio"></td>
                <td v-text="p.stock.cantidad"></td>
                <td v-text="p.proveedor ? p.proveedor.nombre : ''"></td>
                <td v-text="p.categoria ? p.categoria.nombre : ''"></td>
                <td v-text="p.marca ? p.marca.nombre : ''"></td>
                <td v-text="p.linea ? p.linea.nombre : ''"></td>
                <td>
                  <btn
                    fab
                    small
                    height="44"
                    width="44"
                    color="blue"
                    texto="Agregar"
                    textoIcon="mdi-plus"
                    v-on:accion="agregar(p)"
                  ></btn>
                </td>
              </tr>
              </tbody>
            </v-simple-table>
            <paginate-object v-if="produsctoshow.length" :totalpage="totalpage" :cantidadPage="cantidadPage" v-on:cambiopagina="paginacion"></paginate-object>
            <v-col cols="auto">
              <v-dialog
                transition="dialog-bottom-transition"
                v-model="dialog"
                max-width="600"
              >
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="primary" dark>
                      Producto: {{ productoseleccionado ? productoseleccionado.nombre : '' }},
                      Cantidad: {{ productoseleccionado.stock ? productoseleccionado.stock.cantidad : '' }},
                      Precio: {{ productoseleccionado.precio ? productoseleccionado.precio.precio : '' }}
                    </v-toolbar>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field label="Cantidad" type="number" v-model="productocantidad" />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field label="Precio" type="number" v-model="productoprecio" />
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn
                        text
                        @click="agregarDetalle"
                      >Agregar</v-btn>
                      <v-btn
                        text
                        @click="cerrarDialogo"
                      >Cerrar</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>

          </v-container>
        </material-card>
      </v-col>
    </v-row>
    <dialogo :dialog="dialogoPopup" :color="colorPopup" :title="titlePopup" :msg="msgPopup" @cerrarPopup="dialogoPopup = false"></dialogo>
  </v-container>
</template>

<script>
import MaterialCard from '../../components/view/MaterialCard.vue'
import Autocomplete from '../../components/Layout/App/Autocomplete'
import Btn from '../../components/Layout/App/Btn'
import Dialogo from '../../components/Layout/App/Dialogo'
import PaginateObject from '../../components/Layout/App/PaginateObject'
import axios from 'axios'
import { mapMutations, mapState } from 'vuex'
export default {
  components: { Btn, MaterialCard,Autocomplete, Dialogo,PaginateObject },
  data: () => ({
      dialogoPopup: false,
      colorPopup: "primary",
      titlePopup: "",
      msgPopup: "",
      selectbuscar: "producto",
      buscarP: null,
      produsctoshow : [],
      totalpage: 0,
      cantidadPage: 3,
      page: 1,
      proveedores : [],
      categorias: [],
      lineashow: [],
      lineas: [],
      marcas: [],
      proveedorid : null,
      categoriaid: null,
      marcaid: null,
      lineaid: null,
      productos: [],
      clear: false,
      dialog : false,

      productoseleccionado: [],
      productocantidad: 0,
      productoprecio: 0,

  }),
  mounted () {
    this.catalogos();
  },

  watch: {
    marcaid: function (val) {
      this.lineashow = []
      this.setLoading(true)
      setTimeout(() => {
        var l = this.lineas.filter((ele) => {
          return ele.marcaid == val
        })

        if(l.length > 0){
          this.lineashow = l
        }else{
          this.lineashow = []
        }
        this.setLoading(false)
      },1000)

    },
    page: function (val) {
      var p = this.productos
      this.produsctoshow = p.slice((this.page - 1) * this.cantidadPage,this.page * this.cantidadPage);
    }
  },
  computed: {
    ...mapState('compras',['compra'])
  },

  methods:{
    ...mapMutations(['setLoading']),
    buscarProducto(){
      if(this.buscarP == null || this.buscarP.length < 1){
        this.resetTable();
        return
      }

      var pr = [];

      pr = this.productos.filter(elem =>{

        if(this.selectbuscar == 'producto'){
          return elem.nombre.indexOf(this.buscarP) > -1;
        }
        if(this.selectbuscar == 'cantidad'){
          console.log(elem.stock)
          return elem.stock.cantidad == this.buscarP;
        }
      })

      if(pr.length > 0){
        this.produsctoshow = pr;
        this.totalpage  = Math.ceil(this.produsctoshow.length / this.cantidadPage);
      }else{
       this.resetTable()
      }
    },
    resetTable (){
      this.totalpage  = Math.ceil(this.productos.length / this.cantidadPage);
      var p = this.productos
      this.produsctoshow = p.slice((this.page - 1) * this.cantidadPage,this.page * this.cantidadPage);
    },
    paginacion(val) {
      this.page = val
    },
    agregar(p){
      this.dialog = true
      this.productoseleccionado = p
    },
    cerrarDialogo(){
      this.dialog = false
      this.productoseleccionado = []
      this.productocantidad = 0
      this.productoprecio = 0
    },
    agregarDetalle(){
      if(this.compra.detalleCompras.length){
        var it = this.compra.detalleCompras.filter((e) => {
          return e.id == this.productoseleccionado.id
        })

        if(it.length){
          this.dialogoPopup= true
          this.colorPopup= "error"
          this.titlePopup= "Aviso.."
          this.msgPopup= "Producto ya esta registrado"
          return;
        }
      }

      let detalle = {
        "producto" : this.productoseleccionado.nombre,
        "id" : this.productoseleccionado.id,
        "cantidad": this.productocantidad,
        "precio" : this.productoprecio,
        "pago" : this.productocantidad * this.productoprecio
      }
      this.compra.detalleCompras.push(detalle)

      this.cerrarDialogo()
    },
    actualizarvalor(v){
      this.clear = false
      if(v.idselect == 1){ this.proveedorid = v.value }
      if(v.idselect == 2){ this.categoriaid = v.value }
      if(v.idselect == 3){ this.marcaid = v.value }
      if(v.idselect == 4){ this.lineaid = v.value }
    },
    buscar(){
      const url = process.env.VUE_APP_URL_API + '/api/productos/getProductos'
      axios.post(url,{
        'proveedorid': this.proveedorid,
        'categoriai' : this.categoriai,
        'marcaid': this.marcaid,
        'lineaid': this.lineaid
      })
        .then((response) => {
          this.productos = response.data
          this.totalpage  = Math.ceil(this.productos.length / this.cantidadPage);
          var p = this.productos
          this.produsctoshow = p.slice((this.page - 1) * this.cantidadPage,this.page * this.cantidadPage);

        })
        .catch((e) => {
          if (e.response.status == 401) {
            this.$store.commit("errorCatch", true)
            return
          }
          throw e;
        })
    },
    limpiar(){
        window.location.reload()

    },
    catalogos () {
      const url = process.env.VUE_APP_URL_API + '/api/compras'
      axios.get(url)
        .then((response) => {
          this.proveedores = response.data.proveedores
          this.categorias = response.data.categorias
          this.marcas = response.data.marcas
          this.lineas = response.data.lineas
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
