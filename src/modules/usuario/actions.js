import axios from 'axios'

export async function getUsuarios ({ commit }, buscar) {

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
  console.log("guardando usuario")
  console.log(usuario)
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
      console.log(e)
      console.log(' error ')
    })
   commit('setUsuario', id)
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
