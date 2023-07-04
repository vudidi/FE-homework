<template>
  <div class="wrapper">
    <div class="list users">
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
        v-for="user in users"
        v-bind:key="user.id"
        v-bind:user="user"
        v-on:open-dropdown="openDropdown"
        v-on:click-outside="clickOutsideDropdown"
        :isAdmin="isAdmin"
      />
    </div>
  </div>
</template>

<script>
import UserItem from '@/components/UserItem/UserItem.vue';

export default {
  components: {
    UserItem,
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
      users: [
        {
          id: '9c70c4fe-18ea-11ee-be56-0242ac120002',
          name: 'Львов Петр Ибрагимович',
          avatar: require('@/assets/images/avatar.png'),
          isActive: true,
          isDropdownOpen: false,
        },
        {
          id: 'ae442ef0-18ea-11ee-be56-0242ac120002',
          name: 'Акунин Иван Иванович',
          avatar: require('@/assets/images/avatar.png'),
          isActive: false,
          isDropdownOpen: false,
        },
        {
          id: 'b4397f36-18ea-11ee-be56-0242ac120002',
          name: 'Баранов Виктор Витальевич',
          avatar: require('@/assets/images/avatar.png'),
          isActive: true,
          isDropdownOpen: false,
        },
        {
          id: 'ba2a2b84-18ea-11ee-be56-0242ac120002',
          name: 'Котов Семен Васильевич',
          avatar: require('@/assets/images/avatar.png'),
          isActive: false,
          isDropdownOpen: false,
        },
        {
          id: 'bede93ae-18ea-11ee-be56-0242ac120002',
          name: 'Сазонова Вера Владимировна',
          isActive: true,
          isDropdownOpen: false,
          avatar: require('@/assets/images/avatar.png'),
        },
      ],
    };
  },
  methods: {
    openDropdown(id) {
      this.users.forEach((user) => {
        if (user.id === id) {
          user.isDropdownOpen = !user.isDropdownOpen;
        } else {
          user.isDropdownOpen = false;
        }
      });
    },
    clickOutsideDropdown(id) {
      this.users.forEach((user) => {
        if (user.id === id) {
          user.isDropdownOpen = false;
        }
      });
    },
  },
};
</script>

<style lang="scss"></style>
