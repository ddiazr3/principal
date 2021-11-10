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
            <h3 v-if="!$route.params.id ">Crear Producto</h3>
            <h3 v-if="$route.params.id">Editar Producto</h3> —
            <small class="text-body-1">Complete todos los datos</small>
            <btn
              color="blue"
              fab
              small
              absolute
              right
              link
              exact
              to="/catalogos/productos"
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
                    label="Producto"
                    :rules="textRules"
                     v-model="producto.nombre"
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
                    label="Descripción"
                    :rules="textRules"
                     v-model="producto.descripcion"
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
                    label="Código"
                    :rules="textRules"
                     v-model="producto.codigo"
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
                    label="Cantidad"
                    :rules="textNumberTelRules"
                     v-model="producto.stockBodega.cantidad"
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
                    label="Precio"
                    :rules="textRules"
                     v-model="producto.precioBodega.precio"
                      :max="25"
                     :counter="25"
                  />
                </v-col>


                <v-col cols="12" md="4">
                    <v-autocomplete
                      :items="proveedores"
                      item-text="nombre"
                      item-value="id"
                      dense
                      filled
                      label="Proveedor"
                      v-model="producto.proveedorid"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete
                      :items="categorias"
                      item-text="nombre"
                      item-value="id"
                      dense
                      filled
                      label="Categoria"
                      v-model="producto.categoriaid"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete
                      :items="marcas"
                      item-text="nombre"
                      item-value="id"
                      dense
                      filled
                      label="Marca"
                      v-model="producto.marcaid"
                      @change="getLineas"
                    >
                    </v-autocomplete>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-autocomplete
                      :items="lineas"
                      item-text="nombre"
                      item-value="id"
                      dense
                      filled
                      label="Linea"
                      v-model="producto.lineaid"

                    >
                    </v-autocomplete>
                  </v-col>


                <v-col
                  cols="12"
                  class="text-right"
                >
                  <btn
                        color="primary"
                        fab
                        small
                        :texto="!$route.params.id ? 'Guardar Producto' : 'Actualizar Producto'"
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
import axios from 'axios'

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
      v => /[0-9]/.test(v) || 'El campo es de tipo numerico',
    ],
    proveedores: [],
    categorias: [],
    marcas: [],
    lineas: []

  }),
  components: { Snackbar, MaterialCard, Btn },
  mounted() {

    if(this.$route.params.id){
      this.getProducto(this.$route.params.id)
      this.catalogos();
      setTimeout(() => {
        this.getLineas();
      }, 1000);


    }else{
      this.limpiarProductos()
      this.proveedor = [];
      this.categorias = [];
      this.marcas = [];
      this.catalogos();
    }
  },
  computed: {
    ...mapState('producto', ['producto'])
  },
  methods: {
    ...mapActions('producto', ['guardarProducto','getProducto']),
    ...mapMutations('producto', ['limpiarProductos']),

    guardar() {
      this.$refs.form.validate()

      if(this.valid){
        this.guardarProducto(this.producto)
          .then((res) => {
            this.snackbar = true
            this.colorSnackbar = "success"
            this.textoSnackbar = "Datos creados con éxito"
            this.$router.push('/catalogos/productos')
            this.limpiarProductos()
              this.proveedor = [];
              this.categorias = [];
              this.marcas = [];
          }).catch((error) => {
          if(error.response.status == 401){
            this.$store.commit('errorCatch')
            return
          }
          this.snackbar = true
          this.colorSnackbar = "dark"
          this.textoSnackbar = error.response.data.message
        })
      }

    },
    cerrar(){
      this.snackbar = false
      this.colorSnackbar = "dark"
      this.textoSnackbar = null
    },
    catalogos(){
        const url = process.env.VUE_APP_URL_API + '/api/productos/catalogos';
        axios.get(url)
            .then((response) => {
              this.proveedores = response.data.proveedores;
              this.categorias = response.data.categoria;
              this.marcas = response.data.marcas;
            })
            .catch((e) => {
                if (e.response.status == 401) {
                  return
                }
              if(e.response.status == 500){
                this.msgPopup= "Comunicarse con su administrador."
                return
              }
                throw e;
            })
    },
    getLineas(){
      const url = process.env.VUE_APP_URL_API + '/api/lineas/getLinea/'+this.producto.marcaid;
    axios.get(url)
        .then((response) => {
            this.lineas = response.data
        })
        .catch((e) => {
          if(e.response.status == 500){
            this.msgPopup= "Comunicarse con su administrador."
            return
          }
            throw e;
        })
    }
  }
}
</script>
