export function dark(state, getters) {
    return (
        state.dark ||
        getters.gradient.indexOf('255, 255, 255') === -1
    )
}

export function gradient(state) {
    return state.gradients[state.drawer.gradient]
}

export function image(state) {
    return state.drawer.image === '' ? state.drawer.image : state.images[state.drawer.image]
}

export function tienePermisoSet(state) {
    var valorReturn = true
    var permisos = state.permisosGet
    var busqueda = state.permisovalue
    let permiso = permisos.filter(element => element.to === busqueda.to)
    if (permiso[0].permisos) {
        var perm = permiso[0].permisos;
        let p = perm.filter(e => e === busqueda.permiso)
        if (p) {
            valorReturn = true
        } else {
            valorReturn = false
        }
    } else {
        valorReturn = false
    }

    return valorReturn
}