import { find, filter } from 'lodash'

export function setPuntoVentas(state, response) {

    state.permisospuntoventas = response.data.permisos
    state.puntoventas = response.data.puntoventas.data
    state.totalPage = response.data.last_page
    state.page = response.data.current_page
}

export function setPuntoVenta(state, puntoventa) {
    state.puntoventa.nombre = puntoventa.nombre
    state.puntoventa.direccion = puntoventa.direccion
    state.puntoventa.telefono = puntoventa.telefono
    state.puntoventa.nit = puntoventa.nit
    state.puntoventa.idcrypt = puntoventa.idcrypt
    state.puntoventa.id = puntoventa.id
    state.puntoventa.activo = puntoventa.activo
    state.puntoventa.igualprincipal = puntoventa.igualprincipal
}


export function limpiarPuntoVenta(state) {
    state.puntoventa = {
        id: 0,
        nombre: null,
        direccion: null,
        nit: null,
        telefono: null,
        empresaid: null,
        activo: false
    }
}