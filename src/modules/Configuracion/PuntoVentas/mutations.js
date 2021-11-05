import { find, filter } from 'lodash'

export function setPuntoVentas(state, response) {

    state.permisospuntoventas = response.data.permisos
    state.puntoventas = response.data.puntoventas.data
    state.totalPage = response.data.last_page
    state.page = response.data.current_page
}

export function setPuntoVenta(state, puntoventa) {
    state.productosget = puntoventa.productos
    state.puntoventa.nombre = puntoventa.puntoventa.nombre
    state.puntoventa.direccion = puntoventa.puntoventa.direccion
    state.puntoventa.telefono = puntoventa.puntoventa.telefono
    state.puntoventa.nit = puntoventa.puntoventa.nit
    state.puntoventa.idcrypt = puntoventa.puntoventa.idcrypt
    state.puntoventa.id = puntoventa.puntoventa.id
    state.puntoventa.activo = puntoventa.puntoventa.activo
    state.puntoventa.igualprincipal = puntoventa.puntoventa.igualprincipal
}


export function limpiarPuntoVenta(state) {
    state.puntoventa = {
        id: 0,
        nombre: null,
        direccion: null,
        nit: null,
        telefono: null,
        empresaid: null,
        activo: false,
        productos: [],
    }
   state.productosget = null
}
