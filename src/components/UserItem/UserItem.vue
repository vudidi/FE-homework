<template>
  <div class="user">
    <li class="list-item">
      <div class="list-container list__user-container">
        <div v-if="!isUserAvatar" class="user__defaultImg">
          <div class="user__defaultImg-initials">
            {{ defaultUserAvatar }}
          </div>
        </div>
        <img
          v-else
          class="list-userAvatar list__user-userAvatar"
          :src="user.picture"
          alt="Аватар пользователя"
        />
        <Link
          v-bind:link="userLink"
          :to="{ name: 'user-profile', params: { id: user.id } }"
        >
          <keep-alive>
            <h3 ref="username" class="list-title list__user-title">
              {{ user.name }}
            </h3></keep-alive
          >
        </Link>
        <div class="list-status list-status_type_off" v-if="!userStatus">
          Не активен
        </div>
      </div>

      <div
        class="list-menu list-menu_visible"
        v-click-outside="clickOutside"
        v-if="currentUserRole"
      >
        <Button
          v-bind:button="dropdownBtn"
          v-bind:class="[
            'button',
            'icon-button',
            'list-button',
            { 'icon-button_active': user.isDropdownOpen },
          ]"
          v-on:click-btn="$emit('open-dropdown', user.id)"
        >
          <svg-icon
            v-bind:class="['icon-button__icon']"
            name="menu-dots"
          ></svg-icon>
        </Button>
        <ul class="dropdown-menu" v-if="user.isDropdownOpen">
          <li class="dropdown-menu__item">
            <a class="dropdown-menu__link" href="#">Редактировать</a>
          </li>
          <li class="dropdown-menu__item">
            <button
              v-on:click="$emit('delete-user', user)"
              class="dropdown-menu__link dropdown-menu__link_type_delete"
            >
              Удалить
            </button>
          </li>
        </ul>
      </div>
    </li>
  </div>
</template>

<script>
import getUserInitials from '@/helpers/getUserInitials';
import { mapGetters } from 'vuex';

export default {
  props: {
    user: {
      type: Object,
      default: {},
    },
    currentUserRole: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dropdownBtn: {
        id: 'list-user-btn',
        isActive: false,
      },
      userLink: {
        id: 'user-link',
      },
    };
  },
  computed: {
    ...mapGetters(['usersFilter']),
    userStatus() {
      return this.user.status === 'ACTIVE' ? true : false;
    },
    defaultUserAvatar() {
      return getUserInitials(this.user.name);
    },
    isUserAvatar() {
      if (this.user.picture !== null) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    clickOutside() {
      this.$emit('click-outside', this.user.id);
    },
    getUsername() {
      this.$nextTick(function () {
        this.$refs.username.innerHTML = this.user.name;
        if (
          this.usersFilter !== null &&
          this.usersFilter.name &&
          this.$refs.username
        ) {
          const newTitle = `${this.$refs.username.innerHTML}`.replace(
            new RegExp(this.usersFilter.name, 'ig'),
            `<span class="list-title_highlight">$&</span>`
          );
          this.$refs.username.innerHTML = newTitle;
        }
      });
    },
  },
  mounted() {
    this.getUsername();
  },
  updated() {
    this.getUsername();
  },
};
</script>

<style lang="scss"></style>
