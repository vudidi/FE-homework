<template>
  <div id="app" class="page">
    <Navigation />
    <main class="content"><router-view /></main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Navigation,
  },
  methods: {
    ...mapActions(['fetchCurrentUser']),
  },
  mounted() {
    this.fetchCurrentUser();
  },
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
</style>
