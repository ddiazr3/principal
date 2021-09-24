<template>
<div>
  <v-row>
    <v-col cols="2" v-if="valoresBuscar.hasOwnProperty('de')">
      <v-text-field type="date"  v-model="valoresBuscar['de']"></v-text-field>
    </v-col>
     <v-col cols="2" v-if="valoresBuscar.hasOwnProperty('a')">
        <v-text-field type="date"  v-model="valoresBuscar['a']"></v-text-field>
     </v-col>
    <v-col cols="2" v-for="(itm, idx) in items" :key="itm.id">
      <v-autocomplete
        :items="itm"
        item-text="name"
        item-value="id"
        dense
        filled
        v-model="valoresBuscar['item'+idx]"
        :label="nameItems[idx]"
      ></v-autocomplete>
    </v-col>
    <v-col
      cols="3"
    >
      <v-text-field v-if="valoresBuscar.hasOwnProperty('search')"
        placeholder="Escribir ..."
        class="mr-16"
        color="secondary"
        hide-details
        v-model="valoresBuscar['search']"
      >
      </v-text-field>
    </v-col>
    <v-col cols="1">
      <v-btn
        class="mt-n2 ml-n2"
        fab
        small
        height="44"
        width="44"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-col>
   </v-row>
</div>
</template>

<script>
export default {
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
