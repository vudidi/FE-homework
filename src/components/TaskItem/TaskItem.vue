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
          <div class="list-tooltip">
            <p class="list-code">{{ task.code }}</p>
            <div class="tooltip tooltip__code">
              <div class="tooltip__content">{{ task.code }}</div>
            </div>
          </div>

          <div class="list-tooltip">
            <p class="list-create">{{ task.create }}</p>
            <div class="tooltip tooltip__create">
              <div class="tooltip__content">{{ task.create }}</div>
            </div>
          </div>

          <div :class="['list-status', computedStatusClass]">
            {{ task.status }}
          </div>

          <div class="list-tooltip">
            <p
              class="list-update"
              v-on:mouseover="mouseOver"
              v-on:mouseleave="mouseLeave"
            >
              {{ task.update }}
            </p>
            <div class="tooltip tooltip__update">
              <div class="tooltip__content">
                {{ task.update }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-menu" v-click-outside="clickOutside">
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
export default {
  props: {
    task: {
      type: Object,
      default: {},
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
  methods: {
    mouseOver() {
      this.isHover = true;
    },
    mouseLeave() {
      this.isHover = false;
    },
    clickOutside() {
      this.$emit('click-outside', this.task.id);
    },
  },
  computed: {
    computedStatusClass() {
      if (
        this.task.status === 'Черновик' ||
        this.task.status === 'В работе' ||
        this.task.status === 'Тестирование'
      ) {
        return 'list-status_type_draft';
      } else if (
        this.task.status === 'Завершена' ||
        this.task.status === 'Выполнена' ||
        this.task.status === 'Закрыта' ||
        this.task.status === 'Активен'
      ) {
        return 'list-status_type_main';
      } else if (this.task.status === 'Удалена') {
        return 'list-status_type_error';
      } else {
        return 'list-status_type_off';
      }
    },
  },
};
</script>

<style lang="scss"></style>
