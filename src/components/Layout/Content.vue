<template>
  <v-main style="padding: 75px 0px 0px 0px !important">
    <div v-if="!$online">
      <v-alert
        dense
        border="left"
        type="warning"
        class="text-center"
      >
       <h4> Alerta <strong>No tiene Internet</strong></h4>
      </v-alert>
    </div>
    <v-container fluid>
      <router-view />
    </v-container>
  </v-main>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  watch: {
    $online: function (){
      this.setLoading(!this.$online)
    }
  },
  methods: {
    ...mapMutations(['setLoading'])
  }
}
</script>
