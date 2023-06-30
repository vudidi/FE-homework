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
      v-on:input="onInput($event)"
      v-on:change="onInput($event)"
      v-bind:value="value"
    />
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
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
  methods: {
    onInput($event) {
      this.$emit('input', $event.target.value);
    },
  },
};
</script>

<style lang="scss"></style>
