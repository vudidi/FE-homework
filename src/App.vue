<template>
  <div id="app" class="page">
    <Navigation />
    <main class="content"><router-view /></main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
  },
  mounted() {},
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
</style>
