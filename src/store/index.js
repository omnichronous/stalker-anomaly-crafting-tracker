import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { merge } from 'lodash'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
})

export default new Vuex.Store({
  state: {
    quantities: {},
    dataTableOptions: {
      components: {},
    },
  },
  getters: {
  },
  mutations: {
    SET_QUANTITIES (state, quantities) {
      Vue.set(state, 'quantities', merge({}, state.quantities, quantities))
    },
    SET_DATA_TABLE_OPTIONS (state, { scope, options }) {
      Vue.set(state.dataTableOptions, scope, options)
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocalStorage.plugin],
})
