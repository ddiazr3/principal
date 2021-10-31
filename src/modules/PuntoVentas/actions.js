import axios from 'axios'
const urlApi = process.env.VUE_APP_URL_API;
import CryptoJS from 'crypto-js'


export async function getPuntoVentas({ commit }, buscar) {

    const url = process.env.VUE_APP_URL_API + '/api/puntoventas?' + buscar

    axios.get(url)
        .then((response) => {
            commit('setPuntoVentas', response)
        })
        .catch((e) => {
            if (e.response.status == 401) {
                commit('errorCatch', true, { root: true })
                return
            }
            throw e;
        })
}

export async function guardarPuntoVenta({ commit }, puntoventa) {
    const url = process.env.VUE_APP_URL_API + '/api/puntoventas/'
    return axios.post(url, { puntoventa })
}

export async function getPuntoVenta({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/puntoventas/' + id + '/edit';
    axios.get(url)
        .then((response) => {
            commit('setPuntoVenta', response.data)
        })
        .catch((e) => {
            if (e.response.status == 401) {
                commit('errorCatch', true, { root: true })
                return
            }
            throw e;
        })
}


export async function eliminarPuntoVentas({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/puntoventas/' + id + '/eliminar'
    return axios.post(url)
}

export async function activarPuntoVentas({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/puntoventas/' + id + '/activar'
    return axios.post(url)
}