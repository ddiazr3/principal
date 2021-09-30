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
            <search :items="items" :nameItems="nameItems" :valoresBuscar="valoresBuscar" >

            </search>
            <v-simple-table fixed-header>
              <thead>
                  <tr>
                    <th class="text-left">Rol</th>
                    <th class="text-left">Empresa</th>
                    <th class="text-left">Opciones</th>
                  </tr>
              </thead>
              <tbody>
                 <tr>
                    <td class="text-left">Admin</td>
                    <td class="text-left">Sopor 1</td>
                    <td>
                      <btn
                        color="warning"
                        fab
                        small
                        link
                        exact
                        to="/configuracion/usuarios/edit/1"
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
                      >
                      </btn>
                    </td>
                  </tr>
                   <tr>
                    <td class="text-left">Ventas</td>
                    <td class="text-left">Sopor 2</td>
                    <td>
                      <btn
                        color="warning"
                        fab
                        small
                        link
                        exact
                        to="/configuracion/usuarios/edit/1"
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
  components: { MaterialCard, Btn, Search }
}
</script>
