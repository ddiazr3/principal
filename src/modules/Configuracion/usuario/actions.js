import axios from 'axios'
import CryptoJS from 'crypto-js'



export async function getUsuarios({ commit }, buscar) {


    const url = process.env.VUE_APP_URL_API + '/api/usuarios?' + buscar

    axios.get(url)
        .then((response) => {
            commit('setUsuarios', response)
        })
        .catch((e) => {

            if (e.response.status === 401) {
                commit('errorCatch', true, { root: true })
                return
            }
            throw e;
        })
}

export async function guardarUsuario({ commit }, usuario) {
    const usuarioLogueado = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("usuario"), '111222333444').toString(CryptoJS.enc.Utf8))

    usuario.usuariocreacionid = usuarioLogueado.idUsuarioCrypt
    const url = process.env.VUE_APP_URL_API + '/api/usuarios/'
    return axios.post(url, { usuario })
}

export async function getUsuario({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/usuarios/' + id + '/edit';
    axios.get(url)
        .then((response) => {
            commit('setUsuario', response.data)
        })
        .catch((e) => {
            if (e.response.status == 401) {
                commit('errorCatch', true, { root: true })
                return
            }
            throw e;
        })
    commit('setUsuario', id)
}

export async function getCatalogos({ commit }) {

    const url = process.env.VUE_APP_URL_API + '/api/usuarios/catalogos'
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
            throw e;
        }).finally(
            commit('setLoading', false, { root: true })
        )
}

export async function eliminarUsuario({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/usuarios/' + id + '/eliminar'
    return axios.post(url)
}

export async function activarUsuario({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/usuarios/' + id + '/activar'
    return axios.post(url)
}

export async function exportarUsuario({ commit }, data) {
    const url = process.env.VUE_APP_URL_API + '/api/usuarios/exportar'
    return axios.post(url, data, { responseType: 'arraybuffer' })
}


/* ejemplo de como exportar documentos PDF
    export async function exportarUsuarioPDF({ commit }) {
      const url = process.env.VUE_APP_URL_API + '/api/usuarios/exportarPDF'
      return axios.post(url, { nombre: "DANY DIAZ"} , { responseType: 'blob'  })
    }
*/