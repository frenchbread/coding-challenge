const state = {
  current_route: ''
}

const mutations = {
  UPDATE_ROUTE (state, route) {
    state.current_route = route
  }
}

const actions = {
  update_route ({ commit }, route) {
    commit('UPDATE_ROUTE', route)
  }
}

const getters = {}

export default { state, mutations, actions, getters }
