import axios from 'axios'
const urlApi = process.env.VUE_APP_URL_API;
import CryptoJS from 'crypto-js'


export async function getCategorias({ commit }, buscar) {

    const url = process.env.VUE_APP_URL_API + '/api/categorias?' + buscar
    axios.get(url)
        .then((response) => {
            commit('setCategorias', response)
        })
        .catch((e) => {
            if (e.response.status == 401) {
                commit('errorCatch', true, { root: true })
                return
            }
            throw e;
        })
}

export async function guardarCategoria({ commit }, categoria) {
    const url = process.env.VUE_APP_URL_API + '/api/categorias/'
    return axios.post(url, { categoria })
}

export async function getCategoria({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/categorias/' + id + '/edit';
    axios.get(url)
        .then((response) => {
            commit('setCategoria', response.data)
        })
        .catch((e) => {
            if (e.response.status == 401) {
                commit('errorCatch', true, { root: true })
                return
            }
            throw e;
        })
}


export async function eliminarCategorias({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/categorias/' + id + '/eliminar'
    return axios.post(url)
}