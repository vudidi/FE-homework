<template>
  <div class="select">
    <div class="select__wrapper">
      <svg-icon v-bind:class="['select__icon']" name="arrow"></svg-icon>
      <select class="select__native">
        <!-- <option value="default">{{ defaultValue }}</option>

        <option
          v-for="item in items"
          v-bind:key="item.name"
          v-bind:data-value="item.value"
        >
          {{ item.name }}
        </option> -->
      </select>
      <div
        :id="selectID"
        class="select__custom"
        aria-hidden="true"
        v-on:keyup.enter="onSelectEnter"
      >
        <input class="select__custom-trigger" readonly />
        <div class="select__custom-options">
          <input
            class="select__custom-option"
            v-for="item in items"
            v-bind:key="item.name"
            v-bind:value="item.name"
            v-bind:data-value="item.value"
            v-on:click="onSelectClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    selectRef: {
      type: String,
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
  },
  methods: {
    onSelectClick($event) {
      this.$emit('onSelectClick', $event.target.value);
    },
    onSelectEnter($event) {
      this.$emit('onSelectEnter', $event.target.value);
    },
  },
};
</script>

<style lang="scss"></style>
