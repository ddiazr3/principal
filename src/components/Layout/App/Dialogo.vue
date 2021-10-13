<template>
 <v-app id="inspire">
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="390"
        >
          <template v-slot:default="dialog">
              <v-card>
                <v-toolbar
                  :color="color"
                  dark
                >{{ title }}</v-toolbar>
                <v-card-text>
                  <div class="text-h5">
                    {{ msg }}
                  </div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                    text
                    @click="$emit('cerrarPopup')"
                  >Close</v-btn>
                </v-card-actions>
              </v-card>
            </template>
        </v-dialog>
      </v-row>
    </v-app>
</template>
<script>


export default({
   props: {
    dialog: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "primary"
    },
    title: {
      type: String,
      default: null
    },
    msg: {
      type: String,
      default: null
    },
  }
})
</script>
