<template lang="html">
  <div class="task">
    <div class="task-header">
      <span>
        <b>{{ task.username }}</b> <i>{{ task.email }}</i>
      </span>

      <span>
        {{ get_status_text_by_val(task.status) }}
      </span>
    </div>

    <div class="task-text">
      {{ task.text }}
    </div>

    <div v-if="is_authorized" class="task-actions">
      <router-link :to="{ name: 'edit', params: { id: task.id, text: task.text } }">отметить как выполненная</router-link>
    </div>
  </div>
</template>

<script>
import dict from '../lib/dict'

export default {
  props: ['task'],
  methods: {
    get_status_text_by_val (val) {
      return dict.get_status_text_by_val(val)
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

.task {
  padding: 1rem;
  border: 1px solid #ccc;

  margin-bottom: 1rem;

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .task-text {
    padding-top: 0.5rem;
  }
}

</style>
