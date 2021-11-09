import { find, filter } from 'lodash'

export function clearCompra(state) {
  state.compra = {
    id: 0,
      totalpagado: 0,
      detalleCompras: []
  }
}
