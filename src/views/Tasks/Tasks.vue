<template>
  <div class="tasks">
    <TaskItem
      v-for="task in items"
      v-bind:key="task.id"
      v-bind:task="task"
      v-on:open-dropdown="openDropdownMenu"
      v-on:click-outside="clickOutside"
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
    clickOutside(id) {
      this.$emit('click-outside', id);
    },
  },
};
</script>

<style lang="scss"></style>
