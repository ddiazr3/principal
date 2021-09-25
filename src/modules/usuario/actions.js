import axios from 'axios'

export async function getUsuarios ({ commit }) {
  const url = process.env.VUE_APP_URL_API + '/api/usuarios'
  console.log(' entro ' + url)
  axios.get(url)
    .then((response) => {
      console.log(' data ')
      console.log(response)
    })
    .catch((e) => {
      console.log(' error ')
    })
}
