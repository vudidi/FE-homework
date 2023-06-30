<template>
  <li class="list-item user">
    <a href="#" class="list-title user">{{ user.name }}</a>
  </li>
</template>

<script>
export default {
  props: {
    user: {
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
