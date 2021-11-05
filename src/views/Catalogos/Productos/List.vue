<template>
<div>
  <template v-if="permisosProductos[0] ? (permisosProductos[0].indexOf('index') == -1) : true">
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
            Productos
            <btn
              color="blue"
              fab
              small
              absolute
              right
              link
              exact
              to="/catalogos/productos/create"
              texto="Agregar Nuevo Producto "
              textoIcon="mdi-plus"
              v-if="permisosProductos[0] ? (permisosProductos[0].indexOf('create') != -1 ? true : false) : false"
            >
            </btn>
          </template>
          <v-container class="py-0">
            <search :items="items" :nameItems="nameItems" :valoresBuscar="valoresBuscar" v-on:buscar="buscar" v-on:limipiar="limipiarBuscador" ></search>
            <v-row>
              <v-col cols="12" md="1" class="text-left">
                <btn
                  margenes="margin-top: 12px"
                  color="success"
                  fab
                  small
                  texto="Exportar Producto"
                  textoIcon="mdi-file-excel-box"
                  v-on:accion="exportar"
                >
                </btn>

              </v-col>
              <v-col
                cols="12"
                md="3"
                class="text-right"
              >
                <v-file-input
                  accept=".xlsx"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-file-excel-outline"
                  label="Archivo Excel"
                >
                </v-file-input>
              </v-col>
              <v-col
                cols="12"
                md="1"
                class="text-left"
              >
                <btn
                  margenes="margin-left: 0px;margin-top: 12px"
                  color="blue"
                  fab
                  small
                  texto="Subir Archivo"
                  textoIcon="mdi-cloud-upload-outline"
                  v-on:accion="subir"
                >
                </btn>
              </v-col>
            </v-row>
            <v-simple-table fixed-header style="height: 525px;">
              <thead>
                  <tr>
                    <th class="text-left">Producto</th>
                    <th class="text-left">Descripción</th>
                    <th class="text-left">Código</th>
                    <th class="text-left">Cantidad</th>
                    <th class="text-left">Precio</th>
                    <th class="text-left">Marca</th>
                    <th class="text-left">Linea</th>
                    <th class="text-left">Proveedor</th>
                    <th class="text-left">Categoria</th>
                     <th class="text-left">Estado</th>
                    <th class="text-left">Opciones</th>
                  </tr>
              </thead>
              <tbody>
                 <tr v-for="dato in productos" :key="dato.id">
                    <td class="text-left">{{ dato.nombre }}</td>
                    <td class="text-left">{{ dato.descripcion }}</td>
                    <td class="text-left">{{ dato.codigo }}</td>
                    <td class="text-left"  v-text="dato.stock ? dato.stock.cantidad : '' "></td>
                    <td class="text-left"  v-text="dato.precio ? dato.precio.precio : '' "></td>
                    <td class="text-left" v-text="dato.marca ? dato.marca.nombre : '' "></td>
                    <td class="text-left" v-text="dato.linea ? dato.linea.nombre : '' "></td>
                    <td class="text-left" v-text="dato.proveedor ? dato.proveedor.nombre : '' "></td>
                    <td class="text-left" v-text="dato.categoria ? dato.categoria.nombre : '' "></td>
                    <td class="text-left">
                       <v-chip
                         v-if="dato.activo"
                          class="ma-2"
                          x-small
                          color="green"
                          text-color="white"
                        >
                         Activo
                        </v-chip>
                        <v-chip
                         v-else
                          class="ma-2"
                          x-small
                          color="error"
                          text-color="white"
                        >
                          Inactivo
                        </v-chip>
                    </td>
                    <td>
                      <btn
                        color="warning"
                        fab
                        small
                        link
                        exact
                        :to="'/catalogos/productos/edit/'+dato.idcrypt"
                        texto="Editar Producto"
                        textoIcon="mdi-account-edit"
                        :idrecibir="dato.id"
                        v-if="permisosProductos[0].indexOf('edit') != -1 ? true : false"
                      >
                      </btn>
                      <btn
                        v-if="dato.activo && permisosProductos[0].indexOf('desactive') != -1 ? true : false"
                        color="error"
                        fab
                        small
                        texto="Desactivar Producto"
                        textoIcon="mdi-delete-forever"
                        margenes="margin-left:5px"
                         :idrecibir="dato.id"
                        v-on:accion="eliminar(dato.id)"
                      >
                      </btn>
                      <btn
                        color="success"
                        fab
                        small
                        texto="Activar Producto"
                        textoIcon="mdi-check"
                        margenes="margin-left:5px"
                         :idrecibir="dato.id"
                        v-if="!dato.activo && permisosProductos[0].indexOf('activate') != -1 ? true : false"
                        v-on:accion="activar(dato.id)"
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
    <snackbar :colorSnackbar="colorSnackbar" :snackbar="snackbar" :textoSnackbar="textoSnackbar" @cerrar="cerrar"></snackbar>
  </v-container>
  </template>
  </div>
