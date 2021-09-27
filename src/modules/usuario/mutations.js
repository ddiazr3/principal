export function setUsuarios(state, response) {
    state.usuarios = response.data.data
    state.totalPage = response.data.last_page
    state.page = response.data.current_page
}

export function setCatalogos(state, response) {
    state.rolesUsuario = response.data.roles
    state.empresasUsuario = response.data.empresas
}