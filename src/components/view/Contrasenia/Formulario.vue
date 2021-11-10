<template>
  <v-card class="px-4">
    <v-card-text>
      <v-form ref="loginForm" v-model="valid" lazy-validation style="height: 250px">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="password.pass" label="Password" :append-icon="show0?'mdi-eye':'mdi-eye-off'"  :rules="[rules.required, rules.min]"  :type="show0 ? 'text' : 'password'"required counter @click:append="show0 = !show0"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="password.confirmPassword" :append-icon="show1?'mdi-eye':'mdi-eye-off'" :rules="[rules.required, rules.min, (this.password.pass === this.password.confirmPassword) || 'Password no coinciden']" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-row>
            <v-col class="d-flex flex-row-reverse" cols="12" sm="12" >
              <v-btn block :disabled="!valid" small outlined color="info" @click="validate"> Cambiar </v-btn>
            </v-col>
          </v-row>
        </v-row>
      </v-form>
    </v-card-text>
    <dialogo :dialog="dialogoPopup" :color="colorPopup" :title="titlePopup" :msg="msgPopup" @cerrarPopup="dialogoPopup = false"></dialogo>
  </v-card>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import Dialogo from '../../Layout/App/Dialogo'

export default {

  props:{
    path: {
      type: String,
      default : null
    }
  },
  components: { Dialogo },
  data: () => ({
    password: {
      pass: null,
      confirmPassword: null
    },
    valid: true,
    show1: false,
    show0: false,
    rules: {
      required: value => !!value || "Requerido.",
      min: v => (v && v.length >= 6) || "Min 6 caracteres*"
    },
    dialogoPopup: false,
    colorPopup: "primary",
    titlePopup: "",
    msgPopup: "",
  }),
  methods: {
    ...mapMutations(['setLoading']),
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
         const url = process.env.VUE_APP_URL_API + '/api/usuarios/'+this.path
        this.setLoading(true)
        axios.post(url,{
          password : this.password.pass
        })
          .then((response) => {
            this.dialogoPopup= true
            this.colorPopup= "primary"
            this.titlePopup= "Aviso.."
            this.password.pass = null
            this.password.confirmPassword = null
            this.msgPopup= response.data.message

            if(!response.data.isFirst){
              setTimeout(function () {
                window.location.href = '/'
              },5000)
            }
          })
          .catch((e) => {
            this.dialogoPopup= true
            this.colorPopup= "error"
            this.titlePopup= "Aviso.."
            if(e.response.status == 500){
              this.msgPopup= "Comunicarse con su administrador."
              return
            }
            this.msgPopup= e.response.data.message
          }).finally((e) => {
          this.setLoading(false)
        })
      }
    },
  }
}
</script>

<style lang="sass" scoped>
  a
    color: inherit !important
</style>
