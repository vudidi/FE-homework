<template>
  <div :class="['field', { field_disabled: isDisabledInput }]">
    <input
      v-bind:class="[
        'field__input',
        { field__input_type_error: isErrorInput },
        { field__input_type_disabled: isDisabledInput },
        { field__input_default: defaultInput },
        { field__input_flushed: flushedInput },
      ]"
      v-bind:type="type"
      v-bind:placeholder="placeholder"
      v-bind="$attrs"
      v-on:input="onInput"
      v-model="input"
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
      input: '',
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
  methods: {
    onInput() {
      this.$emit('onInput', this.input);
    },
  },
};
</script>

<style lang="scss"></style>
