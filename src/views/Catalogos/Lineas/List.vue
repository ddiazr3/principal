<template>
<div>
  <template v-if="permisosLineas[0] ? (permisosLineas[0].indexOf('index') == -1) : true">
    <unauthorized></unauthorized>
  </template>
  <template v-else>
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
            Lineas
            <btn
              color="blue"
              fab
              small
              absolute
              right
              link
              exact
              to="/catalogos/lineas/create"
              texto="Agregar Nueva Linea"
              textoIcon="mdi-plus"
              v-if="permisosLineas[0] ? (permisosLineas[0].indexOf('create') != -1 ? true : false) : false"
            >
            </btn>
          </template>
          <v-container class="py-0">
            <search :items="items" :nameItems="nameItems" :valoresBuscar="valoresBuscar" v-on:buscar="buscar" v-on:limipiar="limipiarBuscador" ></search>
            <v-simple-table fixed-header style="height: 525px;">
              <thead>
                  <tr>
                    <th class="text-left">Linea</th>
                    <th class="text-left">Marca</th>
                    <th class="text-left">Opciones</th>
                  </tr>
              </thead>
              <tbody>
                 <tr v-for="dato in lineas" :key="dato.id">
                    <td class="text-left">{{ dato.nombre }}</td>
                    <td class="text-left">{{ dato.marca.nombre }}</td>
                    <td>
                      <btn
                        color="warning"
                        fab
                        small
                        link
                        exact
                        :to="'/catalogos/lineas/edit/'+dato.idcrypt"
                        texto="Editar Lineas"
                        textoIcon="mdi-account-edit"
                        :idrecibir="dato.id"
                        v-if="permisosLineas[0].indexOf('edit') != -1 ? true : false"
                      >
                      </btn>
                      <btn
                        v-if="permisosLineas[0].indexOf('destroy') != -1 ? true : false"
                        color="error"
                        fab
                        small
                        texto="Eliminar Lineas"
                        textoIcon="mdi-delete-forever"
                        margenes="margin-left:5px"
                         :idrecibir="dato.id"
                        v-on:accion="eliminar(dato.id)"

                      >
                      </btn>
                    </td>
                  </tr>

              </tbody>
            </v-simple-table>
            <pagiante :length="totalPage" v-on:cambiopagina="paginacion"></pagiante>
          </v-container>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
  </template>
  </div>
</template>
<script>
import Btn from '../../../components/Layout/App/Btn.vue'
import Search from '../../../components/Layout/widgets/Search.vue'
import MaterialCard from '../../../components/view/MaterialCard.vue'
import { mapState, mapActions } from 'vuex'
import Pagiante from '../../../components/Layout/App/Pagiante.vue'
import Unauthorized from '../../Unauthorized'

export default {
  data () {
    return {
      // van a ver itemN porque se utilizan para los select
      // para search habran N tambiern porque seran los de cajas de texto de busqueda
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
          }
        ]
      ],
      nameItems: [
        ['Datos']
      ],
    }
  },
  components: { Unauthorized, MaterialCard, Btn, Search, Pagiante },
  mounted () {

    //JSON.parse(this.$CryptoJS.AES.decrypt(localStorage.getItem("usuario"), this.$keyCryp).toString(this.$CryptoJS.enc.Utf8)),
    var us = JSON.parse(this.$CryptoJS.AES.decrypt(localStorage.getItem("usuario"), this.$keyCryp).toString(this.$CryptoJS.enc.Utf8))

    if(us.idsRoles.indexOf(1) != -1){
      this.mostrarBTN = true
    }

    let url = 'page='+this.page
    this.getLineas(url)
  },
  computed: {
    ...mapState('linea', ['lineas', 'totalPage', 'page', 'permisosLineas'])
  },
  methods: {
    ...mapActions('linea', ['getLineas','eliminarLineas']),
    paginacion(val) {
      if(this.valoresBuscar.item0 != null){
          var url = 'page='+val+'+&search=true&item0='+this.valoresBuscar.item0+'&datobuscar='+this.valoresBuscar.search
      }else{
         var url = 'page='+val
      }
      this.getLineas(url)
    },
    buscar(data) {
      let url = 'page=1&search=true&item0='+this.valoresBuscar.item0+'&datobuscar='+this.valoresBuscar.search
       this.getLineas(url)
    },
    eliminar(id){
      this.eliminarLineas(id).
      then((res) => {
        let url = 'page='+this.page
        this.getLineas(url)
      })

    },
    limipiarBuscador(){
      this.valoresBuscar = { item0: null, search: null }
      let url = 'page='+this.page
      this.getLineas(url)
    }
  }
}
</script>
