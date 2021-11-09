import axios from 'axios'
const urlApi = process.env.VUE_APP_URL_API;
import CryptoJS from 'crypto-js'


export async function saveVenta({ commit }, venta) {
    const url = process.env.VUE_APP_URL_API + '/api/ventas'
    return axios.post(url,venta)

}
