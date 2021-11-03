import { find, filter } from 'lodash'

export function setEmpresas(state, response) {
    state.permisosEmpresas = response.data.permisos
    state.empresas = response.data.empresas.data
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
    state.empresa.activo = empresa.activo
    state.empresa.tienesucursal = empresa.tienesucursal
    state.empresa.cantidadsucursal = empresa.cantidadsucursal
    state.empresa.punto_ventas = empresa.puntoventas
    state.empresa.bodega.id = empresa.bodega.id
    state.empresa.bodega.nombre = empresa.bodega.nombre
    state.empresa.bodega.direccion = empresa.bodega.direccion
    state.empresa.bodega.telefono = empresa.bodega.telefono
    state.empresa.bodega.igualempresa = empresa.bodega.igualempresa
}

export function datosIguales(state, value) {
    state.puntoventadatosempresa = value
}



export function limpiarEmpresa(state) {
    state.usuario = {
        id: 0,
        nombre: null,
        direccion: null,
        nit: null,
        telefono: null,
        logo: null,
        bodega: {
            igualempresa: true,
            id: 0,
            nombre: null,
            direccion: null,
            telefono: null,
            empresaid: 0,
        }
    }
}