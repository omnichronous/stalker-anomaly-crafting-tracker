import Vue from 'vue'
import Vuex from 'vuex'
import { merge } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quantities: {},
  },
  getters: {
  },
  mutations: {
    SET_QUANTITIES (state, quantities) {
      Vue.set(state, 'quantities', merge({}, state.quantities, quantities))
    },
  },
  actions: {
  },
  modules: {
  },
})
