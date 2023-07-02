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

          <ul
            v-bind:class="['dropdown-menu']"
            v-if="userBtn.isDropdownVisible"
            v-click-outside="clickOutsideDropdown"
          >
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
          isActive: false,
          to: '/projects',
        },
        {
          id: 'tasks',
          title: 'Задачи',
          isActive: false,
          to: '/tasks',
        },
        {
          id: 'users',
          title: 'Пользователи',
          isActive: false,
          to: '/users',
        },
      ],
      userBtn: {
        id: 'account',
        isActive: false,
        isDropdownVisible: false,
      },
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === 'projects') {
        this.navBtns.forEach((btn) => {
          if (btn.id === 'projects') {
            btn.isActive = true;
          } else {
            btn.isActive = false;
          }
        });
      }
    },
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
    },
    selectUserBtn() {
      this.userBtn.isActive = !this.userBtn.isActive;
      this.userBtn.isDropdownVisible = !this.userBtn.isDropdownVisible;
    },
    clickOutsideDropdown() {
      this.userBtn.isActive = false;
      this.userBtn.isDropdownVisible = false;
    },
  },
  mounted() {
    const path = this.$router.history.current.name;
    this.navBtns.forEach((btn) => {
      if (path.includes(btn.id)) {
        btn.isActive = true;
      } else {
        btn.isActive = false;
      }
    });
  },
};
</script>

<style lang="scss"></style>
