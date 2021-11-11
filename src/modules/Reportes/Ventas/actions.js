import axios from 'axios'
const urlApi = process.env.VUE_APP_URL_API;
import CryptoJS from 'crypto-js'

export async function getVentas({ commit }, buscar) {
  const url = process.env.VUE_APP_URL_API + '/api/reportes/ventas?' + buscar
  axios.get(url)
    .then((response) => {
      commit('setVentas', response)
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

export async function exportarVenta({ commit }, data) {
  const url = process.env.VUE_APP_URL_API + '/api/reportes/ventas/exportar'
  return axios.post(url, data,{
    responseType: 'arraybuffer'
  })
}
