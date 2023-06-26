<template>
  <div class="task">
    <li class="list-item">
      <div class="list-wrapper">
        <div class="list-container">
          <h3 class="list-title">{{ task.title }}</h3>
          <div class="tooltip tooltip__title">
            <div class="tooltip__content">{{ task.title }}</div>
          </div>
          <img
            class="list-userAvatar"
            :src="task.avatar"
            alt="Аватар пользователя"
          />
        </div>
        <div class="list-container">
          <p class="list-code">{{ task.code }}</p>
          <div class="tooltip tooltip__code">
            <div class="tooltip__content">{{ task.code }}</div>
          </div>
          <p class="list-create">{{ task.create }}</p>
          <div class="tooltip tooltip__create">
            <div class="tooltip__content">{{ task.create }}</div>
          </div>
          <p
            class="list-update"
            v-on:mouseover="mouseOver"
            v-on:mouseleave="mouseLeave"
          >
            {{ task.update }}
          </p>
          <div class="tooltip tooltip__update" v-if="isHover">
            <div class="tooltip__content">
              {{ task.update }}
            </div>
          </div>
        </div>
      </div>
      <div class="list-menu">
        <Button
          v-bind:button="dropdownBtn"
          v-bind:class="[
            'button',
            'icon-button',
            'list-button',
            { 'icon-button_active': task.isDropdownOpen },
          ]"
          v-on:click-btn="$emit('open-dropdown', task.id)"
        >
          <svg-icon
            v-bind:class="['icon-button__icon']"
            name="menu-dots"
          ></svg-icon>
        </Button>
        <ul class="dropdown-menu" v-if="task.isDropdownOpen">
          <li class="dropdown-menu__item">
            <a class="dropdown-menu__link" href="#">Редактировать</a>
          </li>
          <li class="dropdown-menu__item">
            <a
              class="dropdown-menu__link dropdown-menu__link_type_delete"
              href="#"
              >Удалить</a
            >
          </li>
        </ul>
      </div>
    </li>
  </div>
</template>

<script>
import Button from '@/UI/Button/Button.vue';

export default {
  components: { Button },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    mouseOver() {
      this.isHover = true;
    },
    mouseLeave() {
      this.isHover = false;
    },
  },
  data() {
    return {
      isHover: false,
      dropdownBtn: {
        id: 'list-task-btn',
        isActive: false,
      },
    };
  },
};
</script>

<style lang="scss"></style>
