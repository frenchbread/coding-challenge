const state = {
  form_status: '',
  form_error: '',
  form_is_loading: false
}

const mutations = {
  UPDATE_FORM_STATUS (state, { status, error = '' }) {
    state.form_status = status
    state.form_error = error
  },
  SET_FORM_LOADING (state, is_loading) {
    state.form_is_loading = is_loading
  }
}

const actions = {
  update_form_status ({ commit }, { status, error = '' }) {
    commit('UPDATE_FORM_STATUS', { status, error })
  },
  reset_form_status ({ commit }) {
    commit('UPDATE_FORM_STATUS', { status: '', error: '' })
  }
}

const getters = {
  form_status: state => state.form_status,
  form_error: state => state.form_error,
  form_is_loading: state => state.form_is_loading
}

export default { state, mutations, actions, getters }
