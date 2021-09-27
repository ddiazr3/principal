import Vue from 'vue'
import Vuex from 'vuex'
import layout from '@/modules/Layout'
import usuario from '@/modules/usuario'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        snackbar: false
    },
    mutations: {
        setSnackbar(state, bool) {
            state.snackbar = bool
        }
    },
    actions: {},
    modules: {
        layout,
        usuario
    }
})