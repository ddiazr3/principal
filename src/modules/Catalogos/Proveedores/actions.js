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
          if(e.response.status == 500){
            this.msgPopup= "Comunicarse con su administrador."
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
          if(e.response.status == 500){
            this.msgPopup= "Comunicarse con su administrador."
            return
          }
            throw e;
        })
}


export async function eliminarProveedores({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/proveedores/' + id + '/eliminar'
    return axios.post(url)
}

export async function exportarProveedor({ commit }, data) {
  const url = process.env.VUE_APP_URL_API + '/api/proveedores/exportar'
  return axios.post(url, data,{
    responseType: 'arraybuffer'
  })
}

export async function importProveedor({ commit }, data) {
  const url = process.env.VUE_APP_URL_API + '/api/proveedores/import'
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
