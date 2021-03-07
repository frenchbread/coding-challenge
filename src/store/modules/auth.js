import api from '../../lib/api'

const state = {
  is_authorized: false
}

const mutations = {
  LOGIN (state, { username, token }) {
    state.username = username
    state.token = token
  },
  AUTHORIZE (state, token) {
    state.is_authorized = true
  },
  LOGOUT (state) {
    state.is_authorized = false
  }
}

const actions = {
  async login ({ commit }, credentials) {
    commit('SET_FORM_LOADING', true)

    const { status, message } = await api.login(credentials)

    if (status === 'ok') {
      localStorage.setItem('token', message.token)

      commit('AUTHORIZE')
      commit('SET_FORM_LOADING', false)
      commit('UPDATE_FORM_STATUS', { status: 'ok', error: '' })
    } else {
      commit('SET_FORM_LOADING', false)
      commit('UPDATE_FORM_STATUS', { status: 'error', error: message })
    }
  },
  logout ({ commit }) {
    localStorage.removeItem('token')

    commit('LOGOUT')
  },
  check_auth ({ commit }) {
    if (localStorage.getItem('token')) {
      commit('AUTHORIZE')
    } else {
      commit('LOGOUT')
    }
  }
}

const getters = {
  is_authorized: state => state.is_authorized
}

export default { state, mutations, actions, getters }
