import axios from 'axios'
const urlApi = process.env.VUE_APP_URL_API;
import CryptoJS from 'crypto-js'


export async function getMarcas({ commit }, buscar) {

    const url = process.env.VUE_APP_URL_API + '/api/marcas?' + buscar
    axios.get(url)
        .then((response) => {
            commit('setMarcas', response)
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

export async function guardarMarca({ commit }, marca) {
    const url = process.env.VUE_APP_URL_API + '/api/marcas/'
    return axios.post(url, { marca })
}

export async function getMarca({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/marcas/' + id + '/edit';
    axios.get(url)
        .then((response) => {
            commit('setMarca', response.data)
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


export async function eliminarMarca({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/marcas/' + id + '/eliminar'
    return axios.post(url)
}

export async function exportarMarca({ commit }, data) {
    const url = process.env.VUE_APP_URL_API + '/api/marcas/exportar'
    return axios.post(url, data,{
      responseType: 'arraybuffer'
    })
}

export async function importMarca({ commit }, data) {
  const url = process.env.VUE_APP_URL_API + '/api/marcas/import'
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
