<template>
               <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field v-if="puntoventa.igualprincipal"
                    color="purple"
                    :value="empresa.nombre"
                    :disabled="true"
                  />

                <v-text-field v-else
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
                <v-text-field v-if="puntoventa.igualprincipal"
                    color="purple"
                    :value="empresa.direccion"
                    :disabled="true"
                  />

                  <v-text-field v-else
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
                <v-text-field v-if="puntoventa.igualprincipal"
                    color="purple"
                    :value="empresa.nit"
                    :disabled="true"
                  />
                  <v-text-field v-else
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
                <v-text-field v-if="puntoventa.igualprincipal"
                    color="purple"
                    :value="empresa.telefono"
                    :disabled="true"
                  />
                  <v-text-field v-else
                    color="purple"
                    label="Telefono"
                    v-model="puntoventa.telefono"
                    :rules="textNumberTelRules"
                    :counter="8"
                  />
                </v-col>


              </v-row>
</template>
<script>
import Btn from '../../../components/Layout/App/Btn.vue'
import MaterialCard from '../../../components/view/MaterialCard.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import Snackbar from '../../../components/Layout/App/Snackbar'
const msgError = process.env.VUE_APP_MSG_ERROR

export default {
  props: ['puntoventa','index'],
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
  components: { Snackbar, MaterialCard, Btn },
  mounted() {
    if(this.$route.params.id){
      this.getEmpresa(this.$route.params.id)
    }else{
      this.limpiarEmpresa()
    }
  },
  computed: {
    ...mapState('empresa', ['empresa','permisosEmpresas','puntoventadatosempresa']),
    datospuntoventaempresa: {
      get () {
        return this.puntoventadatosempresa
      },
      set (value) {
        this.datosIguales(value)
      }
    }
  },
  methods: {
    ...mapActions('empresa', ['guardarEmpresa','getEmpresa']),
    ...mapMutations('empresa', ['limpiarEmpresa','datosIguales']),

    guardar() {
      alert(this.puntoventadatosempresa)
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
