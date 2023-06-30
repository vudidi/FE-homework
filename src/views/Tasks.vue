<template>
  <ul class="list">
    <TaskItem v-for="task in tasks" :key="task.id" v-bind:task="task" />
  </ul>
</template>

<script>
import TaskItem from '@/components/TaskItem.vue';

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
  methods: {},
};
</script>

<style lang="scss"></style>
