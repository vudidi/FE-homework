<template>
  <div class="tasks">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      v-bind:task="task"
      v-on:open-dropdown="openDropdownMenu"
    />
  </div>
</template>

<script>
import TaskItem from '@/components/TaskItem/TaskItem.vue';

export default {
  components: {
    TaskItem,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    openDropdownMenu(id) {
      this.$emit('open-dropdown', id);
    },
  },
};
</script>

<style lang="scss"></style>
