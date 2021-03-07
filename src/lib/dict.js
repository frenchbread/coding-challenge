const task_status_map = [
  { val: 0, text: 'задача не выполнена' },
  { val: 1, text: 'задача не выполнена, отредактирована админом' },
  { val: 10, text: 'задача выполнена' },
  { val: 11, text: 'задача отредактирована админом и выполнена' }
]

export default {
  get_task_status_map () {
    return task_status_map
  },
  get_status_text_by_val (val) {
    return task_status_map.find(status => status.val == val).text
  }
}
