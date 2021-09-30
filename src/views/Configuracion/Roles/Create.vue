<template>
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
            Crear Rol
            <btn
              color="blue"
              fab
              small
              absolute
              right
              link
              exact
              to="/configuracion/roles"
              texto="Regresar"
              textoIcon="mdi-arrow-left-thick"
            >
            </btn>
          </template>

            <v-container class="py-4" >
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                    v-model="role.nombre"
                      label="Nombe"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      color="purple"
                      v-model="role.descripcion"
                      label="Descripción"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <btn
                    color="success"
                    fab
                    small
                    texto="Guardar Rol"
                    textoIcon="mdi-content-save"
                  >
                  </btn>
                  </v-col>
                </v-row>
                <card-role :modules="modules" :role="role"></card-role>
            </v-container>

        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Btn from '../../../components/Layout/App/Btn.vue'
import CardRole from '../../../components/Layout/App/CardRole.vue'
import MaterialCard from '../../../components/view/MaterialCard.vue'

export default {
  data: () => ({
    modules: [
      {
        nombre: 'modulo A',
        id: 1,
        permisoid: 1,
        permisos: [
          {
            value: 0,
            id: 1,
            nombre: 'Guardar'
          },
          {
            value: 0,
            id: 2,
            nombre: 'Editar'
          },
          {
            value: 0,
            id: 3,
            nombre: 'Eliminar'
          },
          {
            value: 0,
            id: 4,
            nombre: 'Ver'
          },
          {
            value: 0,
            id: 5,
            nombre: 'Descargar'
          }
        ]
      },
      {
        nombre: 'modulo B',
        id: 1,
        permisoid: 1,
        permisos: [
          {
            id: 1,
            nombre: 'Guardar'
          },
          {
            id: 2,
            nombre: 'Editar'
          },
          {
            id: 3,
            nombre: 'Eliminar'
          },
          {
            id: 4,
            nombre: 'Ver'
          },
          {
            id: 5,
            nombre: 'Descargar'
          }
        ]
      },
      {
        nombre: 'modulo C',
        id: 1,
        permisoid: 1,
        permisos: [
          {
            id: 1,
            nombre: 'Guardar'
          },
          {
            id: 2,
            nombre: 'Editar'
          },
          {
            id: 3,
            nombre: 'Eliminar'
          },
          {
            id: 4,
            nombre: 'Ver'
          },
          {
            id: 5,
            nombre: 'Descargar'
          }
        ]
      }
    ],
    role: {
      nombre: '',
      descripcion: '',
      modulos: []
    }
  }),
  components: { MaterialCard, Btn, CardRole }
}
</script>
