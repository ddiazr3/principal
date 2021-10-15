<template>
<div id="app">
  <v-app>
        <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px" :retain-focus="false">
            <div>
                <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
                    <v-tab>
                        <v-icon large>{{ tabs[0].icon }}</v-icon>
                        <div class="caption py-1">{{ tabs[0].name }}</div>
                    </v-tab>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="loginForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="Correo" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginPassword" :append-icon="show1?'mdi-eye':'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Contraseña" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                      <v-row>
                                        <v-col cols="12" sm="6">
                                          <a @click="dialogoCorreo">Olvido la contraseña</a>
                                        </v-col>
                                        <v-col class="d-flex flex-row-reverse" cols="12" sm="6" >
                                            <v-btn block :disabled="!valid" small outlined color="info" @click="validate"> Ingresar </v-btn>
                                        </v-col>
                                      </v-row>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-dialog>
    </v-app>


    <v-app id="inspire">
      <v-row justify="center">
        <v-dialog
          v-model="dialog2"
          persistent
          max-width="390"
        >
          <template v-slot:default="dialog">
              <v-card>
                <v-toolbar
                  color="primary"
                  dark
                >Ingrese su Email</v-toolbar>
                <v-card-text>
                  <div class="text-h2 pa-12">
                      <v-form ref="loginFormPass" v-model="validCorreo" lazy-validation>
                        <v-text-field label="Email" v-model="correoContrasenia" :rules="loginEmailRules" required></v-text-field>
                      </v-form>
                  </div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                    text
                    @click="enviarCorreo" :disabled="!validCorreo"
                  >Enviar</v-btn>
                  <v-btn
                    text
                    @click="cerrarDialogo"
                  >Close</v-btn>
                </v-card-actions>
              </v-card>
            </template>
        </v-dialog>
      </v-row>
    </v-app>

    <dialogo :dialog="dialogoPopup" :color="colorPopup" :title="titlePopup" :msg="msgPopup" @cerrarPopup="dialogoPopup = false"></dialogo>

</div>
</template>
<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
import Dialogo from '../components/Layout/App/Dialogo.vue'
export default ({

  components: {
      Dialogo
  },

  methods: {
     ...mapMutations(['setLoading']),
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
        const url = process.env.VUE_APP_URL_API + '/api/usuarios/login'
        this.setLoading(true)

        console.log("pass "+url)

         axios.post(url,{
           password : this.loginPassword,
           correo: this.loginEmail
         })
        .then((response) => {

            localStorage.setItem("bool", true)
            localStorage.setItem("modulo", this.$CryptoJS.AES.encrypt(JSON.stringify(response.data.modulos),this.$keyCryp).toString())
            localStorage.setItem("usuario", this.$CryptoJS.AES.encrypt(JSON.stringify(response.data.usuario),this.$keyCryp).toString())
            localStorage.setItem("validarpath", this.$CryptoJS.AES.encrypt(JSON.stringify(response.data.validarMP),this.$keyCryp).toString())

          if(response.data.isPrimeraVes){
            //window.location.href = '/bienvenida/'+response.data.tokenR;
            let ur = response.data.tokenR;
            this.$router.push( { path: '/bienvenida/'+ur })
           // this.$router.go({ path:  ur})
          }else{
            window.location.href = '/';
          }

        })
        .catch((e) => {
           console.log(e)
          this.dialogoPopup= true
          this.colorPopup= "error"
          this.titlePopup= "Aviso.."
          this.msgPopup= e.response.data.message
        }).finally((e) => {
          this.setLoading(false)
        })
      }
    },
    enviarCorreo(){
       if (this.$refs.loginFormPass.validate()) {
           const url = process.env.VUE_APP_URL_API + '/api/usuarios/confirmacioncorreo'
           this.setLoading(true)
         axios.post(url,{
           correo: this.correoContrasenia
         })
        .then((response) => {
          this.dialogoPopup= true
          this.colorPopup= "primary"
          this.titlePopup= "Aviso.."
          this.dialog2 = false
          this.correoContrasenia = null
          this.msgPopup= response.data.message

        })
        .catch((e) => {
            this.dialogoPopup= true
            this.colorPopup= "error"
            this.titlePopup= "Aviso.."
            this.msgPopup= e.response.data.message
        }).finally((e) => {
          this.setLoading(false)
        })
       }
    },
    dialogoCorreo(){
      this.dialog2 = true
    },
    cerrarDialogo(){
      this.dialog2 = false
    }

  },
  data: () => ({

    dialogoPopup: false,
    colorPopup: "primary",
    titlePopup: "",
    msgPopup: "",

    dialog: true,
    correoContrasenia: null,
    dialog2: false,
    tab: 0,
    tabs: [
        {name:"Login", icon:"mdi-account"}
    ],
    valid: true,
    validCorreo: true,
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "No es un correo valido"
    ],
    show1: false,
    rules: {
      required: value => !!value || "Requerido.",
      min: v => (v && v.length >= 6) || "Min 6 caracteres*"
    }
  })
})
</script>

