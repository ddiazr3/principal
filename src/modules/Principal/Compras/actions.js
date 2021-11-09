import axios from 'axios'
const urlApi = process.env.VUE_APP_URL_API;
import CryptoJS from 'crypto-js'


export async function saveCompra({ commit }, compra) {
  const url = process.env.VUE_APP_URL_API + '/api/compras'
  return axios.post(url,compra)

}
