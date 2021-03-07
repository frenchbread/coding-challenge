import axios from 'axios'

const DEVELOPER = 'DAMIR_TEST'

const axe = axios.create({
  baseURL: 'https://uxcandy.com/~shapoval/test-task-backend/v2',
  headers:{
    'Content-Type': 'multipart/form-data'
  }
})

export default {

  get_tasks ({ sort_field = 'id', sort_direction = 'asc', page = 1 } = {}) {
    return axe.get('/', {
      params: {
        developer: DEVELOPER,
        sort_field,
        sort_direction,
        page
      }
    }).then(({ data }) => data)
  },

  create_task ({ username, email, text }) {
    const form_data = new FormData()

    form_data.append('username', username)
    form_data.append('email', email)
    form_data.append('text', text)

    return axe.post(`/create?developer=${DEVELOPER}`, form_data).then(({ data }) => data)
  },

  edit_task ({ id, text, status }) {
    const form_data = new FormData()

    form_data.append('text', text)
    form_data.append('status', status)
    form_data.append('token', localStorage.getItem('token'))

    return axe.post(`/edit/${id}/?developer=${DEVELOPER}`, form_data).then(({ data }) => data)
  },

  login ({ username, password }) {
    const form_data = new FormData()

    form_data.append('username', username)
    form_data.append('password', password)

    return axe.post(`/login?developer=${DEVELOPER}`, form_data).then(({ data }) => data)
  }

}
