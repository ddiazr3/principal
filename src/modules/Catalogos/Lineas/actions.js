import axios from 'axios'
const urlApi = process.env.VUE_APP_URL_API;
import CryptoJS from 'crypto-js'


export async function getLineas({ commit }, buscar) {

    const url = process.env.VUE_APP_URL_API + '/api/lineas?' + buscar
    axios.get(url)
        .then((response) => {
            commit('setLineas', response)
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

export async function guardarLinea({ commit }, linea) {
    const url = process.env.VUE_APP_URL_API + '/api/lineas/'
    return axios.post(url, { linea })
}

export async function getLinea({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/lineas/' + id + '/edit';
    axios.get(url)
        .then((response) => {
            commit('setLinea', response.data)
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


export async function eliminarLinea({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/lineas/' + id + '/eliminar'
    return axios.post(url)
}


export async function getCatalogos({ commit }) {

    const url = urlApi + '/api/lineas/catalogos'
    commit('setLoading', true, { root: true })
    axios.get(url)
        .then((response) => {
            commit('setCatalogos', response)

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
        }).finally(
            commit('setLoading', false, { root: true })
        )
}

export async function exportarLinea({ commit }, data) {
  const url = process.env.VUE_APP_URL_API + '/api/lineas/exportar'
  return axios.post(url, data,{
    responseType: 'arraybuffer'
  })
}

export async function eliminarLineas({ commit }, id) {
  const url = process.env.VUE_APP_URL_API + '/api/lineas/' + id + '/eliminar'
  return axios.post(url)
}

export async function importLinea({ commit }, data) {
  const url = process.env.VUE_APP_URL_API + '/api/lineas/import'
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
