<template>
  <div id="app" class="page">
    <Navigation />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
  },
  mounted() {
    localStorage.setItem('auth', 'false');
    const path = this.$router.history.current.path;
    if (path !== '/' && path === '/users') {
      this.$router.push('/');
    }
  },
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
</style>
