<template>
  <div class="noContent">
    <p class="noContent__text">{{ text }}</p>
    <Button
      v-bind:button="noContentBtn"
      v-bind:class="['button', 'page-button']"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'Не создан ни один проект',
      noContentBtn: {
        id: 'no-content',
        title: 'Добавить',
      },
    };
  },
};
</script>

<style lang="scss"></style>