</template>
<script>
import Btn from '../../../components/Layout/App/Btn.vue'
import Search from '../../../components/Layout/widgets/Search.vue'
import MaterialCard from '../../../components/view/MaterialCard.vue'
import { mapState, mapActions } from 'vuex'
import Pagiante from '../../../components/Layout/App/Pagiante.vue'
import Unauthorized from '../../Unauthorized'
import Snackbar from '../../../components/Layout/App/Snackbar'

export default {
  data () {
    return {
      snackbar: false,
      colorSnackbar: "dark",
      textoSnackbar: null,
      // van a ver itemN porque se utilizan para los select
      // para search habran N tambiern porque seran los de cajas de texto de busqueda
      valoresBuscar: {
        item0: null,
        search: null
      },
      // para el buscador la primera poscion va el nombre del titulo
      items: [
        [
          {
            id: '1',
            name: 'Nombre'
          }
        ]
      ],
      nameItems: [
        ['Datos']
      ],
    }
  },
  components: { Snackbar, Unauthorized, MaterialCard, Btn, Search, Pagiante },
  mounted () {

    //JSON.parse(this.$CryptoJS.AES.decrypt(localStorage.getItem("usuario"), this.$keyCryp).toString(this.$CryptoJS.enc.Utf8)),
    var us = JSON.parse(this.$CryptoJS.AES.decrypt(localStorage.getItem("usuario"), this.$keyCryp).toString(this.$CryptoJS.enc.Utf8))

    if(us.idsRoles.indexOf(1) != -1){
      this.mostrarBTN = true
    }

    let url = 'page='+this.page
    this.getProductos(url)
  },
  computed: {
    ...mapState('producto', ['productos', 'totalPage', 'page', 'permisosProductos'])
  },
  methods: {
    ...mapActions('producto', ['getProductos','eliminarProductos','activarProducto','exportarProducto']),
    paginacion(val) {
      if(this.valoresBuscar.item0 != null){
          var url = 'page='+val+'+&search=true&item0='+this.valoresBuscar.item0+'&datobuscar='+this.valoresBuscar.search
      }else{
         var url = 'page='+val
      }
      this.getProductos(url)
    },
    buscar() {
      this.snackbar = false
      this.colorSnackbar = ""
      this.textoSnackbar = null
      if(this.valoresBuscar.item0 == null && this.valoresBuscar.search  == null){
        this.snackbar = true
        this.colorSnackbar = "error"
        this.textoSnackbar = "No hay información a buscar"
        return
      }
      let url = 'page=1&search=true&item0='+this.valoresBuscar.item0+'&datobuscar='+this.valoresBuscar.search
       this.getProductos(url)
    },
    cerrar(){
      this.snackbar = false
      this.colorSnackbar = "dark"
      this.textoSnackbar = null
    },
    eliminar(id){
      this.eliminarProductos(id).
      then((res) => {
        let url = 'page='+this.page
        this.getProductos(url)
      })

    },
    activar(id){
      this.activarProducto(id).
      then((res) => {
        let url = 'page='+this.page
        this.getProductos(url)
      })
    },
    limipiarBuscador(){
      this.valoresBuscar = { item0: null, search: null }
      let url = 'page='+this.page
      this.getProductos(url)
    },
    exportar(){
      var data = {
        item0 : null,
        datobuscar: null,
        search: null
      }
      if(this.valoresBuscar.item0 != null && this.valoresBuscar.search != null){
        data.search = true
        data.datobuscar = this.valoresBuscar.search
        data.item0 = this.valoresBuscar.item0
      }
      this.exportarProducto(data).
      then((resp) => {
        var fileURL = window.URL.createObjectURL(new Blob([resp.data], {type: 'application/vnd.ms-excel;charset=utf-8'}));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'productos.xlsx');
        document.body.appendChild(fileLink);
        fileLink.click();

      }).
      catch((error) => {
        console.log("reporno del api error")
        console.log(error)
      })
    },
    subir(){

    }
  }
}
</script>
