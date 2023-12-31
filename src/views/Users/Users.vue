<template>
  <div class="wrapper">
    <div class="list users" v-if="allUsers.length">
      <PreloadModal :isOpen="isUsersLoading" />
      <Modal
        v-on:click-cancel-btn="closeDeleteModal"
        v-on:click-accept-btn="deleteUser"
        v-bind:isOpen="isDeleteModalOpen"
        modalTitle="Удаление"
        type="modal__container_type_confirm"
        cancelBtnTitle="Отмена"
        acceptBtnTitle="Да"
      >
        <h5 class="modal__text">
          Вы уверены что хотите <span>удалить</span> пользователя
          {{ deletedUsername }}?
        </h5>
      </Modal>
      <div class="search-panel">
        <Input
          placeholder="Поиск..."
          type="search"
          :defaultInput="true"
          :class="['search-panel__input']"
          v-model="model.searchValue"
          v-on:search-on-enter="searchUser"
          errorText="Ничего не найдено"
          :isErrorVisible="!usersSearchResult"
        >
          <svg-icon
            :class="['field__icon']"
            name="search"
            :defaultInput="true"
          ></svg-icon
        ></Input>
        <Button
          v-on:click-btn="toggleSort"
          v-bind:button="sortBtn"
          v-bind:class="['button', 'filter-button', 'search-panel__filtertBtn']"
        >
          <svg-icon
            v-bind:class="[
              'search-panel__icon',
              { 'search-panel__icon_asc': isAscSort },
            ]"
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
          :to="{ name: 'user-create' }"
        />
      </div>
      <UserItem
        v-for="user in allUsers"
        v-bind:key="user.id"
        v-bind:user="user"
        v-on:open-dropdown="openDropdown"
        v-on:click-outside="clickOutsideDropdown"
        v-on:delete-user="confirmModalOpen"
        :currentUserRole="currentUserRole"
      />
      <Pagination
        :isPagination="isPagination"
        v-bind:pages="visibleUsersPages"
        :firstPage="firstPage"
        :isFirstPageVisible="isFirstPageVisible"
        :lastPage="lastPage"
        :isLastPageVisible="isLastPageVisible"
        :isBackBtnActive="usersPage > 1"
        :isForwardBtnActive="usersPage < totalUsersPages.length"
        :isLeftExtend="isLeftExtend"
        :isRightExtend="isRightExtend"
        v-on:go-page="goPage"
        v-on:go-first="goFirstPage"
        v-on:go-last="goLastPage"
        v-on:on-enter="goPageOnEnter"
        v-on:go-back="goBack"
        v-on:go-forward="goForward"
        v-model="model.pageValue"
      />
    </div>
    <noContent
      v-else
      :to="{
        name: 'user-create',
      }"
      text="Нет ни одного пользователя"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import UserItem from '@/components/UserItem/UserItem.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import PreloadModal from '@/components/PreloadModal/PreloadModal.vue';
import store from '@/store';

