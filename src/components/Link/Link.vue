<template>
  <a href="#" :id="id">{{ title }}</a>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss"></style>
