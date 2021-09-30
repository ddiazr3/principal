<template>
<div>
  <v-row>
    <v-col cols="12" md="2" v-if="valoresBuscar.hasOwnProperty('de')">
      <v-text-field type="date"  v-model="valoresBuscar['de']"></v-text-field>
    </v-col>
     <v-col cols="12" md="2" v-if="valoresBuscar.hasOwnProperty('a')">
        <v-text-field type="date"  v-model="valoresBuscar['a']"></v-text-field>
     </v-col>
    <v-col cols="12" md="2" v-for="(itm, idx) in items" :key="itm.id">
      <v-autocomplete
        :items="itm"
        item-text="name"
        item-value="id"
        dense
        filled
        v-model="valoresBuscar['item'+idx]"
        :label="String(nameItems[idx])"
      ></v-autocomplete>
    </v-col>
    <v-col
     cols="12" md="2"
    >
      <v-text-field v-if="valoresBuscar.hasOwnProperty('search')"
        placeholder="Escribir ..."
        color="secondary"
        hide-details
        v-model="valoresBuscar['search']"
      >
      </v-text-field>
    </v-col>
    <v-col cols="12" md="2">
      <btn
        fab
        small
        height="44"
        width="44"
        color="blue"
        texto="Buscar"
        textoIcon="mdi-magnify"
         v-on:accion="buscar"
      ></btn>
      <btn
        margenes="margin-left:5px"
        fab
        small
        height="44"
        width="44"
        color="success"
        texto="Limpiar"
        textoIcon="mdi-broom"
        v-on:accion="$emit('limipiar')"
      ></btn>
    </v-col>
   </v-row>
</div>
</template>

<script>
import Btn from '../App/Btn.vue'
export default {
  components: { Btn },
  props: {
    items: {
      type: [],
      default: null
    },
    nameItems: {
      type: [],
      default: null
    },
    valoresBuscar: {
      type: Object,
      default: null
    }
  },
  methods: {
    buscar() {
      this.$emit('buscar', this.valoresBuscar);
    }
  }
}
</script>
<!--
Aqui dejo el ejemplo de como recibe los datos

 valoresBuscar: {
        item0: null,
        item1: null,
        search: null,
        de: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        a: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      },
      // para el buscador la primera poscion va el nombre del titulo
      items: [
        [
          {
            id: '1',
            name: 'Nombre'
          },
          {
            id: '2',
            name: 'Telefono'
          },
          {
            id: '3',
            name: 'Dpi'
          }
        ],
        [
          {
            id: '1',
            name: 'Pro1'
          },
          {
            id: '2',
            name: 'Pro2'
          },
          {
            id: '3',
            name: 'Pro3'
          }
        ]
      ],
      nameItems: [
        ['Datos'],
        ['Proyectos']
      ]
    }

-->
