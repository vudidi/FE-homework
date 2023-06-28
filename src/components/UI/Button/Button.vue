<template>
  <button :id="button.id" v-on:click="$emit('click-btn', $event)">
    {{ button.title }}
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    button: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
