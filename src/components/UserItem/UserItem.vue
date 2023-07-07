<template>
  <div class="user">
    <li class="list-item">
      <div class="list-container list__user-container">
        <img
          class="list-userAvatar list__user-userAvatar"
          :src="user.picture"
          alt="Аватар пользователя"
        />
        <Link
          v-bind:link="userLink"
          :to="{ name: 'user-profile', params: { id: user.id } }"
          ><h3 class="list-title list__user-title">{{ user.name }}</h3></Link
        >
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
    user: {
      type: Object,
      default: {},
    },
    currentUserRole: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    userStatus() {
      return this.user.status === 'ACTIVE' ? true : false;
    },
  },
  methods: {
    clickOutside() {
      this.$emit('click-outside', this.user.id);
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
};
</script>

<style lang="scss"></style>
