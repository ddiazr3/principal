<template>
<v-row>
  <v-col cols="12" md="2" v-for="module in modules" :key="module.id">
    <v-card
      max-width="344"    >
      <v-card-actions>
        <v-btn
          color="green lighten-2"
          text
        >
          {{ module.nombre }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-expand-transition>
        <div>
          <v-divider></v-divider>
          <v-card-text>
            <v-checkbox v-for="per in module.permisos" :key="per.id"
              class="checkbox-role"
              v-model="role.permisosIds"
              :label="per.nombrefriendly"
              :value="per.id"
            ></v-checkbox>
         </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    modules: {
      type: Array,
      default: null
    },
    role: {
      default: []
    }
  }
}
</script>
<style scoped>
.checkbox-role {
  margin-top: 0px;
}
</style>
