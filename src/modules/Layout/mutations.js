export function minis(state) {
    state.mini = !state.mini
}

export function drawerMinimizados(state) {
    state.drawer = !state.drawer
}

export function drawerMinimizadosIn(state, value) {
    state.drawer = value
}

export function setLogin(state, dato) {
    state.isLogged = dato.bool
    state.userLoged = dato.usuario
    state.items = dato.modulo
}
