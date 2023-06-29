<template>
  <a href="#" :id="link.id" v-on:click="$emit('click-link', $event)">{{
    link.title
  }}</a>
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
