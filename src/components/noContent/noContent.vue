<template>
  <div class="noContent">
    <p class="noContent__text">{{ text }}</p>
    <Link
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
      type: String,
      default: '',
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
        to: this.to,
      },
    };
  },
};
</script>

<style lang="scss"></style>
