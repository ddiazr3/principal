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
            <h3 v-if="!$route.params.id ">Crear Empresa</h3>
            <h3 v-if="$route.params.id">Editar Empresa</h3> —
            <small class="text-body-1">Complete todos los datos</small>
            <btn
              color="blue"
              fab
              small
              absolute
              right
              link
              exact
              to="/configuracion/empresas"
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
                  <v-text-field
                    color="purple"
                    label="Nombre Empresa"
                    :rules="textRules"
                     v-model="empresa.nombre"
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
                    label="Direccion"
                    :rules="textCincuentaRules"
                    :counter="50"
                    max-length="25"
                     v-model="empresa.direccion"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="NIT"
                    v-model="empresa.nit"
                    :rules="textNumberRules"
                    :counter="10"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="Telefono"
                    v-model="empresa.telefono"
                    :rules="textNumberTelRules"
                    :counter="8"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                >
                 <h1>Configuración de la Bodega</h1>
                </v-col>

                <v-col cols="12" md="12">
                  <v-checkbox
                      class="checkbox-role"
                      v-model="empresa.bodega.igualempresa"
                      label="Datos de la Bodega igual a la de la empresa"
                  >
                  </v-checkbox>
                </v-col>

                <template v-if="!empresa.bodega.igualempresa">

                <v-col
                  cols="12"
                  md="4"
                >
                <v-text-field
                    color="purple"
                    label="Nombre"
                    :rules="textRules"
                    v-model="empresa.bodega.nombre"
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
                    label="Direccion"
                    :rules="textCincuentaRules"
                    :counter="50"
                    max-length="25"
                     v-model="empresa.bodega.direccion"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="Telefono"
                    v-model="empresa.bodega.telefono"
                    :rules="textNumberTelRules"
                    :counter="8"
                  />
                </v-col>

                </template>


                <v-col
                  cols="12"
                  md="12"
                >
                 <h1>Configuración del punto de ventas</h1>
                </v-col>
                <v-col cols="12" md="12" v-for="(item, i) in empresa.punto_ventas" :key="i" >
                  <p class="text-center" text-color="red">
                    Punto de Venta {{ i + 1}}
                  </p>
                    <punto-venta :puntoventa="item" :index="i" :empresa="empresa"></punto-venta>
                     <v-spacer class="hidden-sm-and-down" />
                </v-col>



                <v-col
                  cols="12"
                  class="text-right"
                >
                  <btn
                        color="primary"
                        fab
                        small
                        :texto="!$route.params.id ? 'Guardar Empresa' : 'Actualizar Empresa'"
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
import PuntoVenta from '../../../components/view/Empresa/PuntoVenta.vue'
//import PuntoVenta from '../../../components/view/Empresa/PuntoVenta'
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
      v => (v && v.length <= 10) || 'Min 10 digitos',
      v => /[0-9]/.test(v) || 'El campo es de tipo numerico',
    ],
    textNumberTelRules:[
      v => !!v || 'Campo es requerido',
      v => (v && v.length <= 8 && v.length >=8) || 'Ingrese 8 digitos',
      v => /[0-9]/.test(v) || 'El campo es de tipo numerico',
    ],

  }),
  components: { PuntoVenta, Snackbar, MaterialCard, Btn, PuntoVenta },
  mounted() {
    if(this.$route.params.id){
      this.getEmpresa(this.$route.params.id)
    }else{
      this.limpiarEmpresa()
    }
  },
  computed: {
    ...mapState('empresa', ['empresa','permisosEmpresas'])
  },
  methods: {
    ...mapActions('empresa', ['guardarEmpresa','getEmpresa']),
    ...mapMutations('empresa', ['limpiarEmpresa','datosIguales']),

    guardar() {
      this.$refs.form.validate()

      if(this.valid){
        this.guardarEmpresa(this.empresa)
          .then((res) => {
            this.snackbar = true
            this.colorSnackbar = "success"
            this.textoSnackbar = "Datos creados con éxito"
            this.$router.push('/configuracion/empresas')
            this.limpiarEmpresa()
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
