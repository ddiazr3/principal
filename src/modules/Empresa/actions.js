import axios from 'axios'
const urlApi =  process.env.VUE_APP_URL_API;

const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"))
export async function getEmpresas({ commit }, buscar) {

    const url = process.env.VUE_APP_URL_API + '/api/empresas?' + buscar
    axios.get(url,{
      params: {
        id:  usuarioLogueado.idUsuarioCrypt
      }
    })
        .then((response) => {
            commit('setEmpresas', response)
        })
        .catch((e) => {
          if(e.response.status == 401){
            commit('errorCatch', { root: true })
            return
          }
          throw e;
        })
}

export async function guardarEmpresa({ commit }, empresa) {
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
          if(e.response.status == 401){
            commit('errorCatch', { root: true })
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
