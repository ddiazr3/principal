import Vue from 'vue'
import Vuex from 'vuex'
import layout from '@/modules/Layout'
import usuario from '@/modules/usuario'
import roles from '@/modules/Role'
import empresa from '@/modules/Empresa'
import puntoventasinstance from '@/modules/PuntoVentas'

//catalogos
import marca from '@/modules/Catalogos/Marcas'
import linea from '@/modules/Catalogos/Lineas'
import categoria from '@/modules/Catalogos/Categorias'
import proveedor from '@/modules/Catalogos/Proveedores'

import axios from 'axios'
import CryptoJS from 'crypto-js'

Vue.use(Vuex)

const usuarioLogueado = localStorage.getItem("usuario") != undefined ? JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("usuario"), '111222333444').toString(CryptoJS.enc.Utf8)) : null
const token = usuarioLogueado ? usuarioLogueado.token.original.token : null
    // usuarioLogueado.token.original.token

axios.defaults.headers.common = {
    'Authorization': 'bearer ' + token
};

export default new Vuex.Store({
    state: {
        loading: false,
    },
    mutations: {
        setLoading(state, bool) {
            state.loading = bool
        },
        errorCatch(state, bool) {
            const url = process.env.VUE_APP_URL_API + '/api/usuarios/logout'

            axios.post(url)
                .then((response) => {})
                .catch((e) => {}).finally((e) => {

                }).finally((f) => {
                    localStorage.removeItem("bool")
                    localStorage.removeItem("modulo")
                    localStorage.removeItem("usuario")
                    localStorage.removeItem("validarpath")
                    window.location.href = '/'

                })


        }
    },
    actions: {},
    modules: {
        layout,
        usuario,
        empresa,
        puntoventasinstance,
        roles,
        marca,
        linea,
        categoria,
        proveedor
    }
})