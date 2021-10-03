import axios from 'axios'

export async function getEmpresas({ commit }, buscar) {

    const url = process.env.VUE_APP_URL_API + '/api/empresas?' + buscar
    axios.get(url)
        .then((response) => {
            commit('setEmpresas', response)
        })
        .catch((e) => {
            console.log(e)
            console.log(' error ')
        })
}

export async function guardarEmpresa({ commit }, empresa) {
    const url = process.env.VUE_APP_URL_API + '/api/empresas/'
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
            console.log(' error ')
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
