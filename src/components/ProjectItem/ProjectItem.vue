<template>
  <keep-alive>
    <div class="project">
      <li class="list-item">
        <div class="list-wrapper">
          <div class="list-container">
            <h3 class="list-title">{{ project.name }}</h3>
            <div class="tooltip tooltip__title">
              <div class="tooltip__content">{{ project.name }}</div>
            </div>
          </div>
          <div class="list-container">
            <div class="list-tooltip">
              <p class="list-code">{{ project.code }}</p>
              <div class="tooltip tooltip__code">
                <div class="tooltip__content">{{ project.code }}</div>
              </div>
            </div>

            <div class="list-tooltip">
              <p class="list-create">{{ project.author }} {{ dateCreated }}</p>
              <div class="tooltip tooltip__create">
                <div class="tooltip__content">
                  {{ project.author }} {{ fullDateCreated }}
                </div>
              </div>
            </div>

            <div class="list-tooltip">
              <p
                class="list-update"
                v-on:mouseover="mouseOver"
                v-on:mouseleave="mouseLeave"
              >
                {{ project.authorEdited }} {{ dateEdited }}
              </p>
              <div class="tooltip tooltip__update" v-if="isHover">
                <div class="tooltip__content">
                  {{ project.authorEdited }} {{ fullDateEdited }}
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
              { 'icon-button_active': project.isDropdownOpen },
            ]"
            v-on:click-btn="$emit('open-dropdown', project.id)"
          >
            <svg-icon
              v-bind:class="['icon-button__icon']"
              name="menu-dots"
            ></svg-icon>
          </Button>
          <ul class="dropdown-menu" v-if="project.isDropdownOpen">
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
  </keep-alive>
</template>

<script>
import { getDateAndTime, getFullDateAndTime } from '@/helpers/formatDate';

export default {
  props: {
    project: {
      type: Object,
      default: {},
    },
  },
  computed: {
    dateCreated() {
      return getDateAndTime(this.project.dateCreated);
    },
    fullDateCreated() {
      return getFullDateAndTime(this.project.dateCreated);
    },
    dateEdited() {
      if (this.project.dateEdited) {
        return getDateAndTime(this.project.dateEdited);
      } else {
        return '';
      }
    },
    fullDateEdited() {
      if (this.project.dateEdited) {
        return getFullDateAndTime(this.project.dateEdited);
      } else {
        return '';
      }
    },
  },
  methods: {
    mouseOver() {
      this.isHover = true;
    },
    mouseLeave() {
      this.isHover = false;
    },
    clickOutside() {
      this.$emit('click-outside', this.project.id);
    },
  },
  data() {
    return {
      isHover: false,
      dropdownBtn: {
        id: 'list-project-btn',
        isActive: false,
      },
    };
  },
};
</script>

<style lang="scss"></style>
