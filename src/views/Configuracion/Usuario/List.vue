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
            <search :items="items" :nameItems="nameItems" :valoresBuscar="valoresBuscar" >

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
                 <tr>
                    <td class="text-left">Dany</td>
                    <td class="text-left">Diaz</td>
                    <td class="text-left">44877801</td>
                    <td class="text-left">Fraiajn</td>
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
                        to="/configuracion/usuarios/edit/1"
                        texto="Editar Usuario"
                        textoIcon="mdi-account-edit"
                      >
                      </btn>
                      <btn
                        color="error"
                        fab
                        small
                        texto="Eliminar Usuario"
                        textoIcon="mdi-delete-forever"
                        margenes="margin-left:5px"
                      >
                      </btn>
                      <btn
                        color="success"
                        fab
                        small
                        texto="Activar Usuario"
                        textoIcon="mdi-check"
                        margenes="margin-left:5px"
                      >
                      </btn>
                    </td>
                  </tr>
                   <tr>
                    <td class="text-left">Leny</td>
                    <td class="text-left">Diaz</td>
                    <td class="text-left">58403313</td>
                    <td class="text-left">Cerrito</td>
                    <td class="text-left">
                      <v-chip
                          x-small
                          color="green"
                          text-color="white"
                        >
                          Compras
                        </v-chip>
                        <v-chip style="margin-left:5px"
                          x-small
                          color="green"
                          text-color="white"
                        >
                          Ventas
                        </v-chip>
                        </td>
                    <td>
                      <btn
                        color="warning"
                        fab
                        small
                        link
                        exact
                        to="/configuracion/usuarios/edit/1"
                        texto="Editar Usuario"
                        textoIcon="mdi-account-edit"
                      >
                      </btn>
                      <btn
                        color="error"
                        fab
                        small
                        texto="Eliminar Usuario"
                        textoIcon="mdi-delete-forever"
                        margenes="margin-left:5px"
                      >
                      </btn>

                      <btn
                        color="success"
                        fab
                        small
                        texto="Activar Usuario"
                        textoIcon="mdi-check"
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
      ]
    }
  },
  components: { MaterialCard, Btn, Search }
}
</script>
