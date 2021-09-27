import axios from 'axios'

export async function getUsuarios({ commit }, buscar) {

    const url = process.env.VUE_APP_URL_API + '/api/usuarios?' + buscar
    axios.get(url)
        .then((response) => {
            commit('setUsuarios', response)
        })
        .catch((e) => {
            console.log(e)
            console.log(' error ')
        })
}


export async function guardarUsuario({ commit }, usuario) {

    const url = process.env.VUE_APP_URL_API + '/api/usuarios/'
    console.log("guardando usuario")
    axios.post(url, {
            usuario
        })
        .then((response) => {
            console.log(response)
        })
        .catch((e) => {
            context.commit('setSnackbar', true, { root: true })
            console.log(e)
        })
}

export async function getCatalogos({ commit }) {

    const url = process.env.VUE_APP_URL_API + '/api/usuarios/catalogos'
    axios.get(url)
        .then((response) => {
            commit('setCatalogos', response)
        })
        .catch((e) => {
            console.log(e)
            console.log(' error ')
        })
}