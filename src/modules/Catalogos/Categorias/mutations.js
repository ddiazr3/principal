import { find, filter } from 'lodash'

export function setCategorias(state, response) {
    state.permisosCategorias = response.data.permisos
    state.categorias = response.data.categorias.data
    state.totalPage = response.data.categorias.last_page
    state.page = response.data.categorias.current_page
}

export function setCategoria(state, categoria) {
    state.categoria.nombre = categoria.nombre
    state.categoria.idcrypt = categoria.idcrypt
    state.categoria.id = categoria.id
}

export function limpiarCategoria(state) {
    state.categoria = {
        id: 0,
        nombre: null
    }
}
