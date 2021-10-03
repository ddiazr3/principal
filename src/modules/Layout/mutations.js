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

export function tienePermiso(state, dato) {
    var permisos = state.permisosGet
    let permiso = permisos.filter(element => element.to === dato)
    console.warn(permiso)
    return permiso
}