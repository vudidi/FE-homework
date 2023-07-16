<template>
  <div v-click-outside="clickOutside" :class="['select', inputClass]">
    <svg-icon
      v-bind:class="[
        'select__icon',
        { select__icon_active: isSelectOpen },
        iconClass,
      ]"
      name="arrow"
    ></svg-icon>
    <slot />
    <div
      :id="selectID"
      :class="['select__custom', { isActive: isSelectOpen }]"
      aria-hidden="true"
      v-on:click="toggleSelect"
    >
      <input
        :class="[
          'select__custom-trigger',
          { isFocused: isSelectOpen },
          { 'select__custom-trigger_error': isErrorInput },
        ]"
        :value="defaultValue"
        readonly
      />
      <div class="select__custom-options">
        <input
          :class="[
            'select__custom-option',
            { isHover: item.value === activeOption },
          ]"
          v-for="item in items"
          v-bind:key="item.value"
          v-bind:value="item.name"
          v-bind:data-value="item.value"
          v-on:click="$emit('click-select', $event.target.value, item)"
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSelectOpen: false,
    };
  },
  props: {
    iconClass: {
      type: String,
      default: '',
    },
    inputClass: {
      type: String,
      default: '',
    },
    selectID: {
      type: String,
      required: true,
    },
    defaultValue: {
      type: [String, Number],
      default: '',
    },
    items: {
      type: Array,
      default: [],
    },
    activeOption: {
      type: String,
    },
    isErrorInput: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleSelect() {
      this.isSelectOpen = !this.isSelectOpen;
    },
    clickOutside() {
      this.isSelectOpen = false;
    },
  },
};
</script>

<style lang="scss"></style>
