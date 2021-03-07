<template lang="html">
  <div class="container">

    <navbar></navbar>

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  watch: {
    $route (to) {
      this.update_route()
    }
  },
  created () {
    this.update_route()

    this.$store.dispatch('check_auth')
  },
  methods: {
    update_route () {
      this.$store.dispatch('update_route', this.$route.path)
    }
  },
  components: {
    navbar: require('./components/navbar.vue').default
  }
}
</script>

<style lang="scss" scoped></style>

<style lang="css" src="./assets/css/hack.css"></style>
<style lang="scss" src="./styles/main.scss"></style>
