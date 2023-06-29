<template>
  <div class="select">
    <div class="select__wrapper">
      <svg-icon v-bind:class="['select__icon']" name="arrow"></svg-icon>
      <select class="select__native">
        <option value="default">{{ defaultValue }}</option>

        <option
          v-for="item in items"
          v-bind:key="item.name"
          v-bind:data-value="item.value"
        >
          {{ item.name }}
        </option>
      </select>

      <div :id="selectID" class="select__custom" aria-hidden="true">
        <div class="select__custom-trigger">{{ defaultValue }}</div>
        <div class="select__custom-options">
          <div
            class="select__custom-option"
            v-for="item in items"
            v-bind:key="item.name"
            v-bind:data-value="item.value"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectID: {
      type: String,
      required: true,
    },
    defaultValue: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="scss"></style>
