<template>
  <div id="app" class="page">
    <Navigation />
    <main class="content"><router-view /></main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Navigation,
  },
  computed: {
    ...mapGetters(['usersMaxLimit']),
  },
  methods: {
    ...mapActions(['fetchCurrentUser', 'fetchUsers']),
  },
  beforeMount() {
    this.fetchUsers({
      page: 1,
      sort: 'asc',
      filter: null,
    });
    this.fetchCurrentUser();
  },
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
</style>
