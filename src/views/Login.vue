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
                                          <a>Olvido la contraseña</a>
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
</div>
</template>
<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
export default ({

  methods: {
     ...mapMutations(['setLoading']),
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
        const url = process.env.VUE_APP_URL_API + '/api/usuarios/login'
        this.setLoading(true)
         axios.post(url,{
           password : this.loginPassword,
           correo: this.loginEmail
         })
        .then((response) => {

            localStorage.setItem("bool", true)
            localStorage.setItem("modulo", this.$CryptoJS.AES.encrypt(JSON.stringify(response.data.modulos),this.$keyCryp).toString())
            localStorage.setItem("usuario", this.$CryptoJS.AES.encrypt(JSON.stringify(response.data.usuario),this.$keyCryp).toString())
            localStorage.setItem("validarpath", this.$CryptoJS.AES.encrypt(JSON.stringify(response.data.validarMP),this.$keyCryp).toString())
           window.location.href = '/';
        })
        .catch((e) => {
           console.log(e)
            alert("datos incorrectos")
        }).finally((e) => {
          this.setLoading(false)
        })
      }
    },

  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
        {name:"Login", icon:"mdi-account"}
    ],
    valid: true,
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

