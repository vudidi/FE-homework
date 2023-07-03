<template>
  <div class="user">
    <li class="list-item">
      <div class="list-container list__user-container">
        <img
          class="list-userAvatar list__user-userAvatar"
          :src="user.avatar"
          alt="Аватар пользователя"
        />
        <h3 class="list-title list__user-title">{{ user.name }}</h3>
        <div class="list-status list-status_type_off" v-if="!user.isActive">
          Не активен
        </div>
      </div>

      <div
        class="list-menu list__user-menu"
        v-click-outside="clickOutside"
        v-if="isAdmin"
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: {},
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
    };
  },
};
</script>

<style lang="scss"></style>