export default {
  components: {
    UserItem,
    PreloadModal,
    Pagination,
  },
  data() {
    return {
      isDeleteModalOpen: false,
      deletedUserId: '',
      deletedUsername: '',
      model: {
        searchValue: '',
        pageValue: '',
      },
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
    ...mapGetters([
      'allUsers',
      'isUsersLoading',
      'currentUser',
      'totalUsersPages',
      'visibleUsersPages',
      'usersPage',
      'usersSort',
      'usersFilter',
      'usersSearchResult',
    ]),
    isPagination() {
      return this.totalUsersPages.length > 1 ? false : true;
    },
    currentUserRole() {
      return this.currentUser.role === 'ADMIN' ? true : false;
    },
    isLeftExtend() {
      if (this.totalUsersPages.length > 10 && this.usersPage >= 5) {
        return true;
      } else {
        return false;
      }
    },
    isRightExtend() {
      if (
        this.totalUsersPages.length > 10 &&
        this.usersPage <= this.totalUsersPages.length - 4
      ) {
        return true;
      } else {
        return false;
      }
    },
    firstPage() {
      if (this.totalUsersPages.length > 10)
        return {
          num: '1',
          isSelected: false,
        };
      else {
        return {};
      }
    },
    isFirstPageVisible() {
      if (this.totalUsersPages.length > 10 && this.usersPage > 4) {
        return true;
      } else {
        return false;
      }
    },
    lastPage() {
      if (this.totalUsersPages.length > 10)
        return {
          num: this.totalUsersPages.length,
          isSelected: false,
        };
      else {
        return {};
      }
    },
    isLastPageVisible() {
      if (
        this.totalUsersPages.length > 10 &&
        this.usersPage < this.totalUsersPages.length - 3
      ) {
        return true;
      } else {
        return false;
      }
    },
    queryPage() {
      return this.usersPage;
    },
    isAscSort() {
      return this.usersSort === 'asc' ? true : false;
    },
  },
  methods: {
    ...mapMutations([
      'SET_UPD_US_PAGES',
      'SET_US_SORT',
      'SET_US_FILTER',
      'SET_US_SEARCH_RESULT',
    ]),
    ...mapActions(['fetchUsers', 'changeUserStatus', 'fetchUsersSearch']),
    searchUser() {
      if (this.model.searchValue !== this.usersFilter?.name) {
        this.SET_US_FILTER({ name: this.model.searchValue });
        this.fetchUsersSearch({
          page: 1,
          limit: 10,
          sort: this.usersSort,
          filter: this.usersFilter,
        });
        this.$router.push({
          query: {
            page: this.usersPage,
            sort: this.usersSort,
            ...this.usersFilter,
          },
        });
      }
    },
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
    closeDeleteModal() {
      this.isDeleteModalOpen = false;
    },
    confirmModalOpen(user) {
      this.deletedUserId = user.id;
      this.deletedUsername = user.name;
      this.isDeleteModalOpen = true;
      this.openDropdown(user.id);
    },
    deleteUser() {
      this.changeUserStatus({
        page: this.usersPage,
        sort: this.usersSort,
        filter: this.usersFilter,
        id: this.deletedUserId,
      });
      this.isDeleteModalOpen = false;
    },
    //--------------------
    goPage(page) {
      this.SET_UPD_US_PAGES(page.num);
      this.fetchUsers({
        page: page.num,
        limit: 10,
        sort: this.usersSort,
        filter: this.usersFilter,
      });
      this.$router.push({
        query: {
          page: page.num,
          sort: this.usersSort,
          ...this.usersFilter,
        },
      });
    },
    goFirstPage(page) {
      this.SET_UPD_US_PAGES(page.num);
      this.fetchUsers({
        page: page.num,
        limit: 10,
        sort: this.usersSort,
        filter: this.usersFilter,
      });
      this.$router.push({
        query: {
          page: page.num,
          sort: this.usersSort,
          ...this.usersFilter,
        },
      });
    },
    goLastPage(page) {
      this.SET_UPD_US_PAGES(page.num);
      this.fetchUsers({
        page: page.num,
        limit: 10,
        sort: this.usersSort,
        filter: this.usersFilter,
      });
      this.$router.push({
        query: {
          page: page.num,
          sort: this.usersSort,
          ...this.usersFilter,
        },
      });
    },
    goPageOnEnter() {
      let pageValue = '';

      if (this.totalUsersPages.length < this.model.pageValue) {
        pageValue = this.totalUsersPages.length;
      } else {
        pageValue = this.model.pageValue;
      }

      if (this.usersPage !== +pageValue) {
        this.SET_UPD_US_PAGES(this.model.pageValue);
        this.fetchUsers({
          page: pageValue,
          limit: 10,
          sort: this.usersSort,
          filter: this.usersFilter,
        });
        this.$router.push({
          query: {
            page: pageValue,
            sort: this.usersSort,
            ...this.usersFilter,
          },
        });
      }

      this.model.pageValue = '';
    },
    goBack() {
      this.SET_UPD_US_PAGES(this.usersPage - 1);
      this.fetchUsers({
        page: this.usersPage,
        limit: 10,
        sort: this.usersSort,
        filter: this.usersFilter,
      });
      this.$router.push({
        query: {
          page: this.usersPage,
          sort: this.usersSort,
          ...this.usersFilter,
        },
      });
    },
    goForward() {
      this.SET_UPD_US_PAGES(this.usersPage + 1);
      this.fetchUsers({
        page: this.usersPage,
        limit: 10,
        sort: this.usersSort,
        filter: this.usersFilter,
      });
      this.$router.push({
        query: {
          page: this.usersPage,
          sort: this.usersSort,
          ...this.usersFilter,
        },
      });
    },

    toggleSort() {
      if (this.usersSort === 'desc') {
        this.SET_US_SORT('asc');
      } else {
        this.SET_US_SORT('desc');
      }

      this.fetchUsers({
        page: this.usersPage,
        limit: 10,
        sort: this.usersSort,
        filter: this.usersFilter,
      });
      this.$router.push({
        query: {
          page: this.usersPage,
          sort: this.usersSort,
          ...this.usersFilter,
        },
      });
    },
    //--------------------
  },
  beforeRouteLeave(to, from, next) {
    if (!this.usersSearchResult) {
      this.SET_US_FILTER(null);
      this.SET_US_SEARCH_RESULT(true);
    }
    next();
  },
  mounted() {
    if (this.usersFilter !== null) {
      this.model.searchValue = this.usersFilter.name;
    }

    if (!this.usersSearchResult) {
      this.SET_US_SEARCH_RESULT(true);
    }

    if (this.$route.query) {
      this.SET_US_SORT(this.$route.query.sort);

      this.fetchUsers({
        page: this.$route.query.page,
        limit: 10,
        sort: this.$route.query.sort,
        filter: this.usersFilter,
      });
    } else {
      this.fetchUsers({
        page: this.usersPage,
        limit: 10,
        sort: this.usersSort,
        filter: null,
      });
    }
  },
};
</script>

<style lang="scss"></style>
