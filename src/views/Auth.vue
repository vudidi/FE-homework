<template>
  <div class="auth">
    <Button
      v-on:click-btn="changeAuthStatus"
      :button="authBtn"
      v-bind:class="['button', 'page-button']"
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
      authBtn: {
        id: 'authBtn',
        title: 'Авторизоваться',
      },
    };
  },
  methods: {
    changeAuthStatus() {
      localStorage.setItem('auth', 'true');
      this.$router.push('users');
    },
  },
};
</script>

<style lang="scss"></style>
