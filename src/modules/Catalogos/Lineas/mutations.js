import { find, filter } from 'lodash'

export function setLineas(state, response) {
    state.permisosLineas = response.data.permisos
    state.lineas = response.data.lineas.data
    state.totalPage = response.data.last_page
    state.page = response.data.current_page
}

export function setLinea(state, linea) {
    state.linea.nombre = linea.nombre
    state.linea.marcaid = linea.marcaid
    state.linea.idcrypt = linea.idcrypt
    state.linea.id = linea.id
}

export function limpiarLinea(state) {
    state.linea = {
        id: 0,
        nombre: null,
        marcaid: null,
    }
}

export function setCatalogos(state, response) {
    state.marcas = response.data.marcas
}
