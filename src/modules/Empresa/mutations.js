import { find, filter } from 'lodash'

export function setEmpresas(state, response) {
    state.empresas = response.data.data
    state.totalPage = response.data.last_page
    state.page = response.data.current_page
}

export function setEmpresa(state, empresa) {
    state.empresa.nombre = empresa.nombre
    state.empresa.direccion = empresa.direccion
    state.empresa.telefono = empresa.telefono
    state.empresa.nit = empresa.nit
    state.empresa.log = empresa.log
    state.empresa.idcrypt = empresa.idcrypt
    state.empresa.id = empresa.id
}


export function limpiarEmpresa(state) {
    state.usuario = {
        id: 0,
        nombre: null,
        direccion: null,
        nit: null,
        telefono: null,
        logo: null
    }
}
