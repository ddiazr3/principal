<template>
  <div>
    <template v-if="permisosCompra[0] ? (permisosCompra[0].indexOf('index') == -1) : true">

      <unauthorized></unauthorized>
    </template>
    <template v-else>

      <v-container
        id="user-profile-view"
        fluid
        tag="section"
      >
        <v-row justify="center">
          <v-col
            cols="12"
            md="12"
          >
            <material-card
              color="primary"
              icon="mdi-account-outline"
            >
              <template #title>
                Reporte Compras
              </template>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="2">
                    <v-text-field type="date" label="Fecha Inicio" v-model="buscar.fechainicio"/>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field type="date" label="Fecha Fin" v-model="buscar.fechafin"/>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-autocomplete
                      :items="estadosCompra"
                      item-text="nombre"
                      item-value="id"
                      label="Estados"
                      v-model="buscar.estadoid"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2">
                    <btn
                      color="pink"
                      fab
                      small
                      texto="Buscar Compra"
                      textoIcon="mdi-magnify"
                      v-on:accion="buscarCompra"

                    />
                    <btn
                      margenes="margin-left:15px"
                      fab
                      small
                      color="success"
                      texto="Limpiar"
                      textoIcon="mdi-broom"
                      v-on:accion="limipiarBuscador"
                    ></btn>
                    <btn
                      margenes="margin-left: 15px"
                      color="success"
                      fab
                      small
                      texto="Exportar Venta"
                      textoIcon="mdi-file-excel-box"
                      v-on:accion="exportar"
                    >
                    </btn>
                  </v-col>
                </v-row>
                <v-simple-table fixed-header style="height: 525px;">
                  <thead>
                  <tr>
                    <th class="text-left">Fecha Compra</th>
                    <th class="text-left">Pago</th>
                    <th class="text-left">Usuario Compra</th>
                    <th class="text-left">Estado Compra</th>
                    <th class="text-left">Detalle</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="dato in compras" :key="dato.id">
                    <td class="text-left">{{ dato.fechacompra }}</td>
                    <td class="text-left">{{ dato.totalpagado }}</td>
                    <td class="text-left">{{ dato.usuariocreacion.nombre }}</td>
                    <td class="text-left">{{ dato.estado.nombre }}</td>
                    <td>
                      <btn
                        color="warning"
                        fab
                        small
                        texto="Detalle"
                        textoIcon="mdi-cart"
                        :idrecibir="dato.id"
                        v-on:accion="detalle(dato.detalle)"
                      >
                      </btn>
                    </td>
                  </tr>
                  </tbody>
                </v-simple-table>
                <pagiante :length="totalPage" v-on:cambiopagina="paginacion"></pagiante>
              </v-container>
            </material-card>
          </v-col>
        </v-row>

        <div class="text-center">
          <v-dialog
            v-model="dialogDetalle"
            width="500"
          >
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Detalle de la Compra
              </v-card-title>
              <v-card-text style="margin-top: 15px">
                <v-simple-table dense>
                  <thead>
                  <tr>
                    <th v-text="'Producto'"></th>
                    <th v-text="'Cantidad'"></th>
                    <th v-text="'Precio'"></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="dv in detalleCompra">
                    <td v-text="dv.producto.nombre"></td>
                    <td v-text="dv.cantidad"></td>
                    <td v-text="dv.precio"></td>
                  </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="cerrarDialogo"
                >
                  Aceptar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <snackbar :colorSnackbar="colorSnackbar" :snackbar="snackbar" :textoSnackbar="textoSnackbar" @cerrar="cerrar"></snackbar>
      </v-container>
    </template>
  </div>
</template>
<script>
import Btn from '../../components/Layout/App/Btn'
import Search from '../../components/Layout/widgets/Search.vue'
import MaterialCard from '../../components/view/MaterialCard.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import Pagiante from '../../components/Layout/App/Pagiante.vue'
import Unauthorized from '../Unauthorized'
import Snackbar from '../../components/Layout/App/Snackbar'
import InfoFormat from '../../components/Layout/App/InfoFormat'

export default {
  data () {
    return {
      // van a ver itemN porque se utilizan para los select
      // para search habran N tambiern porque seran los de cajas de texto de busqueda
      snackbar: false,
      colorSnackbar: "dark",
      textoSnackbar: null,
      dialogDetalle: false,
      detalleCompra : [],
    }
  },
  components: { Snackbar, Unauthorized, MaterialCard, Btn, Search, Pagiante,InfoFormat },
  mounted () {

    //JSON.parse(this.$CryptoJS.AES.decrypt(localStorage.getItem("usuario"), this.$keyCryp).toString(this.$CryptoJS.enc.Utf8)),
    var us = JSON.parse(this.$CryptoJS.AES.decrypt(localStorage.getItem("usuario"), this.$keyCryp).toString(this.$CryptoJS.enc.Utf8))

    if(us.idsRoles.indexOf(1) != -1){
      this.mostrarBTN = true
    }

    let url = 'page='+this.page

    this.getCompras(url)
  },
  computed: {
    ...mapState('reportecompras', ['compras', 'totalPage', 'page','buscar', 'permisosCompra','estadosCompra'])
  },
  methods: {
    ...mapActions('reportecompras', ['getCompras','exportarCompra']),
    ...mapMutations('reportecompras',['limpiarCompras']),
    ...mapMutations(['setLoading']),
    detalle(data){
     this.dialogDetalle = true
     this.detalleCompra = data
    },
    cerrarDialogo(){
      this.dialogDetalle = false
      this.detalleCompra = []
    },
    paginacion(val) {
      if(this.buscar.estadoid == 0 && this.buscar.fechainicio == null && this.buscar.fechafin == null ){
        var url = 'page='+val
      }else{
        var url = 'page='+val+'+&search=true&estadoid='+this.buscar.estadoid+'&fechainicio='+this.buscar.fechainicio+'&fechafin='+this.buscar.fechafin
      }

      this.getCompras(url)
    },
    cerrar(){
      this.snackbar = false
      this.colorSnackbar = "dark"
      this.textoSnackbar = null
    },
    buscarCompra() {
      this.snackbar = false
      this.colorSnackbar = ""
      this.textoSnackbar = ""

      if(this.buscar.estadoid == 0 && this.buscar.fechainicio == null && this.buscar.fechafin == null ){
        return
      }

      let url = 'page=1&search=true&estadoid='+this.buscar.estadoid+'&fechainicio='+this.buscar.fechainicio+'&fechafin='+this.buscar.fechafin

      this.getCompras(url)
    },
    limipiarBuscador(){
      this.limpiarCompras()

      let url = 'page=1'
      this.getCompras(url)
    },
    exportar(){

      if(this.buscar.estadoid == 0 && this.buscar.fechainicio == null && this.buscar.fechafin == null){
        this.buscar.search = false
      }else{
        this.buscar.search = true
      }

      this.setLoading(true)
      this.exportarCompra(this.buscar).
      then((resp) => {
        var fileURL = window.URL.createObjectURL(new Blob([resp.data], {type: 'application/vnd.ms-excel;charset=utf-8'}));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'compras.xlsx');
        document.body.appendChild(fileLink);
        fileLink.click();

      }).
      catch((error) => {
        console.log("reporno del api error")
        console.log(error)
      }).finally((f) =>{
        this.setLoading(false)
      })
    },
  }
}
</script>
