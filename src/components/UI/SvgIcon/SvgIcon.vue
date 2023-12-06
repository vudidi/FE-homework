<template>
  <svg v-on:click="$emit('click-svg')" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    },
  },
};
</script>

<style>
svg {
  fill: currentColor;
  overflow: hidden;
}
</style>
