import Vue from 'vue'
import Vuex from 'vuex'
import layout from '@/modules/Layout'
import usuario from '@/modules/usuario'
import roles from '@/modules/Role'
import empresa from '@/modules/Empresa'
import axios from 'axios'
Vue.use(Vuex)


const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"))
// usuarioLogueado.token.original.token

axios.defaults.headers.common = {
  'Authorization': 'bearer ' +usuarioLogueado.token.original.token
};
export default new Vuex.Store({
    state: {
        loading: false,
    },
    mutations: {
        setLoading(state, bool) {
            state.loading = bool
        },
        errorCatch(state){
          localStorage.removeItem("bool")
          localStorage.removeItem("modulo")
          localStorage.removeItem("usuario")
          window.location.href = '/'
        }
    },
    actions: {},
    modules: {
        layout,
        usuario,
        empresa,
        roles
    }
})
