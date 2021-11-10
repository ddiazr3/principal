import { find, filter } from 'lodash'

export function setRoles(state, response) {
    state.permisosRoles= response.data.permisos
    state.roles = response.data.roles.data
    state.totalPage = response.data.roles.last_page
    state.page = response.data.roles.current_page
}

export function setRole(state, role ) {
  state.rol.nombre = role.nombre
  state.rol.descripcion = role.descripcion
  state.rol.id = role.id
  state.rol.empresaid = role.empresaid
  state.rol.permisosIds = role.permisosIds
  state.rol.idcrypt = role.idcrypt
}

export function setCatalogos(state, response) {
    state.empresasRole = response.data.empresas
    state.modulosRole = response.data.modulosPermisos
}

export function limpiarRole(state) {
  state.rol = {
      id: 0,
      nombre: null,
      descripcion: null,
      empresaid: null,
      permisosIds: []
  }
}
