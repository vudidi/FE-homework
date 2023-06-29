<template>
  <div class="tasks">
    <TaskItem
      v-for="task in items"
      v-bind:key="task.id"
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
    items: {
      type: Array,
      default: [],
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
