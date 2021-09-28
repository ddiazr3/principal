<template>
<div>
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
            >
            </btn>
          </template>
          <v-container class="py-0">
            <search :items="items" :nameItems="nameItems" :valoresBuscar="valoresBuscar" v-on:buscar="buscar" >

            </search>
            <v-simple-table fixed-header>
              <thead>
                  <tr>
                    <th class="text-left">Nombre</th>
                    <th class="text-left">Apellidos</th>
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
                    <td class="text-left">{{ dato.direccion }}</td>
                    <td class="text-left">{{ dato.nombre }}</td>
                    <td class="text-left">
                       <v-chip
                          class="ma-2"
                          x-small
                          color="green"
                          text-color="white"
                        >
                          Adminitrador
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
                        :idrecibir="dato.id"
                        v-on:accion="eliminar"
                      >
                      </btn>
                      <btn
                        color="error"
                        fab
                        small
                        texto="Eliminar Usuario"
                        textoIcon="mdi-delete-forever"
                        margenes="margin-left:5px"
                         :idrecibir="dato.id"
                        v-on:accion="eliminar"
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
                        v-on:accion="eliminar"
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
  </v-container>
  </div>
</template>
<script>
import Btn from '../../../components/Layout/App/Btn.vue'
import Search from '../../../components/Layout/widgets/Search.vue'
import MaterialCard from '../../../components/view/MaterialCard.vue'
import { mapState, mapActions } from 'vuex'
import Pagiante from '../../../components/Layout/App/Pagiante.vue'

export default {
  data () {
    return {
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
  components: { MaterialCard, Btn, Search, Pagiante },
  mounted () {
    let url = 'page='+this.page
    this.getUsuarios(url)
  },
  computed: {
    ...mapState('usuario', ['usuarios', 'totalPage', 'page'])
  },
  methods: {
    ...mapActions('usuario', ['getUsuarios']),
    paginacion(val) {
      if(this.valoresBuscar.item0 != null){
          var url = 'page='+val+'+&search=true&item0='+this.valoresBuscar.item0+'&datobuscar='+this.valoresBuscar.search
      }else{
         var url = 'page='+val
      }
      this.getUsuarios(url)
    },
    buscar(data) {
      let url = 'page=1&search=true&item0='+this.valoresBuscar.item0+'&datobuscar='+this.valoresBuscar.search
       this.getUsuarios(url)
    },
    eliminar(id){
      console.log("elimar al ID "+id)
    }
  }
}
</script>
