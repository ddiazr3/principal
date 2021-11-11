import axios from 'axios'
const urlApi = process.env.VUE_APP_URL_API;
import CryptoJS from 'crypto-js'

export async function getCompras({ commit }, buscar) {

  const url = process.env.VUE_APP_URL_API + '/api/reportes/compras?' + buscar

  axios.get(url)
    .then((response) => {
      commit('setCompras', response)
    })
    .catch((e) => {
      console.log(e)
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

export async function exportarCompra({ commit }, data) {
  const url = process.env.VUE_APP_URL_API + '/api/reportes/compras/exportar'
  return axios.post(url, data,{
    responseType: 'arraybuffer'
  })
}
