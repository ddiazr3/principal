<template>
<div id="app">
  <v-app>
        <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px" :retain-focus="false" >
            <div>
                <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
                    <v-tab>
                        <div class="caption py-1">Contrasenia Nueva</div>
                    </v-tab>
                    <v-tab-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="loginForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="password" label="Password" :append-icon="show0?'mdi-eye':'mdi-eye-off'"  :rules="[rules.required, rules.min]"  :type="show0 ? 'text' : 'password'"required counter @click:append="show0 = !show0"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="confirmPassword" :append-icon="show1?'mdi-eye':'mdi-eye-off'" :rules="[rules.required, rules.min, (this.password === this.confirmPassword) || 'Password no coinciden']" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
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
       // const url = process.env.VUE_APP_URL_API + '/api/usuarios/login'
        this.setLoading(true)
         axios.post(url,{
           password : this.password,
           confirmPassword: this.confirmPassword
         })
        .then((response) => {
          // window.location.href = '/';
        })
        .catch((e) => {
            alert("datos incorrectos")
        }).finally((e) => {
          this.setLoading(false)
        })
      }
    },

  },
  data: () => ({
    tab: 0,
    dialog: true,
    verify: "",
    valid: true,
    confirmPassword: "",
    password: "",
    show1: false,
    show0: false,
    rules: {
      required: value => !!value || "Requerido.",
      min: v => (v && v.length >= 6) || "Min 6 caracteres*"
    }
  })
})
</script>

