<template>
  <div class="field">
    <input
      :class="[
        'field__input',
        { field__input_type_error: isErrorInput },
        { field__input_type_disabled: isDisabledInput },
      ]"
      type="text"
      placeholder="Введите текст..."
    />
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      isError: false,
      isDisabled: false,
    };
  },
  computed: {
    isErrorInput() {
      return this.isError;
    },
    isDisabledInput() {
      return this.isDisabled;
    },
  },
};
</script>

<style lang="scss"></style>
