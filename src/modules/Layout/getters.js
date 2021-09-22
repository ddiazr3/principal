export function dark (state, getters) {
  return (
    state.dark ||
    getters.gradient.indexOf('255, 255, 255') === -1
  )
}

export function gradient (state) {
  return state.gradients[state.drawer.gradient]
}

export function image (state) {
  return state.drawer.image === '' ? state.drawer.image : state.images[state.drawer.image]
}
