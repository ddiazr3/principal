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
            if(e.response.status == 500){
              this.msgPopup= "Comunicarse con su administrador."
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
            if(e.response.status == 500){
              this.msgPopup= "Comunicarse con su administrador."
              return
            }
            throw e;
        })
}


export async function eliminarCategoria({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/categorias/' + id + '/eliminar'
    return axios.post(url)
}

export async function exportarCategoria({ commit }, data) {
  const url = process.env.VUE_APP_URL_API + '/api/categorias/exportar'
  return axios.post(url, data,{
    responseType: 'arraybuffer'
  })
}

export async function importCategoria({ commit }, data) {
  const url = process.env.VUE_APP_URL_API + '/api/categorias/import'
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
