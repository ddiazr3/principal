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
            <h3 v-if="!$route.params.id ">Crear Perfil </h3>
            <h3 v-if="$route.params.id">Editar Perfil</h3> —
            <small class="text-body-1">Complete todos los datos</small>
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
                    :rules="textCincuentaRules"
                    v-model="usuario.direccion"
                    :counter="50"
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
                    :rules="textNumberTelRules"
                    :counter="8"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-if="!$route.params.id "
                    color="purple"
                    :rules="textPassword"
                    v-model="usuario.contrasenia"
                    :counter="6"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-2"
                    class="input-group--focused"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show2 = !show2"

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
                        :texto="!$route.params.id ? 'Guardar Usuario' : 'Actualizar Usuario'"
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
    <snackbar :colorSnackbar="colorSnackbar" :snackbar="snackbar" :textoSnackbar="textoSnackbar" @cerrar="cerrar"></snackbar>
  </v-container>

</template>
<script>
import Btn from '../../../components/Layout/App/Btn.vue'
import MaterialCard from '../../../components/view/MaterialCard.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import Snackbar from '../../../components/Layout/App/Snackbar'
const msgError = process.env.VUE_APP_MSG_ERROR

export default {
  data: () => ({
    valid: true,
    snackbar: false,
    colorSnackbar: "dark",
    textoSnackbar: null,
    show1: true,
    show2: false,
    textRules: [
      v => !!v || 'Campo es requerido',
      v => (v && v.length <= 25) || 'Ingrese menos de 25 carcateres'
    ],
    textCincuentaRules: [
      v => !!v || 'Campo es requerido',
      v => (v && v.length <= 50) || 'Ingrese menos de 50 carcateres'
    ],
    textNumberRules:[
      v => !!v || 'Campo es requerido',
      v => (v && v.length <= 13 && v.length >=13) || 'Ingrese 13 digitos',
      v => /[0-9]/.test(v) || 'El campo es de tipo numerico',
    ],
    textPassword:[
      v => !!v || 'Campo es requerido',
      v => (v && v.length <= 8) || 'Min 8 digitos',
    ],
    textNumberTelRules:[
      v => !!v || 'Campo es requerido',
      v => (v && v.length <= 8 && v.length >=8) || 'Ingrese 8 digitos',
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
  components: { Snackbar, MaterialCard, Btn },
  mounted() {
    this.getCatalogos()
    if(this.$route.params.id){
      this.getUsuario(this.$route.params.id)
    }else{
      this.limpiarUsuario()
    }
  },
  computed: {
    ...mapState('usuario', ['empresasUsuario','rolesUsuario','usuario'])
  },
  methods: {
    ...mapActions('usuario', ['getCatalogos','guardarUsuario','getUsuario']),
    ...mapMutations('usuario', ['limpiarUsuario']),

    guardar() {
      this.$refs.form.validate()

      if(this.valid){
        this.guardarUsuario(this.usuario)
          .then((res) => {
            this.snackbar = true
            this.colorSnackbar = "success"
            this.textoSnackbar = "Datos creados con éxito"
            this.$router.push('/configuracion/usuarios')
            this.limpiarUsuario()
          }).catch((error) => {
          this.snackbar = true
          this.colorSnackbar = "dark"
          this.textoSnackbar = msgError
        })
      }

    },
    validate () {
      this.$refs.form.validate()
    },
    cerrar(){
      this.snackbar = false
      this.colorSnackbar = "dark"
      this.textoSnackbar = null
    }
  }
}
</script>
