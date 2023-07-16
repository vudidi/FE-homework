<template>
  <keep-alive>
    <div class="project">
      <li class="list-item">
        <div class="list-wrapper">
          <div class="list-container">
            <router-link
              :to="{
                name: 'tasks',
                query: {
                  page: 1,
                  field: 'dateCreated',
                  type: 'desc',
                  author: null,
                  projectId: project.id,
                  name: null,
                },
              }"
              :class="['list-title', 'list__link-title']"
              ><div ref="projectTitle">{{ project.name }}</div></router-link
            >
            <div class="tooltip tooltip__title">
              <div class="tooltip__content">{{ project.name }}</div>
            </div>
          </div>
          <div class="list-container">
            <div class="list-tooltip">
              <p ref="projectCode" class="list-code">{{ project.code }}</p>
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
              <button
                v-on:click="$emit('edit-project', project)"
                class="dropdown-menu__link"
              >
                Редактировать
              </button>
            </li>
            <li class="dropdown-menu__item">
              <button
                v-on:click="$emit('delete-project', project)"
                class="dropdown-menu__link dropdown-menu__link_type_delete"
              >
                Удалить
              </button>
            </li>
          </ul>
        </div>
      </li>
    </div>
  </keep-alive>
</template>

<script>
import { mapGetters } from 'vuex';
import { getDateAndTime, getFullDateAndTime } from '@/helpers/formatDate';

export default {
  props: {
    project: {
      type: Object,
      default: {},
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
  computed: {
    ...mapGetters(['currentUser', 'projectsFilter']),
    isOwnerOrAdmin() {
      if (
        this.currentUser.id === this.project.authorId ||
        this.currentUser.role === 'ADMIN'
      ) {
        return true;
      } else {
        return false;
      }
    },
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
    getProjectTitle() {
      this.$nextTick(function () {
        this.$refs.projectTitle.innerHTML = this.project.name;
        if (
          this.projectsFilter !== null &&
          this.projectsFilter.name &&
          this.$refs.projectTitle
        ) {
          const newTitle = `${this.$refs.projectTitle.innerHTML}`.replace(
            new RegExp(this.projectsFilter.name, 'ig'),
            `<span class="list-title_highlight">$&</span>`
          );
          this.$refs.projectTitle.innerHTML = newTitle;
        }
      });
    },
    getProjectCode() {
      this.$nextTick(function () {
        this.$refs.projectCode.innerHTML = this.project.code;
        if (
          this.projectsFilter !== null &&
          this.projectsFilter.name &&
          this.$refs.projectCode
        ) {
          const newTitle = `${this.$refs.projectCode.innerHTML}`.replace(
            new RegExp(this.projectsFilter.name, 'ig'),
            `<span class="list-title_highlight">$&</span>`
          );
          this.$refs.projectCode.innerHTML = newTitle;
        }
      });
    },
  },
  mounted() {
    this.getProjectTitle();
    this.getProjectCode();
  },
  updated() {
    this.getProjectTitle();
    this.getProjectCode();
  },
};
</script>

<style lang="scss"></style>
