<template>
  <div :class="['field', { field_disabled: isDisabledInput }]">
    <input
      v-bind="$attrs"
      v-bind:class="[
        'field__input',
        { field__input_type_error: isErrorInput },
        { field__input_type_disabled: isDisabledInput },
        { field__input_default: defaultInput },
        { field__input_flushed: flushedInput },
      ]"
      v-bind:type="type"
      v-bind:placeholder="placeholder"
      v-on:keydown.enter="$emit('search-on-enter')"
      v-on:input="onInput($event)"
      v-on:change="onInput($event)"
      v-bind:value="value"
    />
    <span :class="['field__error', inputErrorClass]"> </span>
    <span
      :class="[
        'field__search-error',
        { 'field__search-error_visible': isErrorVisible },
      ]"
    >
      {{ errorText }}
    </span>
    <slot />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
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
    inputErrorClass: {
      type: String,
      required: false,
    },
    errorText: {
      type: String,
      required: false,
    },
    isErrorVisible: {
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
    ...mapMutations(['UPDATE_ERROR', 'SET_US_SEARCH_RESULT']),
    onInput($event) {
      this.$emit('input', $event.target.value);
      this.UPDATE_ERROR('');
      this.SET_US_SEARCH_RESULT(true);
    },
  },
};
</script>

<style lang="scss"></style>
