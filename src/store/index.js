import Vue from 'vue'
import Vuex from 'vuex'
import layout from '@/modules/Layout'
import usuario from '@/modules/usuario'
import roles from '@/modules/Role'
import empresa from '@/modules/Empresa'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false,
    },
    mutations: {
        setLoading(state, bool) {
            state.loading = bool
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
