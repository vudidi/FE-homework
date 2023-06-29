<template>
  <header class="header">
    <nav class="header__nav">
      <ul class="header__nav-items">
        <li
          v-for="(navBtn, index) in navBtns"
          :key="index"
          class="header__nav-item"
        >
          <Link
            v-on:click-link="selectNavBtn"
            v-bind:link="navBtn"
            v-bind:class="[
              'button',
              'nav-button',
              { 'nav-button_active': navBtn.isActive },
            ]"
          />
        </li>
        <li class="header__nav-item">
          <Button
            v-on:click-btn="selectUserBtn"
            v-bind:button="userBtn"
            v-bind:class="[
              'button',
              'user-button',
              { 'user-button_active': userBtn.isActive },
            ]"
          >
            <img
              class="user-button__avatar"
              src="@/assets/images/avatar.png"
              alt="Аватар пользователя" />
            <svg-icon
              v-bind:class="['user-button__icon']"
              name="arrow"
            ></svg-icon
          ></Button>

          <ul v-bind:class="['dropdown-menu']" v-if="isDropdownVisible">
            <li class="dropdown-menu__item">
              <a class="dropdown-menu__link" href="#">Профиль</a>
            </li>
            <li class="dropdown-menu__item">
              <a class="dropdown-menu__link" href="#">Выход</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      navBtns: [
        {
          id: 'projects',
          title: 'Проекты',
          isActive: true,
        },
        {
          id: 'tasks',
          title: 'Задачи',
          isActive: false,
        },
        {
          id: 'users',
          title: 'Пользователи',
          isActive: false,
        },
      ],
      userBtn: {
        id: 'account',
        isActive: false,
      },
    };
  },
  methods: {
    selectNavBtn(event) {
      this.userBtn.isActive = false;

      this.navBtns.forEach((btn) => {
        if (btn.id === event.target.id) {
          btn.isActive = true;
        } else {
          btn.isActive = false;
        }
      });

      this.$emit('toggle-page', event.target.id);
    },
    selectUserBtn() {
      this.userBtn.isActive = !this.userBtn.isActive;

      this.navBtns.forEach((btn) => {
        btn.isActive = false;
      });
    },
  },
  computed: {
    isDropdownVisible() {
      return this.userBtn.isActive;
    },
  },
};
</script>

<style lang="scss"></style>
