import { find, filter } from 'lodash'

export function setCompras(state, response) {
  console.log(response.data)
  state.permisosCompra = response.data.permisos
  state.compras = response.data.compras.data
  state.estadosCompra = response.data.estadosCompras
  state.totalPage = response.data.compras.last_page
  state.page = response.data.compras.current_page
}


export function limpiarCompras(state) {
  state.buscar = {
    estadoid: 0,
    fechainicio: null,
    fechafin: null,
  }
}
