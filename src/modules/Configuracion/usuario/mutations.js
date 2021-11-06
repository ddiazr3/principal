import { find, filter } from 'lodash'

export function setUsuarios(state, response) {
    state.usuarios = response.data.usuarios.data
    state.permisosUsuarios = response.data.permisos
    state.totalPage = response.data.last_page
    state.page = response.data.current_page
}

export function setUsuario(state, usuario ) {
  state.usuario.puntoventaid = usuario.puntoventaid
  state.usuario.nombre = usuario.nombre
  state.usuario.contrasenia = usuario.password
  state.usuario.apellido = usuario.apellido
  state.usuario.correo = usuario.correo
  state.usuario.dpi = usuario.dpi
  state.usuario.direccion = usuario.direccion
  state.usuario.telefono = usuario.telefono
  state.usuario.empresaid = usuario.empresaid
  state.usuario.rolesid = usuario.rolesid
  state.usuario.idcrypt = usuario.idcrypt
  state.usuario.activo = usuario.activo
}

export function setCatalogos(state, response) {
    state.rolesUsuario = response.data.roles
    state.empresasUsuario = response.data.empresas
    state.puntosVentasUsuario = response.data.puntoVenta
}

export function limpiarUsuario(state) {
  state.usuario = {
      id: 0,
      nombre: null,
      contrasenia : null,
      apellido: null,
      correo: null,
      dpi: null,
      telefono: null,
      direccion: null,
      empresaid: null,
      rolesid: []
  }
}
