<template>
  <div>
    <Button
      v-on:click-btn="goBack"
      :button="backBtn"
      v-bind:class="['button', 'back-button']"
    ></Button>
    <div class="task-detail">
      ID: {{ $route.params.id }} | Title: {{ $route.params.title }}
    </div>
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
      backBtn: {
        id: 'backBtn',
        title: 'Назад',
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go('-1');
    },
  },
};
</script>
