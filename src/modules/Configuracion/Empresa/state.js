export default {
    namespaced: true,
    empresas: [],
    permisosEmpresas: [],
    empresa: {
        id: 0,
        nombre: null,
        direccion: null,
        nit: null,
        telefono: null,
        logo: null,
        usuariocreacionid: null,
        activo: null,
        tienesucursal: null,
        cantidadsucursal: null,
        punto_ventas: [],
        bodega: {
            igualempresa: true,
            id: 0,
            nombre: null,
            direccion: null,
            telefono: null,
            empresaid: 0,
        }
    },
    puntoventadatosempresa: false,
    totalPage: 0,
    page: 1
}