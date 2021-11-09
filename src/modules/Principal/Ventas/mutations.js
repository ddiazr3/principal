import { find, filter } from 'lodash'

export function clearVenta(state) {
  state.venta = {
    id: 0,
    totalcobrado: 0,
    nombre: null,
    nit: null,
    detalleVenta: []
  }
}
