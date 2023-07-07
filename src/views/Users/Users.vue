<template>
  <div class="wrapper">
    <div class="list users" v-if="allUsers.length">
      <div class="search-panel">
        <Input
          placeholder="Поиск..."
          type="search"
          :defaultInput="true"
          v-bind:class="['search-panel__input']"
        >
          <svg-icon
            v-bind:class="['field__icon']"
            name="search"
            :defaultInput="true"
          ></svg-icon
        ></Input>
        <Button
          v-bind:button="sortBtn"
          v-bind:class="['button', 'filter-button', 'search-panel__filtertBtn']"
        >
          <svg-icon
            v-bind:class="['search-panel__icon']"
            name="sort-arrow"
          ></svg-icon>
        </Button>
        <Link
          v-if="currentUserRole"
          v-bind:link="addUserBtn"
          v-bind:class="[
            'button',
            'primary-button',
            'search-panel__addUserBtn',
          ]"
          to="users/create"
        />
      </div>
      <UserItem
        v-for="user in allUsers"
        v-bind:key="user.id"
        v-bind:user="user"
        v-on:open-dropdown="openDropdown"
        v-on:click-outside="clickOutsideDropdown"
        :currentUserRole="currentUserRole"
      />
    </div>
    <noContent v-else text="Нет ни одного пользователя" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UserItem from '@/components/UserItem/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      addUserBtn: {
        id: 'add-user-btn',
        title: 'Добавить пользователя',
      },
      sortBtn: {
        id: 'user-sort-btn',
      },
    };
  },
  computed: {
    ...mapGetters(['allUsers']),
    ...mapGetters(['currentUser']),
    currentUserRole() {
      return this.currentUser.role === 'ADMIN' ? true : false;
    },
  },
  methods: {
    ...mapActions(['fetchUsers']),
    openDropdown(id) {
      this.allUsers.forEach((user) => {
        if (user.id === id) {
          user.isDropdownOpen = !user.isDropdownOpen;
        } else {
          user.isDropdownOpen = false;
        }
      });
    },
    clickOutsideDropdown(id) {
      this.allUsers.forEach((user) => {
        if (user.id === id) {
          user.isDropdownOpen = false;
        }
      });
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style lang="scss"></style>
