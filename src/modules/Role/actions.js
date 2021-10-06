import axios from 'axios'
const urlApi =  process.env.VUE_APP_URL_API;

const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"))

export async function getRoles ({ commit }, buscar) {

  const url = urlApi + '/api/roles?' + buscar
  axios.get(url,{
    params: {
      id:  usuarioLogueado.idUsuarioCrypt
    }
  })
      .then((response) => {
          commit('setRoles', response)
      })
      .catch((e) => {
          console.log(e)
          console.log(' error ')
      })
}

export async function guardarRole({ commit }, role) {
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
      console.log(e)
      console.log(' error ')
    })
}

export async function getCatalogos({ commit }) {

    const url = urlApi + '/api/roles/catalogos'
  commit('setLoading', true, { root: true })
    axios.get(url,{
      params: {
        id:  usuarioLogueado.idUsuarioCrypt
      }
    })
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

export async function eliminarRol({ commit }, id) {
  const url = process.env.VUE_APP_URL_API + '/api/roles/'+id+'/eliminar'
  return axios.post(url)
}


/* ejemplo de como exportar documentos PDF
    export async function exportarUsuarioPDF({ commit }) {
      const url = process.env.VUE_APP_URL_API + '/api/usuarios/exportarPDF'
      return axios.post(url, { nombre: "DANY DIAZ"} , { responseType: 'blob'  })
    }
*/
