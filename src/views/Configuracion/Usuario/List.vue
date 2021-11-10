<template>
<div>


<template v-if="permisosUsuarios[0] ? (permisosUsuarios[0].indexOf('index') == -1) : false">
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
            Usuarios
            <btn
              color="blue"
              fab
              small
              absolute
              right
              link
              exact
              to="/configuracion/usuarios/create"
              texto="Agregar Nuevo Usuario"
              textoIcon="mdi-plus"
              v-if="permisosUsuarios[0] ? (permisosUsuarios[0].indexOf('create') != -1 ? true : false): false"
            >
            </btn>
          </template>
          <v-container class="py-0">
            <search :items="items" :nameItems="nameItems" :valoresBuscar="valoresBuscar" v-on:buscar="buscar" v-on:limipiar="limipiarBuscador" >

            </search>
            <btn
              margenes="margin-bottom: 15px"
              color="success"
              fab
              small
              texto="Exportar Usuario"
              textoIcon="mdi-file-excel-box"
              v-on:accion="exportar"
            >
            </btn>
            <!--btn
              margenes="margin-bottom: 15px; margin-left: 15px"
              color="error"
              fab
              small
              texto="Exportar PDF"
              textoIcon="mdi-file-pdf-box"
              v-on:accion="exportarPDF"
            >
            </btn-->
            <v-simple-table fixed-header style="height: 525px;">
              <thead>
                  <tr>
                    <th class="text-left">Nombre</th>
                    <th class="text-left">Apellidos</th>
                    <th class="text-left">Correo</th>
                    <th class="text-left">Telefono</th>
                    <th class="text-left">Dirección</th>
                    <th class="text-left">Roles</th>
                    <th class="text-left">Opciones</th>
                  </tr>
              </thead>
              <tbody>
                 <tr v-for="dato in usuarios" :key="dato.id">
                    <td class="text-left">{{ dato.nombre }}</td>
                    <td class="text-left">{{ dato.apellido }}</td>
                   <td class="text-left">{{ dato.correo }}</td>
                    <td class="text-left">{{ dato.telefono }}</td>
                    <td class="text-left">{{ dato.direccion }}</td>
                    <td class="text-left">
                       <v-chip
                          class="ma-2"
                          x-small
                          color="green"
                          text-color="white"
                          v-for="role in dato.roles" :key="role.id"
                        >
                          {{ role.nombre }}
                        </v-chip>
                    </td>
                    <td>
                      <btn
                        color="warning"
                        fab
                        small
                        link
                        exact
                        :to="'/configuracion/usuarios/edit/'+dato.idcrypt"
                        texto="Editar Usuario"
                        textoIcon="mdi-account-edit"
                        v-if="permisosUsuarios[0].indexOf('edit') != -1 ? true : false"
                        :idrecibir="dato.id"
                      >
                      </btn>
                      <btn
                        v-if="dato.activo && permisosUsuarios[0].indexOf('desactive') != -1 ? true : false"
                        color="error"
                        fab
                        small
                        texto="Desactivar Usuario"
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
                        texto="Activar Usuario"
                        textoIcon="mdi-check"
                        margenes="margin-left:5px"
                         :idrecibir="dato.id"
                        v-if="!dato.activo && permisosUsuarios[0].indexOf('activate') != -1 ? true : false"
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
import { mapState, mapMutations,mapActions, mapGetters } from 'vuex'
import Pagiante from '../../../components/Layout/App/Pagiante.vue'
import Unauthorized from '../../Unauthorized.vue'
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
          },
          {
            id: '2',
            name: 'Telefono'
          },
          {
            id: '3',
            name: 'Dpi'
          }
        ]
      ],
      nameItems: [
        ['Datos']
      ],
    }
  },
  components: { Snackbar, MaterialCard, Btn, Search, Pagiante, Unauthorized },
  mounted () {
    let url = 'page='+this.page
    this.getUsuarios(url)

     },
  computed: {
    ...mapState('usuario', ['usuarios', 'totalPage', 'page','permisosUsuarios']),
    ...mapState('layout', ['permisovalue']),
  },
  methods: {
    ...mapActions('usuario', ['getUsuarios','eliminarUsuario','activarUsuario','exportarUsuario','exportarUsuarioPDF']),
    paginacion(val) {
      if(this.valoresBuscar.item0 != null){
          var url = 'page='+val+'+&search=true&item0='+this.valoresBuscar.item0+'&datobuscar='+this.valoresBuscar.search
      }else{
         var url = 'page='+val
      }
      this.getUsuarios(url)
    },
    buscar(data) {
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
       this.getUsuarios(url)
    },
    cerrar(){
      this.snackbar = false
      this.colorSnackbar = "dark"
      this.textoSnackbar = null
    },
    eliminar(id){
      this.eliminarUsuario(id).
      then((res) => {
        let url = 'page='+this.page
        this.getUsuarios(url)
      })

    },
    activar(id){
      this.activarUsuario(id).
      then((res) => {
        let url = 'page='+this.page
        this.getUsuarios(url)
      })
    },
    limipiarBuscador(){
      this.valoresBuscar = { item0: null, search: null }
      let url = 'page='+this.page
      this.getUsuarios(url)
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
      this.exportarUsuario(data).
        then((resp) => {
            var fileURL = window.URL.createObjectURL(new Blob([resp.data], {type: 'application/vnd.ms-excel;charset=utf-8'}));
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'usuarios.xlsx');
            document.body.appendChild(fileLink);
            fileLink.click();
      }).
        catch((error) => {
        if(error.response.status == 500){
          this.msgPopup= "Comunicarse con su administrador."
          return
        }
      })
    },
    disabledTest(){
      return false
    }
  }
}
</script>
