import axios from 'axios'
const urlApi = process.env.VUE_APP_URL_API;
import CryptoJS from 'crypto-js'



export async function getRoles({ commit }, buscar) {

    const url = urlApi + '/api/roles?' + buscar
    axios.get(url)
        .then((response) => {
            commit('setRoles', response)
        })
        .catch((e) => {
            if (e.response.status == 401) {
                //commit('errorCatch', true, { root: true })
                commit('errorCatch', true, { root: true })
                return
            }
            throw e;
        })
}

export async function guardarRole({ commit }, role) {
  const usuarioLogueado = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("usuario"),'111222333444').toString(CryptoJS.enc.Utf8))

  const url = urlApi + '/api/roles/'
    role.usuariocreacionid = usuarioLogueado.idUsuarioCrypt
    return axios.post(url, { role })
}

export async function getRole({ commit }, id) {
    const url = urlApi + '/api/roles/' + id + '/edit';
    axios.get(url)
        .then((response) => {
            commit('setRole', response.data)
        })
        .catch((e) => {
            if (e.response.status == 401) {
                commit('errorCatch', true, { root: true })
                return
            }
            throw e;
        })
}

export async function getCatalogos({ commit }) {

    const url = urlApi + '/api/roles/catalogos'
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

export async function eliminarRol({ commit }, id) {
    const url = process.env.VUE_APP_URL_API + '/api/roles/' + id + '/eliminar'
    return axios.post(url)
}


/* ejemplo de como exportar documentos PDF
    export async function exportarUsuarioPDF({ commit }) {
      const url = process.env.VUE_APP_URL_API + '/api/usuarios/exportarPDF'
      return axios.post(url, { nombre: "DANY DIAZ"} , { responseType: 'blob'  })
    }
*/
