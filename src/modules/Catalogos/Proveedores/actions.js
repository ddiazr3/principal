import axios from 'axios'
const urlApi = process.env.VUE_APP_URL_API;
import CryptoJS from 'crypto-js'


export async function getProveedores({ commit }, buscar) {

    const url = process.env.VUE_APP_URL_API + '/api/proveedores?' + buscar
    axios.get(url)
        .then((response) => {
            commit('setProveedores', response)
        })
        .catch((e) => {
            if (e.response.status == 401) {
                commit('errorCatch', true, { root: true })
                return
            }
            throw e;
        })
}

export async function guardarProveedor({ commit }, proveedor) {
    const url = process.env.VUE_APP_URL_API + '/api/proveedores/'
    return axios.post(url, { proveedor })
}

export async function getProveedor({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/proveedores/' + id + '/edit';
    axios.get(url)
        .then((response) => {
            commit('setProveedor', response.data)
        })
        .catch((e) => {
            if (e.response.status == 401) {
                commit('errorCatch', true, { root: true })
                return
            }
            throw e;
        })
}


export async function eliminarProveedores({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/proveedores/' + id + '/eliminar'
    return axios.post(url)
}