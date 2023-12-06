<template>
  <button v-bind="$attrs">
    {{ title }}
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss"></style>
