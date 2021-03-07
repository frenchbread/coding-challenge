<template lang="html">
  <div class="create">
    <form v-if="form_status !== 'ok'" class="form" @submit.prevent="login()">

      <h2>вход</h2>

      <fieldset class="form-group">
        <label for="username">USERNAME</label>
        <input id="username" class="form-control" type="text" v-model="credentials.username">
      </fieldset>

      <fieldset class="form-group">
        <label for="password">PASSWORD</label>
        <input id="password" class="form-control" type="password" v-model="credentials.password">
      </fieldset>

      <div class="form-action">

        <button class="btn btn-primary btn-block" type="submit">
          <span v-if="form_is_loading" class="loading"></span>
          Отправить
        </button>

      </div>

      <div class="gap"></div>

      <div v-if="form_status === 'error'" class="alert alert-error">{{ get_parsed_error_text() }}</div>

    </form>
    <div v-else-if="form_status === 'ok'" class="align-center">
      <div class="gap gap-big"></div>

      <b class="alert alert-success">Вы успешно авторизовались!</b>

      <div class="gap gap-big"></div>

      <button class="btn btn-primary" @click.prevent="$router.push({ name: 'home' })">Перейти на главную</button>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  watch: {
    'form_error': 'update_form_field_statuses'
  },
  beforeDestroy () {
    this.$store.dispatch('reset_form_status')
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.credentials)
    },
    get_parsed_error_text () {
      const error_message = this.form_error

      return Object.keys(error_message).map(key => `- "${key}": ${error_message[key]}`).join('\n')
    },
    update_form_field_statuses () {
      if (this.login_form_error) {
        Object.keys(this.login_form_error_message).forEach(field_with_error => {
          document.getElementById(field_with_error).parentNode.classList.add('form-error')
        })
      } else {
        ['username', 'password'].forEach(field_with_error => {
          document.getElementById(field_with_error).parentNode.classList.remove('form-error')
        })
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


</style>
