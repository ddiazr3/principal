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
  commit('setLoading', true, { root: true })
    axios.get(url)
        .then((response) => {
            commit('setCatalogos', response)

        })
        .catch((e) => {
            console.log(e)
            console.log(' error ')
        }).finally(
          commit('setLoading', false, { root: true })
       )
}

export async function eliminarUsuario({ commit }, id) {
  const url = process.env.VUE_APP_URL_API + '/api/usuarios/'+id+'/eliminar'
  return axios.post(url)
}

export async function activarUsuario({ commit }, id) {
  const url = process.env.VUE_APP_URL_API + '/api/usuarios/'+id+'/activar'
  return axios.post(url)
}

export async function exportarUsuario({ commit }, data) {
  const url = process.env.VUE_APP_URL_API + '/api/usuarios/exportar'
  return axios.post(url, data , { responseType: 'arraybuffer' })
}


/* ejemplo de como exportar documentos PDF
    export async function exportarUsuarioPDF({ commit }) {
      const url = process.env.VUE_APP_URL_API + '/api/usuarios/exportarPDF'
      return axios.post(url, { nombre: "DANY DIAZ"} , { responseType: 'blob'  })
    }
*/
