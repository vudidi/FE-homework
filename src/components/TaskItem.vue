<template>
  <li class="list-item">
    <a href="#" class="list-title">{{ task.title }}</a>
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
