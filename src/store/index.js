import Vue from 'vue'
import Vuex from 'vuex'
import layout from '@/modules/Layout'
import usuario from '@/modules/usuario'
import roles from '@/modules/Role'
import empresa from '@/modules/Empresa'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)


const dataState = createPersistedState({
    paths: ['items', 'userLoged', 'isLogged']
})

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
    },
    plugins: [dataState]
})