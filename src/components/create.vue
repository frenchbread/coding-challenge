<template lang="html">
  <div class="create">
    <form v-if="form_status !== 'ok'" class="form" @submit.prevent="create_task()">

      <h2>create task</h2>

      <fieldset class="form-group">
        <label for="username">USERNAME</label>
        <input id="username" class="form-control" type="text" v-model="data.username">
      </fieldset>

      <fieldset class="form-group">
        <label for="email">EMAIL</label>
        <input id="email" class="form-control" type="email" v-model="data.email">
      </fieldset>

      <fieldset class="form-group form-textarea">
        <label for="text">TEXT</label>
        <textarea id="text" class="form-control" rows="5" cols="10" v-model="data.text"></textarea>
      </fieldset>

      <div class="form-action">

        <button class="btn btn-primary btn-block" type="submit">
          <span v-if="form_is_loading" class="loading"></span>
          create task
        </button>

      </div>

      <div v-if="form_status === 'error'" class="alert alert-error">{{ get_parsed_error_text() }}</div>

    </form>
    <div v-else-if="form_status === 'ok'" class="success-message">
      <b class="alert alert-success">Задание было усшешно добавлено!</b>

      <br><br><br>

      <button class="btn btn-success" @click.prevent="create_next_task()">Создать новое задание</button>
      <button class="btn btn-primary" @click.prevent="$router.push({ name: 'home' })">Перейти на главную</button>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        username: '',
        email: '',
        text: ''
      }
    }
  },
  watch: {
    'task_form_error': 'update_form_field_statuses'
  },
  beforeDestroy () {
    this.$store.dispatch('reset_form_status')
  },
  methods: {
    create_task () {
      this.$store.dispatch('create_task', this.data)
    },
    get_parsed_error_text () {
      const error_message = this.form_error

      return Object.keys(error_message).map(key => `- "${key}": ${error_message[key]}`).join('\n')
    },
    update_form_field_statuses () {
      if (this.form_status === 'error') {
        Object.keys(this.form_error).forEach(field_with_error => {
          document.getElementById(field_with_error).parentNode.classList.add('form-error')
        })
      } else {
        ['username', 'email', 'text'].forEach(field_with_error => {
          document.getElementById(field_with_error).parentNode.classList.remove('form-error')
        })
      }
    },
    create_next_task () {
      this.$store.dispatch('create_next_task')

      this.data = {
        username: '',
        email: '',
        text: ''
      }
    }
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
    }
  }
}
</script>

<style lang="scss" scoped>

.create {

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
