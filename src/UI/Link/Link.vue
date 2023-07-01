<template>
  <router-link :to="link.path" :id="link.id" v-on:click.native="clickLink">{{
    link.title
  }}</router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
  methods: {
    clickLink($event) {
      this.$emit('click-link', $event);
    },
  },
};
</script>

<style lang="scss"></style>
