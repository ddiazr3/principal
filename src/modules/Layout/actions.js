// user.js
import { IN_BROWSER } from '@/util/globals'

export async function fetch({ commit }) {
    const local = localStorage.getItem('vuetify@user') || '{}'
    const user = JSON.parse(local)

    for (const key in user) {
        commit(key, user[key])
    }

    if (user.dark === undefined) {
        commit('dark', window.matchMedia('(prefers-color-scheme: dark)'))
    }
}

export async function update({ state }) {
    if (!IN_BROWSER) return

   // localStorage.setItem('vuetify@user', JSON.stringify(state))
}
