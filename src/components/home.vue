<template lang="html">
  <div class="home">
    <div class="header">
      <b>
        list ({{ total_task_count }})
      </b>

      <span v-if="total_task_count > 0">
        filter by
        <select v-model="param__sort_by">
          <option value="id">id</option>
          <option value="username">username</option>
          <option value="email">email</option>
          <option value="status">status</option>
        </select>
        <select v-model="param__sort_direction">
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
      </span>
    </div>

    <div v-if="total_task_count > 0" class="list">

      <task v-for="task in tasks" :key="task._id" :task="task"></task>

    </div>

    <div class="gird footer">
      <div class="cell -1of12">
        <span v-if="tasks_loading" class="loading"></span>
      </div>
      <div class="cell -10of12 page-nums">
        <span class="btn btn-primary" :class="selected_page === page ? 'btn-ghost' : ''" v-for="page in get_pages_list()" @click.prevent="set_page(page)">{{ page }}</span>
      </div>
      <div class="cell -1of12">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      param__sort_by: '',
      param__sort_direction: ''
    }
  },
  watch: {
    'param__sort_by': 'update_sort',
    'param__sort_direction': 'update_sort_direction'
  },
  beforeCreate () {
    this.$store.dispatch('load_tasks')
  },
  created () {
    this.param__sort_by = this.sort_by
    this.param__sort_direction = this.sort_direction
  },
  beforeDestroy () {
    // this.$store.dispatch('clear_tasks')
  },
  methods: {
    update_sort () {
      this.$store.dispatch('set_sort_by', this.param__sort_by)
      this.$store.dispatch('load_tasks')
    },
    update_sort_direction () {
      this.$store.dispatch('set_sort_direction', this.param__sort_direction)
      this.$store.dispatch('load_tasks')
    },
    get_pages_list () {
      let pages = []

      if (this.total_task_count > 3) {
        for (let k = 1; k <= Math.ceil(this.total_task_count / 3); k++) {
          pages.push(k)
        }

        return pages
      } else {
        return []
      }
    },
    set_page (page) {
      if (this.selected_page !== page) {
        this.$store.dispatch('set_page', page)
        this.$store.dispatch('load_tasks')
      }
    }
  },
  computed: {
    tasks_loading () {
      return this.$store.getters.tasks_loading
    },
    selected_page () {
      return this.$store.getters.page
    },
    sort_by () {
      return this.$store.getters.sort_by
    },
    sort_direction () {
      return this.$store.getters.sort_direction
    },
    tasks () {
      return this.$store.getters.tasks
    },
    total_task_count () {
      return this.$store.getters.total_task_count
    }
  },
  components: {
    task: require('./task.vue').default
  }
}
</script>

<style lang="scss" scoped>

.home {
  padding: 1rem 0;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0.75rem 0 1.5rem;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    .page-nums {
      text-align: center;
    }

  }
}

</style>
