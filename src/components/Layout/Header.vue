<template>
  <v-app-bar
    id="default-app-bar"
    app
    absolute
    class="v-bar--underline"
    color="transparent"
    :clipped-left="$vuetify.rtl"
    :clipped-right="!$vuetify.rtl"
    height="50"
    style="left:0px !important"
    flat
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="drawerMinimizados"
    />

    <drawer-toggle class="hidden-sm-and-down" />

    <v-toolbar-title
      class="font-weight-light text-h5"
      v-text="''"
    />

    <v-spacer />

    <!--search class="hidden-sm-and-down" /!-->

    <compras v-if="compra.detalleCompras.length" />

    <account />
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import DrawerToggle from './widgets/DrawerToggle'
import Search from './widgets/Search'
import GoHome from './widgets/GoHome'
import Notifications from './widgets/Notifications'
import Compras from './widgets/Compras'
import Account from './widgets/Account'

export default {
  components: {
    DrawerToggle, Search, GoHome, Notifications, Account, Compras
  },

  computed: {
    ...mapState('compras',['compra'])
  },
  methods: {
    ...mapMutations('layout', ['drawerMinimizados'])
  }
}
</script>
