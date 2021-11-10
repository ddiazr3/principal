import axios from 'axios'
const urlApi = process.env.VUE_APP_URL_API;
import CryptoJS from 'crypto-js'


export async function getEmpresas({ commit }, buscar) {

    const url = process.env.VUE_APP_URL_API + '/api/empresas?' + buscar
    axios.get(url)
        .then((response) => {
            commit('setEmpresas', response)
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

export async function guardarEmpresa({ commit }, empresa) {
    const usuarioLogueado = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("usuario"), '111222333444').toString(CryptoJS.enc.Utf8))

    const url = process.env.VUE_APP_URL_API + '/api/empresas/'
    empresa.usuariocreacionid = usuarioLogueado.idUsuarioCrypt
    return axios.post(url, { empresa })
}

export async function getEmpresa({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/empresas/' + id + '/edit';
    axios.get(url)
        .then((response) => {
            commit('setEmpresa', response.data)
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


export async function eliminarEmpresa({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/empresas/' + id + '/eliminar'
    return axios.post(url)
}

export async function activarEmpresa({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/empresas/' + id + '/activar'
    return axios.post(url)
}
