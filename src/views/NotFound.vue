<template>
  <div class="notFound">
    <h1>Страницы не существует</h1>
    <Button
      v-on:click-btn="goMain"
      :button="mainBtn"
      v-bind:class="['button', 'back-button']"
    ></Button>
  </div>
</template>

<script>
import Button from '@/UI/Button/Button.vue';
export default {
  components: {
    Button,
  },
  data() {
    return {
      mainBtn: {
        id: 'mainBtn',
        title: 'На главную',
      },
    };
  },
  methods: {
    goMain() {
      this.$router.push('/');
    },
  },
};
</script>
