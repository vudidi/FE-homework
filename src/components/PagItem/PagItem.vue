<template>
  <Button
    v-bind:button="button"
    v-bind:class="[
      'button',
      'pag-button',
      { 'pag-button_active': page.isSelected },
    ]"
    v-on:click-btn="$emit('click-btn', page)"
    >{{ page.num }}
  </Button>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      default: {},
    },
    pageName: {
      type: String,
    },
  },
  data() {
    return {
      button: {
        id: 'pag-btn',
      },
    };
  },
};
</script>

<style lang="scss"></style>
