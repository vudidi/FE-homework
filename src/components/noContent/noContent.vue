<template>
  <div class="noContent">
    <p class="noContent__text">{{ text }}</p>
    <Link
      :to="to"
      v-on:click-link="$emit('click-link')"
      v-bind:link="noContentBtn"
      v-bind:class="['button', 'primary-button']"
    />
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      default: '',
      required: false,
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      noContentBtn: {
        id: 'no-content',
        title: 'Добавить',
      },
    };
  },
};
</script>

<style lang="scss"></style>
