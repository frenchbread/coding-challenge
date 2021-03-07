<template lang="html">
  <div class="navbar">
    <span>
      <b>coding challenge</b>
    </span>

    <span>
      <router-link :to="{ name: 'create' }">+</router-link>
      |
      <router-link :to="{ name: 'home', }">Главная</router-link>
      <button v-if="!is_authorized" class="btn btn-glost btn-primary" @click.prevent="$router.push({ name: 'login' })" >Войти</button>
      <button v-else class="btn btn-glost btn-error" @click.prevent="logout()" >Выйти</button>
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    is_authorized () {
      return this.$store.getters.is_authorized
    }
  }
}
</script>

<style lang="scss" scoped>

.navbar {
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #ccc;
}

</style>
