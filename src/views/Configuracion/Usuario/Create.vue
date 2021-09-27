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
          icon="mdi-account-outline"
        >
          <template #title>
            Crear Perfil — <small class="text-body-1">Complete todos los datos</small>
            <btn
              color="blue"
              fab
              small
              absolute
              right
              link
              exact
              to="/configuracion/usuarios"
              texto="Regresar"
              textoIcon="mdi-arrow-left-thick"
            >
            </btn>
          </template>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
            <v-container class="py-0">
              <v-row>

                <v-col
                  cols="12"
                  md="4"
                >
                <v-autocomplete
                    :items="empresasUsuario"
                    item-text="nombre"
                    item-value="id"
                    dense
                    filled
                    label="Empresa"
                    v-model="usuario.empresaid"
                    :rules="selectRules"
                  ></v-autocomplete>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-autocomplete
                    :items="rolesUsuario"
                    item-text="nombre"
                    item-value="id"
                    dense
                    filled
                    label="Roles"
                    multiple
                    v-model="usuario.rolesid"
                    :rules="selectMultipleRules"

                  ></v-autocomplete>
                </v-col>


                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="Nombre usuario"
                    :rules="textRules"
                     v-model="usuario.nombre"
                      :max="25"
                     :counter="25"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="Apellido"
                    :rules="textRules"
                    :counter="25"
                    max-length="25"
                     v-model="usuario.apellido"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="Correo"
                    :rules="emailRules"
                    v-model="usuario.correo"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="DPI"
                    v-model="usuario.dpi"
                    :rules="textNumberRules"
                    :counter="13"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    color="purple"
                    label="Dirección"
                    :rules="textRules"
                    v-model="usuario.direccion"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="Telefono"
                    v-model="usuario.telefono"
                    :rules="textNumberRules"
                    :counter="8"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <btn
                        color="primary"
                        fab
                        small
                        texto="Guardar Usuario"
                        textoIcon="mdi-content-save"
                        margenes="margin-left:5px"
                        v-on:accion="guardar"
                        :disabled="!valid"
                      >
                      </btn>

                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
    </v-row>
     <v-snackbar
        v-model="snackbar"
        :multi-line="true"
      >
       Revisar Campos

        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
  </v-container>

</template>
<script>
import Btn from '../../../components/Layout/App/Btn.vue'
import MaterialCard from '../../../components/view/MaterialCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    valid: true,
    textRules: [
      v => !!v || 'Campo es requerido',
      v => (v && v.length <= 25) || 'Ingrese menos de 25 carcateres'
    ],
    textNumberRules:[
      v => !!v || 'Campo es requerido',
      v => (v && v.length <= 13) || 'Ingrese menos de 13 carcateres',
      v => /[0-9]/.test(v) || 'El campo es de tipo numerico',
    ],
    emailRules: [
      v => !!v || 'E-mail es requerido',
      v => /.+@.+\..+/.test(v) || 'E-mail es invalido',
    ],
     selectRules: [
      v => !!v || 'Campo es requerido'
    ],
     selectMultipleRules: [
        v => !!v || 'Campo es requerido',
        v => (v && v.length > 0) || 'Debe ingresar al menos uno'
    ],
  }),
  components: { MaterialCard, Btn },
  mounted() {
    this.getCatalogos()
  },
  watch: {
    snackbar: function (val) {
     this.$store.state.snackbar
    }
  },
  computed: {
    ...mapState('usuario', ['empresasUsuario','rolesUsuario','usuario'])
  },
  methods: {
    ...mapActions('usuario', ['getCatalogos','guardarUsuario']),
    guardar() {
      this.$refs.form.validate()
      this.guardarUsuario(this.usuario)

    },
    validate () {
      this.$refs.form.validate()
    },
  }
}
</script>
