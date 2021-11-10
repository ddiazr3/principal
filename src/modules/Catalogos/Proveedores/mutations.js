import { find, filter } from 'lodash'

export function setProveedores(state, response) {
    state.permisosProveedores = response.data.permisos
    state.proveedores = response.data.proveedores.data
    state.totalPage = response.data.proveedores.last_page
    state.page = response.data.proveedores.current_page
}

export function setProveedor(state, proveedor) {
    state.proveedor.nombre = proveedor.nombre
    state.proveedor.direccion = proveedor.direccion
    state.proveedor.telefono = proveedor.telefono
    state.proveedor.idcrypt = proveedor.idcrypt
    state.proveedor.id = proveedor.id
}

export function limpiarProveedor(state) {
    state.proveedor = {
        id: 0,
        nombre: null,
        direccion: null,
        telefono: null,
    }
}
