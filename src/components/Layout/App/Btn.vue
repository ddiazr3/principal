<template>
   <v-tooltip bottom>
     <template v-slot:activator="{ on, attrs }">
      <v-btn
      :style="margenes"
        :color="color"
        dark
        :fab="fab"
        :small="small"
        :large="large"
        :absolute="absolute"
        :right="right"
        :link="link"
        :exact="exact"
        :to="to"
        :top="top"
        :disabled="disabled"
        v-bind="attrs"
        v-on="on"
        @click="buscar"
      >
       <v-icon v-if="textoIcon.length > 0">{{ textoIcon }}</v-icon>
       <v-icon v-if="textoButton.length > 0">{{ textoButton }}</v-icon>
        <slot />
      </v-btn>
    </template>
    <span>{{ texto }}</span>
  </v-tooltip>

</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    texto: {
      type: String,
      default: ''
    },
    textoIcon: {
      type: String,
      default: ''
    },
    textoButton: {
      type: String,
      default: ''
    },
    fab: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    absolute: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    },
    link: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: '#'
    },
    margenes: {
      type: String,
      default: ''
    },
    idrecibir: {
      type: Number,
      default: 0
    },
    disabled: {
      default: false
    }
  },
  methods: {
    buscar(){
      if(this.idrecibir > 0) {
        this.$emit('accion',  this.idrecibir);
      }else{
        this.$emit('accion');
      }
    }
  }
}
</script>
