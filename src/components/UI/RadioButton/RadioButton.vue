<template>
  <label>
    <input
      v-bind="$attrs"
      type="radio"
      name="radio"
      v-on:checked="onChecked"
      v-on:change="onChecked"
    />
  </label>
</template>

<script>
export default {
  methods: {
    onChecked($event) {
      this.$emit('checked', $event.target.value);
    },
  },
};
</script>

<style lang="scss"></style>
