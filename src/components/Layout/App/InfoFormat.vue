<template>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
<!--        <v-tooltip bottom>-->
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            style="margin-top: 10px"
            color="blue"
            dark
            fab
            small
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-comment-question</v-icon>
          </v-btn>
        </template>
<!--          <span>Formato del Archivo</span>-->
<!--        </v-tooltip>-->

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Formato para {{ title }}
          </v-card-title>

          <v-card-text style="margin-top: 15px">
            <v-simple-table dense>
              <thead>
                <tr>
                  <th style="border: solid #e0e0e0 1px;"  v-for="h in head" class="text-center" v-text="h"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(bo,index) in body">
                  <th style="border: solid #e0e0e0 1px; color: #999999" class="text-center">{{ index + 2 }}</th>
                  <td style="border: solid #e0e0e0 1px" v-for="b in bo" class="text-left" v-text="b"></td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>
<script>


export default({
  props: {
    title: {
      type: String,
      default: null
    },
    head: {
      type: Array,
      default: []
    },
    body: {
      type: Array,
      default: []
    }
  },
  data: () => ({
    dialog: false
  }),
})
</script>
