<template>
  <div class="projects">
    <ProjectItem
      v-for="project in items"
      v-bind:key="project.id"
      v-bind:project="project"
      v-on:open-dropdown="openDropdownMenu"
      v-on:click-outside="clickOutside"
    />
  </div>
</template>

<script>
import ProjectItem from '@/components/ProjectItem/ProjectItem.vue';

export default {
  components: {
    ProjectItem,
  },
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
  methods: {
    openDropdownMenu(id) {
      this.$emit('open-dropdown', id);
    },
    clickOutside(id) {
      this.$emit('click-outside', id);
    },
  },
};
</script>

<style lang="scss"></style>
