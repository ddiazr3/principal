import axios from 'axios'
const urlApi = process.env.VUE_APP_URL_API;
import CryptoJS from 'crypto-js'


export async function getProductos({ commit }, buscar) {

    const url = process.env.VUE_APP_URL_API + '/api/productos?' + buscar
    axios.get(url)
        .then((response) => {
            commit('setProductos', response)
        })
        .catch((e) => {
            if (e.response.status == 401) {
                commit('errorCatch', true, { root: true })
                return
            }
            throw e;
        })
}

export async function guardarProducto({ commit }, producto) {
    const url = process.env.VUE_APP_URL_API + '/api/productos/'
    return axios.post(url, { producto })
}

export async function getProducto({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/productos/' + id + '/edit';
    axios.get(url)
        .then((response) => {
            commit('setProducto', response.data)
        })
        .catch((e) => {
            if (e.response.status == 401) {
                commit('errorCatch', true, { root: true })
                return
            }
            throw e;
        })
}


export async function eliminarProductos({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/productos/' + id + '/eliminar'
    return axios.post(url)
}

export async function activarProducto({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/productos/' + id + '/activar'
    return axios.post(url)
}

export async function exportarProducto({ commit }, data) {
  const url = process.env.VUE_APP_URL_API + '/api/productos/exportar'
  return axios.post(url, data,{
    responseType: 'arraybuffer'
  })
}

export async function importProducto({ commit }, data) {
  const url = process.env.VUE_APP_URL_API + '/api/productos/import'
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
