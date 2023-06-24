<template>
  <header class="header">
    <nav class="header__nav">
      <ul class="header__nav-items">
        <li class="header__nav-item">
          <Link
            id="projects"
            v-bind:class="['button', 'nav-button']"
            title="Проекты"
          />
        </li>
        <li class="header__nav-item">
          <Link
            id="tasks"
            v-bind:class="['button', 'nav-button']"
            title="Задачи"
          />
        </li>
        <li class="header__nav-item">
          <Link
            id="users"
            v-bind:class="['button', 'nav-button']"
            title="Пользователи"
          />
        </li>
        <li class="header__nav-item">
          <button id="account" class="button user-button">
            <img
              class="user-button__avatar"
              src="@/assets/images/avatar.png"
              alt="Аватар пользователя"
            />
            <svg-icon iconClass="arrow-down"></svg-icon>
          </button>

          <ul class="dropdown-menu">
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
import Link from '@/components/Link/Link.vue';
// import VueLogo from '@/assets/icons/arrow-down.svg';
// import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

export default {
  components: {
    Link,
  },
};
</script>

<style lang="scss"></style>
