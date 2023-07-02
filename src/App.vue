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
  mounted() {
    // const path = this.$router.history.current.path;
    // if (path !== '/projects') {
    //   this.$router.push('/projects');
    // }
    // console.log(this.$router);
  },
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
</style>
