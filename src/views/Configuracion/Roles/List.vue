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
          icon="mdi-key"
        >
          <template #title>
            Roles
            <btn
              color="blue"
              fab
              small
              absolute
              right
              link
              exact
              to="/configuracion/roles/create"
              texto="Agregar Nuevo Rol"
              textoIcon="mdi-plus"
            >
            </btn>
          </template>
          <v-container class="py-0">
            <search :items="items" :nameItems="nameItems" :valoresBuscar="valoresBuscar" v-on:buscar="buscar" v-on:limipiar="limipiarBuscador">

            </search>
            <v-simple-table fixed-header>
              <thead>
                  <tr>
                    <th class="text-left">Rol</th>
                    <th class="text-left">Descripción</th>
                    <th class="text-left">Empresa</th>
                    <th class="text-left">Opciones</th>
                  </tr>
              </thead>
              <tbody>
                 <tr v-for="role in roles" :key="role.id">
                    <td class="text-left">{{ role.nombre }}</td>
                   <td class="text-left">{{ role.descripcion }}</td>
                    <td class="text-left" v-text="role.empresa ? role.empresa.nombre: ' '"></td>
                    <td>
                      <btn
                        color="warning"
                        fab
                        small
                        link
                        exact
                        :to="'/configuracion/roles/edit/'+role.idcrypt"
                        texto="Editar Rol"
                        textoIcon="mdi-account-edit"
                      >
                      </btn>
                      <btn
                        color="error"
                        fab
                        small
                        texto="Eliminar Rol"
                        textoIcon="mdi-delete-forever"
                        margenes="margin-left:5px"
                        :idrecibir="role.id"
                        v-on:accion="eliminar(role.id)"
                      >
                      </btn>
                    </td>
                  </tr>
              </tbody>
            </v-simple-table>
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
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
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
            name: 'Empresa'
          }
        ]
      ],
      nameItems: [
        ['Datos']
      ]
    }
  },
  components: { MaterialCard, Btn, Search },
  mounted () {
    let url = 'page='+this.page
    this.getRoles(url);
  },
  computed: {
    ...mapState('roles', ['roles', 'totalPage', 'page'])
  },
  methods: {
    ...mapActions('roles', ['getRoles','eliminarRol']),
    eliminar(id){
      this.eliminarRol(id).
      then((res) => {
        let url = 'page='+this.page
        this.getRoles(url)
      })
    },
    buscar(){
      let url = 'page=1&search=true&item0='+this.valoresBuscar.item0+'&datobuscar='+this.valoresBuscar.search
      this.getRoles(url)
    },
    limipiarBuscador(){
      this.valoresBuscar = { item0: null, search: null }
      let url = 'page='+this.page
      this.getRoles(url)
    }
  }
}
</script>
