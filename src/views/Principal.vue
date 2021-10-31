<template>
  <v-container
    id="icons-view"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <material-card
          color="success"
          full-header
        >
          <template #heading>
            <div class="pa-6 white--text">
              <div class="text-h4 font-weight-light">
                Pagina Principal
              </div>
            </div>
          </template>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from '../components/view/MaterialCard.vue'
export default {
  components: { MaterialCard },
  data: () => ({

  }),
  mounted () {
  }
}
</script>
