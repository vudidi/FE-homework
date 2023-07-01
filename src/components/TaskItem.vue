<template>
  <li class="list-item">
    <router-link
      :to="{ name: 'task-detail', params: { id: task.id, title: task.title } }"
      class="list-title"
      >{{ task.title }}</router-link
    >
  </li>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
