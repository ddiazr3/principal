import { find, filter } from 'lodash'

export function setMarcas(state, response) {
    state.permisosMarcas = response.data.permisos
    state.marcas = response.data.marcas.data
    state.totalPage = response.data.last_page
    state.page = response.data.current_page
}

export function setMarca(state, marca) {
    state.marca.nombre = marca.nombre
    state.marca.idcrypt = marca.idcrypt
    state.marca.id = marca.id
}

export function limpiarMarca(state) {
    state.marca = {
        id: 0,
        nombre: null
    }
}