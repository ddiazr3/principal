import { find, filter } from 'lodash'

export function setUsuarios(state, response) {
    state.usuarios = response.data.data
    state.totalPage = response.data.last_page
    state.page = response.data.current_page
}

export function setUsuario(state, usuario ) {
  state.usuario.nombre = usuario.nombre
  state.usuario.apellido = usuario.apellido
  state.usuario.correo = usuario.correo
  state.usuario.dpi = usuario.dpi
  state.usuario.direccion = usuario.direccion
  state.usuario.telefono = usuario.telefono
  state.usuario.empresaid = usuario.empresaid
  state.usuario.rolesid = usuario.rolesid
  state.usuario.idcrypt = usuario.idcrypt
}

export function setCatalogos(state, response) {
    state.rolesUsuario = response.data.roles
    state.empresasUsuario = response.data.empresas
}

export function limpiarUsuario(state) {
  state.usuario = {
      id: 0,
      nombre: null,
      apellido: null,
      correo: null,
      dpi: null,
      telefono: null,
      direccion: null,
      empresaid: null,
      rolesid: []
  }
}
