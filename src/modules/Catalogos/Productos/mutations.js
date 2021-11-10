import { find, filter } from 'lodash'

export function setProductos(state, response) {
    state.permisosProductos = response.data.permisos
    state.productos = response.data.productos.data
    state.totalPage = response.data.productos.last_page
    state.page = response.data.productos.current_page
}

export function setProducto(state, producto) {
    state.producto.nombre = producto.nombre
    state.producto.descripcion = producto.descripcion
    state.producto.codigo = producto.codigo
    state.producto.activo = producto.activo
    state.producto.proveedorid = producto.proveedorid
    state.producto.marcaid = producto.marcaid
    state.producto.lineaid = producto.lineaid
    state.producto.categoriaid = producto.categoriaid
    state.producto.empresaid = producto.empresaid
    state.producto.idcrypt = producto.idcrypt
    state.producto.id = producto.id
    state.producto.stockBodega.id = producto.stock.id
    state.producto.stockBodega.cantidad = producto.stock.cantidad
    state.producto.stockBodega.productoid = producto.stock.productoid
    state.producto.stockBodega.bodegaid = producto.stock.bodegaid
    state.producto.precioBodega.id = producto.precio.id
    state.producto.precioBodega.precio = producto.precio.precio
    state.producto.precioBodega.productoid = producto.precio.productoid
    state.producto.precioBodega.bodegaid = producto.precio.bodegaid
}

export function limpiarProductos(state) {
    state.producto = {
        nombre: null,
        descripcion: null,
        activo: true,
        codigo: null,
        proveedorid: null,
        marcaid: null,
        lineaid: null,
        categoriaid: null,
        empresaid: null,
        id: 0,
        stockBodega: {
            id: 0,
            cantidad: 0,
            productoid: 0,
            bodegaid: 0
        },
        precioBodega: {
            id: 0,
            precio: 0,
            productoid: 0,
            bodegaid: 0
        },
    }
}
