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
          v-if="isAdmin"
          v-bind:link="addUserBtn"
          v-bind:class="[
            'button',
            'primary-button',
            'search-panel__addUserBtn',
          ]"
        />
      </div>
      <UserItem
        v-for="user in allUsers"
        v-bind:key="user.id"
        v-bind:user="user"
        v-on:open-dropdown="openDropdown"
        v-on:click-outside="clickOutsideDropdown"
        :isAdmin="isAdmin"
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
  computed: mapGetters(['allUsers']),
  mounted() {
    this.fetchUsers();
  },

  data() {
    return {
      isAdmin: true,
      addUserBtn: {
        id: 'add-user-btn',
        title: 'Добавить пользователя',
        to: 'users/create',
      },
      sortBtn: {
        id: 'user-sort-btn',
      },
    };
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
};
</script>

<style lang="scss"></style>
