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
            <h3 v-if="!$route.params.id ">Crear Punto de Ventas</h3>
            <h3 v-if="$route.params.id">Editar Punto de Ventas</h3> —
            <small class="text-body-1">Complete todos los datos</small>
            <btn
              color="blue"
              fab
              small
              absolute
              right
              link
              exact
              to="/configuracion/puntoventas"
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
                    label="Nombre"
                    :rules="textRules"
                     v-model="puntoventa.nombre"
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
                     v-model="puntoventa.direccion"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    color="purple"
                    label="NIT"
                    v-model="puntoventa.nit"
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
                    v-model="puntoventa.telefono"
                    :rules="textNumberTelRules"
                    :counter="8"
                  />
                </v-col>



              </v-row>

              <template v-if="puntoventa.igualprincipal">
                <v-checkbox
                  class="checkbox-role"
                  v-model="mismosProductos"
                  :label="'Utiliza los mismos productos del almacen?'"
                ></v-checkbox>
                 <h3 class="text-center" v-if="!mismosProductos" >Elegir Producto</h3>
                 <productos v-if="!mismosProductos" :productos="productosget"></productos>
              </template>

              <template v-else>
                  <h3 class="text-center">Elegir Producto</h3>
                  <br>
                  <productos :productos="productosget" ></productos>
              </template>

              <v-col
                cols="12"
                class="text-right"
              >
                <btn
                  color="primary"
                  fab
                  small
                  :texto="!$route.params.id ? 'Guardar Punto de Venta' : 'Actualizar Punto de Venta'"
                  textoIcon="mdi-content-save"
                  margenes="margin-left:5px"
                  v-on:accion="guardar"
                  :disabled="!valid"
                >
                </btn>

              </v-col>

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
import Productos from '../../../components/view/PuntoVenta/Productos.vue'
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
    mismosProductos: true,
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
  components: { Snackbar, MaterialCard, Btn, Productos },
  mounted() {
    if(this.$route.params.id){
      this.getPuntoVenta(this.$route.params.id)
     }else{
      this.limpiarPuntoVenta()
    }
  },
  computed: {
    ...mapState('puntoventasinstance', ['puntoventa','productosget'])
  },
  methods: {
    ...mapActions('puntoventasinstance', ['guardarPuntoVenta','getPuntoVenta']),
    ...mapMutations('puntoventasinstance', ['limpiarPuntoVenta','datosIguales']),
    guardar() {
      this.$refs.form.validate()

      if(this.valid){

        this.puntoventa.productos = this.productosget

        this.guardarPuntoVenta(this.puntoventa)
          .then((res) => {
            this.snackbar = true
            this.colorSnackbar = "success"
            this.textoSnackbar = "Datos creados con éxito"
            this.$router.push('/configuracion/puntoventas')
            this.limpiarPuntoVenta()
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
