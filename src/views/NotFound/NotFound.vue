<template>
  <div class="not-found">
    <h1 class="not-found__title">Страницы не существует</h1>
    <Button
      v-on:click-btn="goMain"
      v-bind:button="mainBtn"
      v-bind:class="['button', 'primary-button']"
    ></Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainBtn: {
        id: 'mainBtn',
        title: 'К проектам',
      },
    };
  },
  methods: {
    goMain() {
      this.$router.push('/projects');
    },
  },
};
</script>
