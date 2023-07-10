<template>
  <div class="wrapper">
    <Modal
      v-on:click-cancel-btn="closeCreateModal"
      v-bind:isOpen="isCreateModalOpen"
      modalTitle="Создание проекта"
      type="modal__container_type_create"
      cancelBtnTitle="Отмена"
      acceptBtnTitle="Создать проект"
    >
      <div class="modal__field">
        <div class="modal__field-label">
          Код
          <svg-icon
            v-bind:class="['modal__field-icon']"
            name="require"
          ></svg-icon>
        </div>

        <Input
          placeholder="Введите текст..."
          type="text"
          :defaultInput="true"
          v-bind:class="['modal__field-input']"
          :maxlength="64"
          :minlength="3"
        />
      </div>
      <div class="modal__field">
        <div class="modal__field-label">
          Название
          <svg-icon
            v-bind:class="['modal__field-icon']"
            name="require"
          ></svg-icon>
        </div>

        <Input
          placeholder="Введите текст..."
          type="text"
          :defaultInput="true"
          v-bind:class="['modal__field-input']"
          :maxlength="256"
          :minlength="3"
        />
      </div>
    </Modal>
    <div class="list projects" v-if="allProjects.length">
      <SearchPanel
        v-bind:items="sortProjectsSelect"
        selectID="sortProjectsSelect"
        v-on:onSelectClick="updateSortValue"
        v-on:onSelectEnter="updateSortValue"
        v-bind:sortBtn="sortBtn"
        v-bind:addBtn="addProjectBtn"
        v-bind:filterBtn="filterBtn"
        v-on:click-link="openCreateModal"
      />

      <ProjectItem
        v-for="project in allProjects"
        v-bind:key="project.id"
        v-bind:project="project"
        v-on:open-dropdown="openDropdown"
        v-on:click-outside="clickOutsideDropdown"
      />
      <Pagination
        v-bind:pages="visiblePages"
        :firstPage="firstPage"
        :isFirstPageVisible="isFirstPageVisible"
        :lastPage="lastPage"
        :isLastPageVisible="isLastPageVisible"
        :isBackBtnActive="currentPage > 1"
        :isForwardBtnActive="currentPage < totalPages.length"
        :isLeftExtend="currentPage >= 5"
        :isRightExtend="currentPage <= totalPages.length - 4"
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
      v-on:click-link="openCreateModal"
      text="Не создан ни один проект"
    >
    </noContent>
  </div>
</template>

<script>
import ProjectItem from '@/components/ProjectItem/ProjectItem.vue';
import SearchPanel from '@/components/SearchPanel/SearchPanel.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import getOverflowValue from '@/helpers/showTooltip';
import { tooltipClasses } from '@/helpers/constants';
import renderSelect from '@/helpers/renderSelect';
import store from '@/store';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    ProjectItem,
    SearchPanel,
    Pagination,
  },
  data() {
    return {
      isCreateModalOpen: false,
      model: {
        sortValue: 'По названию',
        pageValue: '',
      },
      addProjectBtn: {
        id: 'project-add-btn',
        title: 'Добавить',
        to: '',
      },
      sortBtn: {
        id: 'project-sort-btn',
      },
      filterBtn: {
        id: 'filter-sort-btn',
        isVisible: false,
      },
      sortProjectsSelect: [
        {
          name: 'По названию',
          value: 'title',
        },
        {
          name: 'По автору',
          value: 'author',
        },
        {
          name: 'По дате создания',
          value: 'create',
        },
        {
          name: 'По дате обновления',
          value: 'update',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['allProjects', 'totalPages', 'visiblePages', 'currentPage']),
    firstPage() {
      if (this.totalPages.length > 5)
        return {
          num: '1',
          isSelected: false,
        };
      else {
        return {};
      }
    },
    isFirstPageVisible() {
      if (this.currentPage >= 5) {
        return true;
      } else {
        return false;
      }
    },
    lastPage() {
      if (this.totalPages.length > 5)
        return {
          num: this.totalPages.length,
          isSelected: false,
        };
      else {
        return {};
      }
    },
    isLastPageVisible() {
      if (this.currentPage < this.totalPages.length - 3) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapMutations(['updateTotalPages']),
    ...mapActions(['fetchProjects', 'fetchUsers']),
    goPage(page) {
      this.updateTotalPages(page.num);
      this.fetchProjects(page.num, null);
    },
    goFirstPage(page) {
      this.updateTotalPages(page.num);
      this.fetchProjects(page.num, null);
    },
    goLastPage(page) {
      this.updateTotalPages(page.num);
      this.fetchProjects(page.num, null);
    },
    goPageOnEnter() {
      this.updateTotalPages(this.model.pageValue);
      this.fetchProjects(this.model.pageValue, null);
      this.model.pageValue = '';
    },
    goBack() {
      this.updateTotalPages(this.currentPage - 1);
      this.fetchProjects(this.currentPage, null);
    },
    goForward() {
      this.updateTotalPages(this.currentPage + 1);
      this.fetchProjects(this.currentPage, null);
    },
    updateSortValue(value) {
      this.model.sortValue = value;
    },
    openCreateModal() {
      this.isCreateModalOpen = true;
    },
    closeCreateModal() {
      this.isCreateModalOpen = false;
    },
    openDropdown(id) {
      this.allProjects.forEach((project) => {
        if (project.id === id) {
          project.isDropdownOpen = !project.isDropdownOpen;
        } else {
          project.isDropdownOpen = false;
        }
      });
    },
    clickOutsideDropdown(id) {
      this.allProjects.forEach((project) => {
        if (project.id === id) {
          project.isDropdownOpen = false;
        }
      });
    },
  },
  // ---------------------------------------------
  beforeMount() {
    this.fetchUsers();
  },
  mounted() {
    this.fetchProjects(this.currentPage, null);
  },
  updated() {
    getOverflowValue(tooltipClasses);
    renderSelect();
  },
  // ---------------------------------------------
  beforeRouteEnter(to, from, next) {
    if (from.name === 'login') {
      store.dispatch('fetchCurrentUser');
      next();
    } else {
      next();
    }
  },
};
</script>

<style lang="scss"></style>
