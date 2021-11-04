<template>
<div>
  <template v-if="permisosMarcas[0] ? (permisosMarcas[0].indexOf('index') == -1) : true">
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
            Marcas
            <btn
              color="blue"
              fab
              small
              absolute
              right
              link
              exact
              to="/catalogos/marcas/create"
              texto="Agregar Nueva Marca"
              textoIcon="mdi-plus"
              v-if="permisosMarcas[0] ? (permisosMarcas[0].indexOf('create') != -1 ? true : false) : false"
            >
            </btn>



          </template>
          <v-container class="py-0">
            <search :items="items" :nameItems="nameItems" :valoresBuscar="valoresBuscar" v-on:buscar="buscar" v-on:limipiar="limipiarBuscador" ></search>
            <v-row>
              <v-col cols="12" md="1" class="text-left">
                  <btn
                    margenes="margin-top: 12px"
                    color="success"
                    fab
                    small
                    texto="Exportar Marca"
                    textoIcon="mdi-file-excel-box"
                    v-on:accion="exportar"
                  >
                  </btn>
                    <!--v-btn block
                        link
                        href="C:\Users\dany\Documents\VueJs\Lumen\Control-lumen\storage\app\marcas.xlsx"
                        target="_blank"
                        >
                          Block Button
                    </v-btn-->
                  <a href="C:\Users\dany\Documents\VueJs\Lumen\Control-lumen\storage\app\marcas.xlsx" target="_blank">Dow</a>

              </v-col>
              <v-col
                  cols="12"
                  md="3"
                  class="text-right"
                >
                  <v-file-input
                        accept=".xlsx"
                        placeholder="Pick an avatar"
                        prepend-icon="mdi-file-excel-outline"
                        label="Archivo Excel"
                      >
                      </v-file-input>
              </v-col>
              <v-col
                  cols="12"
                  md="1"
                  class="text-left"
                >
                <btn
                    margenes="margin-left: 0px;margin-top: 12px"
                    color="blue"
                    fab
                    small
                    texto="Subir Archivo"
                    textoIcon="mdi-cloud-upload-outline"
                    v-on:accion="subir"
                  >
                </btn>
              </v-col>
            </v-row>


            <v-simple-table fixed-header style="height: 525px;">
              <thead>
                  <tr>
                    <th class="text-left">Marca</th>
                    <th class="text-left">Opciones</th>
                  </tr>
              </thead>
              <tbody>
                 <tr v-for="dato in marcas" :key="dato.id">
                    <td class="text-left">{{ dato.nombre }}</td>
                    <td>
                      <btn
                        color="warning"
                        fab
                        small
                        link
                        exact
                        :to="'/catalogos/marcas/edit/'+dato.idcrypt"
                        texto="Editar Marcas"
                        textoIcon="mdi-account-edit"
                        :idrecibir="dato.id"
                        v-if="permisosMarcas[0].indexOf('edit') != -1 ? true : false"
                      >
                      </btn>
                      <btn
                        v-if="permisosMarcas[0].indexOf('destroy') != -1 ? true : false"
                        color="error"
                        fab
                        small
                        texto="Eliminar Marcas"
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
    this.getMarcas(url)
  },
  computed: {
    ...mapState('marca', ['marcas', 'totalPage', 'page', 'permisosMarcas'])
  },
  methods: {
    ...mapActions('marca', ['getMarcas','eliminarMarca','exportarMarca']),
    paginacion(val) {
      if(this.valoresBuscar.item0 != null){
          var url = 'page='+val+'+&search=true&item0='+this.valoresBuscar.item0+'&datobuscar='+this.valoresBuscar.search
      }else{
         var url = 'page='+val
      }
      this.getMarcas(url)
    },
    buscar(data) {
      let url = 'page=1&search=true&item0='+this.valoresBuscar.item0+'&datobuscar='+this.valoresBuscar.search
       this.getMarcas(url)
    },
    eliminar(id){
      this.eliminarMarca(id).
      then((res) => {
        let url = 'page='+this.page
        this.getMarcas(url)
      })

    },
    limipiarBuscador(){
      this.valoresBuscar = { item0: null, search: null }
      let url = 'page='+this.page
      this.getMarcas(url)
    },
    subir(){

    },
    exportar(){
        var data = {
          item0 : null,
          datobuscar: null,
          search: null
        }
        if(this.valoresBuscar.item0 != null && this.valoresBuscar.search != null){
          data.search = true
          data.datobuscar = this.valoresBuscar.search
          data.item0 = this.valoresBuscar.item0
        }
        this.exportarMarca(data).
          then((resp) => {
            console.log(resp.data )
           /* var data = resp.data;
            var bytes = new Array(data.length);
            console.log("bytes", bytes);
            for (var i = 0; i < data.length; i++) {
              bytes[i] = data.charCodeAt(i);
            }
            data = new Uint8Array(bytes);
            console.log(blob);
            var blob = new Blob([data], { type: ".xlsx" });
            console.log(blob);
            let objectURL = window.URL.createObjectURL(blob);*/
            window.open(resp.data);

           /* let anchor = document.createElement("a");

            anchor.href = resp.data;
            anchor.download = 'marcas.xlsx';
            anchor.click();

            URL.revokeObjectURL(resp.data);*/
           /* var fileURL = window.URL.createObjectURL(new Blob([resp.data], {type: 'application/vnd.ms-excel;charset=utf-8'}));
            console.log(fileURL)
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'marcas.xlsx');
            document.body.appendChild(fileLink);
            fileLink.click();*/
        }).
          catch((error) => {
          console.log("reporno del api error")
          console.log(error)
        })
    },
  }
}
</script>
