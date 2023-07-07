<template>
  <router-link
    :to="to"
    :id="link.id"
    v-on:click.native="$emit('click-link', $event)"
    >{{ link.title }} <slot
  /></router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      default: '',
      required: false,
    },
    link: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss"></style>
