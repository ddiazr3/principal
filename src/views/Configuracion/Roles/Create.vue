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
            <h3 v-if="!$route.params.id ">Crear Rol </h3>
            <h3 v-if="$route.params.id">Editar Rol</h3>
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
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-container class="py-4" >
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                    v-model="rol.nombre"
                    :rules="textRules"
                      label="Nombe"
                    :counter="25"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-text-field
                      color="purple"
                      v-model="rol.descripcion"
                      :rules="textCincuentaRules"
                      :counter="50"
                      label="Descripción"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-autocomplete
                      :items="empresasRole"
                      item-text="nombre"
                      item-value="id"
                      dense
                      filled
                      label="Empresa"
                      v-model="rol.empresaid"
                      :rules="selectRules"
                    ></v-autocomplete>
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <btn
                      color="success"
                      fab
                      small
                      :texto="!$route.params.id ? 'Guardar Rol' : 'Actualizar Rol'"
                      textoIcon="mdi-content-save"
                      margenes="margin-left:5px"
                      v-on:accion="guardar"
                      :disabled="!valid"
                    >
                    </btn>
                  </v-col>
                </v-row>
                <card-role :modules="modulosRole" :role="rol" ></card-role>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
    </v-row>
    <snackbar :colorSnackbar="colorSnackbar" :snackbar="snackbar" :textoSnackbar="textoSnackbar"v-on:cerrar="cerrar"></snackbar>
  </v-container>
</template>
<script>
import Btn from '../../../components/Layout/App/Btn.vue'
import CardRole from '../../../components/Layout/App/CardRole.vue'
import MaterialCard from '../../../components/view/MaterialCard.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import Snackbar from '../../../components/Layout/App/Snackbar'

export default {
  data: () => ({
    valid: true,
    snackbar: false,
    colorSnackbar: "dark",
    textoSnackbar: null,
    textRules: [
      v => !!v || 'Campo es requerido',
      v => (v && v.length <= 25) || 'Ingrese menos de 25 carcateres'
    ],
    textCincuentaRules: [
      v => !!v || 'Campo es requerido',
      v => (v && v.length <= 50) || 'Ingrese menos de 50 carcateres'
    ],
    selectRules: [
      v => !!v || 'Campo es requerido'
    ]
  }),
  components: { Snackbar, MaterialCard, Btn, CardRole },
  mounted () {
    this.getCatalogos();
    if(this.$route.params.id){
      this.getRole(this.$route.params.id)
    }else{
      this.limpiarRole()
    }
  },
  computed: {
    ...mapState('roles', ['empresasRole','modulosRole','rol'])
  },
  methods: {
    ...mapActions('roles', ['getCatalogos', 'guardarRole', 'getRole']),
    ...mapMutations('roles', ['limpiarRole']),
    guardar(){
      this.$refs.form.validate()

      if(this.valid){

        if(this.rol.permisosIds.length == 0){
          this.snackbar = true
          this.colorSnackbar = "dark"
          this.textoSnackbar = "Debe seleccionar al menos un permiso"
          return
        }

        this.guardarRole(this.rol)
          .then((res) => {
            this.snackbar = true
            this.colorSnackbar = "success"
            this.textoSnackbar = "Datos creados con éxito"
            this.$router.push('/configuracion/roles')
            this.limpiarRole()
          }).catch((error) => {
          if(error.response.status == 401){
            this.$store.commit('errorCatch')
            return
          }
          this.snackbar = true
          this.colorSnackbar = "dark"
          this.textoSnackbar = msgError
        })
      }
    },
    cerrar(){
      this.snackbar = false
      this.colorSnackbar = "dark"
      this.textoSnackbar = null
    }
  }
}
</script>
