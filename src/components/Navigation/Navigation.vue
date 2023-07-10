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
            v-bind:to="path(navBtn)"
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
            <div v-if="!isUserAvatar" class="user__defaultImg">
              <div class="user__defaultImg-initials">
                {{ defaultUserAvatar }}
              </div>
            </div>

            <img
              v-else
              class="user-button__avatar"
              :src="currentUser.picture"
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
              <Link
                v-on:click-link="goToProfile"
                v-bind:link="profileLink"
                v-bind:class="['dropdown-menu__link']"
                :to="{ name: 'user-profile', params: { id: currentUser.id } }"
              />
            </li>
            <li class="dropdown-menu__item">
              <Link
                v-on:click-link="signOut"
                v-bind:link="signOutLink"
                v-bind:class="['dropdown-menu__link']"
              />
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import getUserInitials from '@/helpers/getUserInitials';
import store from '@/store';

export default {
  data() {
    return {
      profileLink: {
        id: 'profile-link',
        title: 'Профиль',
      },
      signOutLink: {
        id: 'signOut-link',
        title: 'Выход',
      },
      navBtns: [
        {
          id: 'projects',
          title: 'Проекты',
          isActive: false,
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
  computed: {
    ...mapGetters(['currentUser', 'updatedUserProfile']),

    defaultUserAvatar() {
      return getUserInitials(this.currentUser.name);
    },
    isUserAvatar() {
      if (this.currentUser.picture !== null) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    path(navBtn) {
      if (navBtn.id === 'tasks') {
        return {
          path: '/tasks',
          query: { author: this.currentUser.id },
        };
      } else if (navBtn.id === 'projects') {
        return {
          path: '/projects',
        };
      } else if (navBtn.id === 'users') {
        return {
          path: '/users',
        };
      }
    },
    ...mapActions(['fetchCurrentUser']),
    goToProfile() {
      const currentPath = this.$router.history.current.name;
      const userProfileId = this.$router.history.current.params.id;

      this.userBtn.isDropdownVisible = false;

      if (
        currentPath === 'user-profile' &&
        userProfileId === this.currentUser.id
      ) {
        this.userBtn.isActive = true;
        this.navBtns.forEach((btn) => {
          btn.isActive = false;
        });
      }
    },
    //
    signOut() {
      localStorage.removeItem('isAuth');
      localStorage.removeItem('token');
      this.$router.push('/login');

      this.userBtn.isActive = false;
      this.userBtn.isDropdownVisible = false;
    },
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
      const currentPath = this.$router.history.current.name;
      const userProfileId = this.$router.history.current.params.id;

      if (
        currentPath === 'user-profile' &&
        userProfileId === this.currentUser.id
      ) {
        this.userBtn.isActive = true;
        this.userBtn.isDropdownVisible = false;
      } else {
        this.userBtn.isActive = false;
        this.userBtn.isDropdownVisible = false;
      }
    },
  },
  watch: {
    $route(to, from) {
      this.navBtns.forEach((btn) => {
        if (to.name.includes(btn.id)) {
          btn.isActive = true;
        } else {
          btn.isActive = false;
        }
      });
      if (
        to.name.includes('profile') &&
        this.currentUser.id === this.$route.params.id
      ) {
        this.userBtn.isActive = true;
        this.navBtns.forEach((btn) => {
          btn.isActive = false;
        });
      } else if (
        to.name.includes('profile') &&
        this.currentUser.id !== this.$route.params.id
      ) {
        this.userBtn.isActive = false;
        this.navBtns.forEach((btn) => {
          if (btn.id === 'users') {
            btn.isActive = true;
          }
        });
      } else {
        this.userBtn.isActive = false;
      }
    },
  },
  beforeUpdate() {
    const path = this.$router.history.current.name;
    if (
      path.includes('profile') &&
      this.currentUser.id === this.$route.params.id
    ) {
      this.userBtn.isActive = true;
      this.navBtns.forEach((btn) => {
        btn.isActive = false;
      });
    }
  },
  beforeMount() {
    this.fetchCurrentUser();
  },
  mounted() {
    const path = this.$router.history.current.name;
    this.navBtns.forEach((btn) => {
      if (path.includes(btn.id)) {
        btn.isActive = true;
      } else if (btn.id === 'users' && path.includes('profile')) {
        btn.isActive = true;
      } else {
        btn.isActive = false;
      }
    });
  },
};
</script>

<style lang="scss"></style>
