import { find, filter } from 'lodash'

export function setVentas(state, response) {
  state.permisosVenta = response.data.permisos
  state.ventas = response.data.ventas.data
  state.puntosventas = response.data.puntosventas
  state.estadosVentas = response.data.estadosVentas
  state.totalPage = response.data.ventas.last_page
  state.page = response.data.ventas.current_page
}


export function limpiarVentas(state) {
  state.buscar = {
    estadoid: 0,
    puntoventaid : 0,
    fechainicio: null,
    fechafin: null,
    nombrecliente: null
  }
}
