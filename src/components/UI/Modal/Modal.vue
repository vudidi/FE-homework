<template>
  <div :class="['modal', { modal_opened: isOpen }]">
    <div :class="['modal__container', type]">
      <h2 class="modal__title">Создание проекта</h2>
      <div class="modal__wrapper"><slot /></div>
      <div class="modal__buttons">
        <Button
          v-on:click-btn="$emit('click-cancel-btn')"
          v-bind:button="cancelBtn"
          v-bind:class="['button', 'secondary-button', 'modal__button']"
        />
        <Button
          v-bind:button="acceptBtn"
          v-bind:class="['button', 'primary-button', 'modal__button']"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
    },
    type: {
      type: String,
    },
    cancelBtnTitle: {
      type: String,
    },
    acceptBtnTitle: {
      type: String,
    },
  },
  data() {
    return {
      cancelBtn: {
        id: 'cancel-btn',
        title: this.cancelBtnTitle,
      },
      acceptBtn: {
        id: 'accept-btn',
        title: this.acceptBtnTitle,
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss"></style>
