<template>
  <div class="task">
    <li class="list-item">
      <div class="list-wrapper">
        <div class="list-container">
          <h3 class="list-title">{{ task.name }}</h3>
          <div class="tooltip tooltip__title">
            <div class="tooltip__content">{{ task.name }}</div>
          </div>
          <div v-if="!isUserAvatar" class="list__defaultAvatar">
            <div class="list__defaultAvatar-initials">
              {{ defaultUserAvatar }}
            </div>
          </div>
          <img
            v-else
            class="list-userAvatar"
            :src="task.authorAvatar"
            alt="Аватар пользователя"
          />
        </div>
        <div class="list-container">
          <div class="list-tooltip">
            <p class="list-code">{{ task.number }}</p>
            <div class="tooltip tooltip__code">
              <div class="tooltip__content">{{ task.code }}</div>
            </div>
          </div>

          <div class="list-tooltip">
            <p class="list-create">{{ task.author }} {{ dateCreated }}</p>
            <div class="tooltip tooltip__create">
              <div class="tooltip__content">
                {{ task.author }} {{ fullDateCreated }}
              </div>
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
              {{ task.authorEdited }} {{ dateEdited }}
            </p>
            <div class="tooltip tooltip__update">
              <div class="tooltip__content">
                {{ task.authorEdited }} {{ fullDateEdited }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isOwnerOrAdmin"
        class="list-menu"
        v-click-outside="clickOutside"
      >
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
import { mapGetters } from 'vuex';
import { getDateAndTime, getFullDateAndTime } from '@/helpers/formatDate';
import getUserInitials from '@/helpers/getUserInitials';

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
    ...mapGetters(['currentUser']),
    isOwnerOrAdmin() {
      if (
        this.currentUser.id === this.task.authorId ||
        this.currentUser.role === 'ADMIN'
      ) {
        return true;
      } else {
        return false;
      }
    },
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
        this.task.status === 'Закрыта'
      ) {
        return 'list-status_type_main';
      } else if (this.task.status === 'Удалена') {
        return 'list-status_type_error';
      }
    },
    defaultUserAvatar() {
      return getUserInitials(this.task.author);
    },
    isUserAvatar() {
      if (this.task.authorAvatar !== null) {
        return true;
      } else {
        return false;
      }
    },
    dateCreated() {
      return getDateAndTime(this.task.dateCreated);
    },
    fullDateCreated() {
      return getFullDateAndTime(this.task.dateCreated);
    },
    dateEdited() {
      if (this.task.dateEdited) {
        return getDateAndTime(this.task.dateEdited);
      } else {
        return '';
      }
    },
    fullDateEdited() {
      if (this.task.dateEdited) {
        return getFullDateAndTime(this.task.dateEdited);
      } else {
        return '';
      }
    },
  },
};
</script>

<style lang="scss"></style>
