<template>
  <div :class="['modal', 'preloader__modal', { modal_opened: isOpen }]">
    <Preloader />
  </div>
</template>

<script>
import Preloader from '@/components/Preloader/Preloader.vue';

export default {
  components: {
    Preloader,
  },
  props: {
    isOpen: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss"></style>
