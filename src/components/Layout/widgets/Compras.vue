<template>
  <v-menu
    bottom
    left
    offset-y
    origin="top right"
    transition="scale-transition"
    :close-on-click="false"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        v-on="on"
      >
        <v-badge
          bordered
          color="red"
          overlap
        >
          <template v-slot:badge>
            <span>{{ compra.detalleCompras.length }}</span>
          </template>

          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-simple-table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Pago</th>
          <th>Quitar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in compra.detalleCompras">
          <td v-text="p.producto"></td>
          <td>
            <v-text-field type="number" v-model="p.cantidad" @input="count(p)"/>
          </td>
          <td>
            <v-text-field type="number" v-model="p.precio" @input="count(p)"/>
          </td>
          <td v-text="p.pago"></td>
          <th>
            <btn
              fab
              small
              height="44"
              width="44"
              color="error"
              texto="Quitar"
              textoIcon="mdi-delete"
              v-on:accion="quitar(p)"
            ></btn>
          </th>
        </tr>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="3" class="text-right">Total Pago:</td>
        <td>Q. {{ calcularPago }}</td>
        <td>
          <btn
            fab
            small
            height="44"
            width="44"
            color="blue"
            texto="Pagar"
            textoIcon="mdi-check"
            v-on:accion="comprar"
          ></btn>
        </td>
      </tr>
      </tfoot>
    </v-simple-table>


  </v-menu>
</template>

<script>
import BarItem from '../App/BarItem.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import Btn from '../App/Btn'
import { saveCompra } from '../../../modules/Principal/Compras/actions'
import { clearCompra } from '../../../modules/Principal/Compras/mutations'
// import Swal from 'sweetalert2'
// import 'sweetalert2/src/sweetalert2.scss'

export default {
  data: () => ({

  }),
  components: {
    Btn,
    BarItem,
    },
  computed:{
    ...mapState('compras',['compra']),
    calcularPago : function (){
        var pago = 0;
        for(var i = 0; i < this.compra.detalleCompras.length; i++){
            pago += this.compra.detalleCompras[i].pago
        }
        this.compra.totalpagado = pago;
        return pago
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions('compras', ['saveCompra']),
    ...mapMutations('compras', ['clearCompra']),
    count(object){
      var data =  this.compra.detalleCompras.filter((e) => {
        if(e.id == object.id){
          let pago = e.cantidad * e.precio
          e.pago = pago
        }
        return e
      })
      if(data.length){
        this.venta.detalleVenta = data
      }
    },
    quitar(p){
      this.$swal({
        title: 'Seguro de eliminar el producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
      }).then((result) => {
        if(result.isConfirmed){
          var result = this.compra.detalleCompras.filter((e) => {
            return e.id != p.id
          })
          this.compra.detalleCompras = result;
        }
      })

    },
    comprar(){
     this.$swal({
       title: 'Seguro de realizar la compra?',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si!',
       cancelButtonText: 'No'
     }).then((result) => {
       if(result.isConfirmed){

         this.saveCompra(this.compra).
         then((res) => {
           this.clearCompra()
         })
           .catch((e) => {
             if (e.response.status == 401) {
               this.$store.commit("errorCatch", true)
               return
             }
             throw e;
           })

       }
     })
    }
  }
}
</script>
