import api from '../../lib/api'

const state = {
  page: 1,
  sort_by: 'username',
  sort_direction: 'asc',
  tasks_loading: false,
  tasks: [],
  total_task_count: 0
}

const mutations = {
  SET_LOADING_STATUS (state, is_loading) {
    state.tasks_loading = is_loading
  },
  SET_PAGE (state, page) {
    state.page = page
  },
  SET_SORT_BY (state, sort_by) {
    state.sort_by = sort_by
  },
  SET_SORT_DIRECTION (state, sort_direction) {
    state.sort_direction = sort_direction
  },
  ADD_TASKS (state, tasks) {
    state.tasks = tasks
  },
  UPDATE_TASK (state, task) {
    const to_remove = state.tasks.map(_task => _task.id).indexOf(task.id)

    if (to_remove > -1) {
      state.tasks.splice(to_remove, 1)
      state.tasks.push(task)
    }
  },
  SET_TASK_COUNT (state, count) {
    state.total_task_count = parseInt(count)
  },
  ADD_TASK (state, task) {
    state.tasks.push(task)
  }
}

const actions = {
  set_page ({ commit }, page) {
    commit('SET_PAGE', page)
  },
  set_sort_by ({ commit }, sort_by) {
    commit('SET_SORT_BY', sort_by)
  },
  set_sort_direction ({ commit }, sort_direction) {
    commit('SET_SORT_DIRECTION', sort_direction)
  },
  async load_tasks ({ commit, state }) {
    commit('SET_LOADING_STATUS', true)

    const { status, message } = await api.get_tasks({ page: state.page, sort_field: state.sort_by, sort_direction: state.sort_direction })

    if (status === 'ok') {
      commit('ADD_TASKS', message.tasks)
      commit('SET_TASK_COUNT', message.total_task_count)

      commit('SET_LOADING_STATUS', false)
    } else {
      commit('SET_LOADING_STATUS', false)
    }
  },
  async create_task ({ commit }, params) {
    commit('SET_FORM_LOADING', true)

    const { status, message } = await api.create_task(params)

    if (status === 'ok') {
      commit('ADD_TASK', message)
      commit('SET_FORM_LOADING', false)
      commit('UPDATE_FORM_STATUS', { status: 'ok', error: '' })
    } else {
      commit('SET_FORM_LOADING', false)
      commit('UPDATE_FORM_STATUS', { status: 'error', error: message })
    }
  },
  async edit_task ({ commit }, params) {
    commit('SET_FORM_LOADING', true)

    const { status, message } = await api.edit_task(params)

    if (status === 'ok') {
      commit('SET_FORM_LOADING', false)
      commit('UPDATE_FORM_STATUS', { status: 'ok', error: '' })
    } else {
      commit('SET_FORM_LOADING', false)
      commit('UPDATE_FORM_STATUS', { status: 'error', error: message })
    }
  },
  create_next_task ({ commit }) {
    commit('UPDATE_FORM_STATUS', { status: '', error: '' })
  },
  clear_tasks ({ commit }) {
    commit('ADD_TASKS', [])
    commit('SET_TASK_COUNT', 0)
    commit('SET_PAGE', 0)
  }
}

const getters = {
  tasks_loading: state => state.tasks_loading,
  page: state => state.page,
  sort_by: state => state.sort_by,
  sort_direction: state => state.sort_direction,
  tasks: state => state.tasks,
  total_task_count: state => state.total_task_count,
  task_form_error: state => state.form_error,
  task_form_error_message: state => state.form_error_message,
  task_form_success: state => state.form_success,
  task_is_creating: state => state.task_is_creating
}

export default { state, mutations, actions, getters }
