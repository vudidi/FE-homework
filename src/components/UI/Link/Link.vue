<template>
  <router-link
    :to="link.to"
    :id="link.id"
    v-on:click.native="$emit('click-link', $event)"
    >{{ link.title }}</router-link
  >
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss"></style>
