<template>
<div>
  <template v-if="permisosEmpresas[0] ? (permisosEmpresas[0].indexOf('index') == -1) : true">
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
            Empresas
            <!--btn
              color="blue"
              fab
              small
              absolute
              right
              link
              exact
              to="/configuracion/empresas/create"
              texto="Agregar Nueva Empresa"
              textoIcon="mdi-plus"
              v-if="permisosEmpresas[0] ? (permisosEmpresas[0].indexOf('create') != -1 ? true : false) : false"
            >
            </btn-->
          </template>
          <v-container class="py-0">
            <search :items="items" :nameItems="nameItems" :valoresBuscar="valoresBuscar" v-on:buscar="buscar" v-on:limipiar="limipiarBuscador" ></search>
            <v-simple-table fixed-header style="height: 525px;">
              <thead>
                  <tr>
                    <th class="text-left">Nombre</th>
                    <th class="text-left">Direccion</th>
                    <th class="text-left">Nit</th>
                    <th class="text-left">Telefono</th>
                    <th class="text-left">Activo</th>
                    <th class="text-left">Opciones</th>
                  </tr>
              </thead>
              <tbody>
                 <tr v-for="dato in empresas" :key="dato.id">
                    <td class="text-left">{{ dato.nombre }}</td>
                    <td class="text-left">{{ dato.direccion }}</td>
                    <td class="text-left">{{ dato.nit }}</td>
                    <td class="text-left">{{ dato.telefono }}</td>
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
                        :to="'/configuracion/empresas/edit/'+dato.idcrypt"
                        texto="Editar Empresa"
                        textoIcon="mdi-account-edit"
                        :idrecibir="dato.id"
                        v-if="permisosEmpresas[0].indexOf('edit') != -1 ? true : false"
                      >
                      </btn>
                      <btn
                        v-if="dato.activo && permisosEmpresas[0].indexOf('update') != -1 ? true : false"
                        color="error"
                        fab
                        small
                        texto="Eliminar Empresa"
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
                        texto="Activar Empresa"
                        textoIcon="mdi-check"
                        margenes="margin-left:5px"
                         :idrecibir="dato.id"
                        v-on:accion="activar(dato.id)"
                        v-if="!dato.activo && permisosEmpresas[0].indexOf('update') != -1 ? true : false"
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
    this.getEmpresas(url)
  },
  computed: {
    ...mapState('empresa', ['empresas', 'totalPage', 'page', 'permisosEmpresas'])
  },
  methods: {
    ...mapActions('empresa', ['getEmpresas','eliminarEmpresa','activarEmpresa']),
    paginacion(val) {
      if(this.valoresBuscar.item0 != null){
          var url = 'page='+val+'+&search=true&item0='+this.valoresBuscar.item0+'&datobuscar='+this.valoresBuscar.search
      }else{
         var url = 'page='+val
      }
      this.getEmpresas(url)
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
       this.getEmpresas(url)
    },
    cerrar(){
      this.snackbar = false
      this.colorSnackbar = "dark"
      this.textoSnackbar = null
    },
    eliminar(id){
      this.eliminarEmpresa(id).
      then((res) => {
        let url = 'page='+this.page
        this.getEmpresas(url)
      })

    },
    activar(id){
      this.activarEmpresa(id).
      then((res) => {
        let url = 'page='+this.page
        this.getEmpresas(url)
      })
    },
    limipiarBuscador(){
      this.valoresBuscar = { item0: null, search: null }
      let url = 'page='+this.page
      this.getEmpresas(url)
    }
  }
}
</script>
