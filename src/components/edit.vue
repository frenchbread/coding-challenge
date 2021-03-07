<template lang="html">
  <div class="edit-task">
    <div v-if="is_authorized">
      <form v-if="form_status !== 'ok'" class="form" @submit.prevent="edit_task()">
        <h2>Редактирование задачи {{ task_id }}</h2>

        <fieldset class="form-group form-textarea">
          <label for="text">TEXT</label>
          <textarea id="text" class="form-control" rows="5" cols="10" v-model="task_text"></textarea>
        </fieldset>

        <div class="form-action">

          <button class="btn btn-primary btn-block" type="submit">
            <span v-if="form_is_loading" class="loading"></span>
            Сохранить
          </button>

        </div>

        <div v-if="form_status === 'error'" class="alert alert-error">{{ get_parsed_error_text() }}</div>

      </form>
      <div v-else-if="form_status === 'ok'" class="success-message">
        <b class="alert alert-success">Задание было усшешно обновлено!</b>

        <br><br><br>

        <button class="btn btn-primary" @click.prevent="$router.push({ name: 'home' })">Перейти на главную</button>
      </div>
    </div>
    <div v-else class="alert alert-warning">
      Вы не авторизованы для редактирования задач!
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      task_id: '',
      task_text_initial: '',
      task_text: ''
    }
  },
  created () {
    const { id, text } = this.$route.params

    this.task_id = id
    this.task_text_intial = this.task_text = text
  },
  beforeDestroy () {
    this.$store.dispatch('reset_form_status')
  },
  methods: {
    edit_task () {
      let status = 0

      if (this.task_text_intial !== this.task_text) {
        status = 11
      } else {
        status = 10
      }

      this.$store.dispatch('edit_task', { id: this.task_id, text: this.task_text, status })
    },
    get_parsed_error_text () {
      const error_message = this.form_error

      return Object.keys(error_message).map(key => `- "${key}": ${error_message[key]}`).join('\n')
    },
  },
  computed: {
    form_status () {
      return this.$store.getters.form_status
    },
    form_error () {
      return this.$store.getters.form_error
    },
    form_is_loading () {
      return this.$store.getters.form_is_loading
    },
    is_authorized () {
      return this.$store.getters.is_authorized
    }
  }
}
</script>

<style lang="scss" scoped>

.edit-task {

  .form {
    padding-top: 2rem;
    margin: auto;

    .alert {
      margin-top: 1rem;
      white-space: break-spaces;
    }
  }

  .success-message {
    margin-top: 3rem;
    text-align: center;
  }

}

</style>
