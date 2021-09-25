import Vue from 'vue'
import Vuex from 'vuex'
import layout from '@/modules/Layout'
import usuario from '@/modules/usuario'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    layout,
    usuario
  }
})
