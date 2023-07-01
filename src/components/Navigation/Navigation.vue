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
      </ul>
    </nav>
  </header>
</template>

<script>
import Link from '@/UI/Link/Link.vue';

export default {
  props: {},
  components: {
    Link,
  },
  data() {
    return {
      navBtns: [
        {
          id: 'main',
          title: 'Главная',
          isActive: true,
          path: '/',
        },
        {
          id: 'tasks',
          title: 'Задачи',
          isActive: false,
          path: '/tasks',
        },
        {
          id: 'users',
          title: 'Пользователи',
          isActive: false,
          path: '/users',
        },
      ],
    };
  },
  methods: {
    selectNavBtn(event) {
      this.navBtns.forEach((btn) => {
        if (btn.id === event.target.id) {
          btn.isActive = true;
        } else {
          btn.isActive = false;
        }
      });
    },
  },
};
</script>

<style lang="scss"></style>
