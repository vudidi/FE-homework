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
    <Modal
      v-on:click-cancel-btn="closeDeleteModal"
      v-on:click-accept-btn="deleteProject"
      v-bind:isOpen="isDeleteModalOpen"
      modalTitle="Удаление"
      type="modal__container_type_confirm"
      cancelBtnTitle="Отмена"
      acceptBtnTitle="Да"
    >
      <h5 class="modal__text">
        Вы уверены что хотите <span>удалить</span> проект
        {{ deletedProjectTitle }}?
      </h5>
    </Modal>
    <PreloadModal :isOpen="isProjectsLoading" />
    <div class="list projects" v-if="allProjects.length">
      <SearchPanel
        v-bind:items="sortProjectsSelect"
        :defaultValue="projectsSort.value"
        :activeOption="projectsSort.field"
        selectID="sortProjectsSelect"
        v-on:click-select="updateSortValue"
        v-bind:sortBtn="sortBtn"
        v-bind:addBtn="addProjectBtn"
        v-bind:filterBtn="filterBtn"
        v-on:click-link="openCreateModal"
        v-bind:isAscSort="isAscSort"
        v-on:toggle-sort="toggleSort"
      />
      <ProjectItem
        v-for="project in allProjects"
        v-bind:key="project.id"
        v-bind:project="project"
        v-on:open-dropdown="openDropdown"
        v-on:click-outside="clickOutsideDropdown"
        v-on:delete-project="confirmModalOpen"
      />
      <Pagination
        :isPagination="isPagination"
        v-bind:pages="visibleProjectsPages"
        :firstPage="firstPage"
        :isFirstPageVisible="isFirstPageVisible"
        :lastPage="lastPage"
        :isLastPageVisible="isLastPageVisible"
        :isBackBtnActive="projectsPage > 1"
        :isForwardBtnActive="projectsPage < totalProjectsPages.length"
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
import PreloadModal from '@/components/PreloadModal/PreloadModal.vue';
import getOverflowValue from '@/helpers/showTooltip';
import { tooltipClasses } from '@/helpers/constants';
import store from '@/store';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    ProjectItem,
    SearchPanel,
    Pagination,
    PreloadModal,
  },
  data() {
    return {
      isDeleteModalOpen: false,
      isCreateModalOpen: false,
      deletedProjectId: '',
      deletedProjectTitle: '',
      model: {
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
          name: 'По дате создания',
          value: 'dateCreated',
          isActive: false,
        },
        {
          name: 'По дате обновления',
          value: 'dateEdited',
          isActive: false,
        },
        {
          name: 'По названию',
          value: 'name',
          isActive: false,
        },
        {
          name: 'По автору',
          value: 'author',
          isActive: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'allProjects',
      'isProjectsLoading',
      'totalProjectsPages',
      'visibleProjectsPages',
      'projectsPage',
      'projectsSort',
      'projectsFilter',
      'usersMaxLimit',
      'allUsers',
    ]),
    isPagination() {
      return this.totalProjectsPages.length > 1 ? false : true;
    },
    isLeftExtend() {
      if (this.totalProjectsPages.length > 10 && this.projectsPage >= 5) {
        return true;
      } else {
        return false;
      }
    },
    isRightExtend() {
      if (
        this.totalProjectsPages.length > 10 &&
        this.projectsPage <= this.totalProjectsPages.length - 4
      ) {
        return true;
      } else {
        return false;
      }
    },
    firstPage() {
      if (this.totalProjectsPages.length > 10)
        return {
          num: '1',
          isSelected: false,
        };
      else {
        return {};
      }
    },
    isFirstPageVisible() {
      if (this.totalProjectsPages.length > 10 && this.projectsPage > 4) {
        return true;
      } else {
        return false;
      }
    },
    lastPage() {
      if (this.totalProjectsPages.length > 10)
        return {
          num: this.totalProjectsPages.length,
          isSelected: false,
        };
      else {
        return {};
      }
    },
    isLastPageVisible() {
      if (
        this.totalProjectsPages.length > 10 &&
        this.projectsPage < this.totalProjectsPages.length - 3
      ) {
        return true;
      } else {
        return false;
      }
    },
    queryPage() {
      return this.projectsPage;
    },
    isAscSort() {
      return this.projectsSort.type === 'asc' ? true : false;
    },
  },
  methods: {
    ...mapMutations(['SET_UPD_PR_PAGES', 'SET_PR_SORT']),
    ...mapActions(['fetchProjects', 'fetchUsers', 'removeProject']),
    closeDeleteModal() {
      this.isDeleteModalOpen = false;
    },
    confirmModalOpen(project) {
      this.deletedProjectId = project.id;
      this.deletedProjectTitle = project.name;
      this.isDeleteModalOpen = true;
      this.openDropdown(project.id);
    },
    deleteProject() {
      this.removeProject({
        page: this.projectsPage,
        limit: this.usersMaxLimit,
        sort: {
          field: this.projectsSort.field,
          type: this.projectsSort.type,
        },
        filter: null,
        id: this.deletedProjectId,
      });
      this.isDeleteModalOpen = false;
    },
    goPage(page) {
      this.SET_UPD_PR_PAGES(page.num);
      this.fetchProjects({
        page: page.num,
        limit: this.usersMaxLimit,
        sort: this.projectsSort,
        filter: null,
      });
      this.$router.push({
        query: {
          page: page.num,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          filter: null,
        },
      });
    },
    goFirstPage(page) {
      this.SET_UPD_PR_PAGES(page.num);
      this.fetchProjects({
        page: page.num,
        limit: this.usersMaxLimit,
        sort: this.projectsSort,
        filter: null,
      });
      this.$router.push({
        query: {
          page: page.num,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          filter: null,
        },
      });
    },
    goLastPage(page) {
      this.SET_UPD_PR_PAGES(page.num);
      this.fetchProjects({
        page: page.num,
        limit: this.usersMaxLimit,
        sort: this.projectsSort,
        filter: null,
      });
      this.$router.push({
        query: {
          page: page.num,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          filter: null,
        },
      });
    },
    goPageOnEnter() {
      let pageValue = '';

      if (this.totalProjectsPages.length < this.model.pageValue) {
        pageValue = this.totalProjectsPages.length;
      } else {
        pageValue = this.model.pageValue;
      }

      if (this.projectsPage !== +pageValue) {
        this.SET_UPD_PR_PAGES(this.model.pageValue);
        this.fetchProjects({
          page: pageValue,
          limit: this.usersMaxLimit,
          sort: this.projectsSort,
          filter: null,
        });
        this.$router.push({
          query: {
            page: pageValue,
            field: this.projectsSort.field,
            type: this.projectsSort.type,
            filter: null,
          },
        });
      }

      this.model.pageValue = '';
    },
    goBack() {
      this.SET_UPD_PR_PAGES(this.projectsPage - 1);
      this.fetchProjects({
        page: this.projectsPage,
        limit: this.usersMaxLimit,
        sort: this.projectsSort,
        filter: null,
      });
      this.$router.push({
        query: {
          page: this.projectsPage,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          filter: null,
        },
      });
    },
    goForward() {
      this.SET_UPD_PR_PAGES(this.projectsPage + 1);
      this.fetchProjects({
        page: this.projectsPage,
        limit: this.usersMaxLimit,
        sort: this.projectsSort,
        filter: null,
      });
      this.$router.push({
        query: {
          page: this.projectsPage,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          filter: null,
        },
      });
    },
    toggleSort() {
      if (this.projectsSort.type === 'desc') {
        this.SET_PR_SORT({
          field: this.projectsSort.field,
          type: 'asc',
          value: this.projectsSort.value,
        });
      } else {
        this.SET_PR_SORT({
          field: this.projectsSort.field,
          type: 'desc',
          value: this.projectsSort.value,
        });
      }

      this.fetchProjects({
        page: this.projectsPage,
        limit: this.usersMaxLimit,
        sort: this.projectsSort,
        filter: null,
      });
      this.$router.push({
        query: {
          page: this.projectsPage,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          filter: null,
        },
      });
    },
    updateSortValue(value) {
      this.sortProjectsSelect.forEach((el) => {
        if (el.name === value) {
          el.isActive = true;
          this.SET_PR_SORT({
            field: el.value,
            type: this.projectsSort.type,
            value: el.name,
          });
        } else {
          el.isActive = false;
        }
      });

      this.fetchProjects({
        page: 1,
        limit: this.usersMaxLimit,
        sort: this.projectsSort,
        filter: null,
      });
      this.$router.push({
        query: {
          page: 1,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          filter: null,
        },
      });
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
  watch: {
    $route(to, from) {
      this.SET_UPD_PR_PAGES(this.$route.query.page);
      this.fetchProjects({
        page: this.$route.query.page,
        limit: this.usersMaxLimit,
        sort: {
          field: this.projectsSort.field,
          type: this.projectsSort.type,
        },
        filter: null,
      });
    },
  },
  // ---------------------------------------------
  beforeMount() {
    this.fetchUsers({
      page: 1,
      sort: 'asc',
      filter: null,
    });
  },
  mounted() {
    if (this.$route.query.page) {
      const sortValue = this.sortProjectsSelect.find(
        (el) => el.value === this.$route.query.field
      );

      this.SET_PR_SORT({
        field: this.$route.query.field,
        type: this.$route.query.type,
        value: sortValue.name,
      });

      this.fetchProjects({
        page: this.$route.query.page,
        limit: this.usersMaxLimit,
        sort: { field: this.$route.query.field, type: this.$route.query.type },
        filter: null,
      });
    } else {
      this.fetchProjects({
        page: this.projectsPage,
        limit: this.usersMaxLimit,
        sort: {
          field: this.projectsSort.field,
          type: this.projectsSort.type,
        },
        filter: null,
      });
    }
  },
  updated() {
    getOverflowValue(tooltipClasses);
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
