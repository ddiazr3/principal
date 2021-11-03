export default {
    namespaced: true,
    productos: [],
    permisosProductos: [],
    producto: {
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
    },

    totalPage: 0,
    page: 1
}