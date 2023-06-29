<template>
  <div class="projects">
    <ProjectItem
      v-for="project in items"
      v-bind:key="project.id"
      v-bind:project="project"
      v-on:open-dropdown="openDropdownMenu"
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
  },
};
</script>

<style lang="scss"></style>
