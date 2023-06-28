<template>
  <div :class="['field', { field_disabled: isDisabledInput }]">
    <input
      :class="[
        'field__input',
        { field__input_type_error: isErrorInput },
        { field__input_type_disabled: isDisabledInput },
        { field__input_default: defaultInput },
        { field__input_flushed: flushedInput },
      ]"
      :type="type"
      :placeholder="placeholder"
    />
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    flushedInput: {
      type: Boolean,
      required: false,
    },
    defaultInput: {
      type: Boolean,
      required: false,
    },
  },
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
