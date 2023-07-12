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
        selectID="sortProjectsSelect"
        v-on:click-select="updateSortValue"
        v-bind:sortBtn="sortBtn"
        v-bind:addBtn="addProjectBtn"
        v-bind:filterBtn="filterBtn"
        :isAscSort="isAscSort"
        v-on:click-link="openCreateModal"
        v-on:toggle-sort="toggleSort"
      />
      <p>page: {{ projectsPage }}</p>
      <p>field: {{ projectsSort.field }}</p>
      <p>type: {{ projectsSort.type }}</p>
      <ProjectItem
        v-for="project in allProjects"
        v-bind:key="project.id"
        v-bind:project="project"
        v-on:open-dropdown="openDropdown"
        v-on:click-outside="clickOutsideDropdown"
        v-on:delete-project="confirmModalOpen"
      />
      <Pagination
        v-bind:pages="visiblePages"
        :firstPage="firstPage"
        :isFirstPageVisible="isFirstPageVisible"
        :lastPage="lastPage"
        :isLastPageVisible="isLastPageVisible"
        :isBackBtnActive="projectsPage > 1"
        :isForwardBtnActive="projectsPage < totalPages.length"
        :isLeftExtend="projectsPage >= 5"
        :isRightExtend="projectsPage <= totalPages.length - 4"
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
          isActive: true,
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
      'totalPages',
      'visiblePages',
      'projectsPage',
      'projectsSort',
      'projectsFilter',
    ]),
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
      if (this.projectsPage >= 5) {
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
      if (this.projectsPage < this.totalPages.length - 3) {
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
    ...mapMutations(['updateTotalPages', 'updateProjectsSort']),
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
      this.updateTotalPages(page.num);
      this.fetchProjects({
        page: page.num,
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
      this.updateTotalPages(page.num);
      this.fetchProjects({
        page: page.num,
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
      this.updateTotalPages(page.num);
      this.fetchProjects({
        page: page.num,
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
      this.updateTotalPages(this.model.pageValue);
      this.fetchProjects({
        page: this.model.pageValue,
        sort: this.projectsSort,
        filter: null,
      });
      this.$router.push({
        query: {
          page: this.model.pageValue,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          filter: null,
        },
      });
      this.model.pageValue = '';
    },
    goBack() {
      this.updateTotalPages(this.projectsPage - 1);
      this.fetchProjects({
        page: this.projectsPage,
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
      this.updateTotalPages(this.projectsPage + 1);
      this.fetchProjects({
        page: this.projectsPage,
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
        this.updateProjectsSort({
          field: this.projectsSort.field,
          type: 'asc',
          value: this.projectsSort.value,
        });
      } else {
        this.updateProjectsSort({
          field: this.projectsSort.field,
          type: 'desc',
          value: this.projectsSort.value,
        });
      }

      this.fetchProjects({
        page: this.projectsPage,
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
          this.updateProjectsSort({
            field: el.value,
            type: this.projectsSort.type,
            value: el.name,
          });
        } else {
          el.isActive = false;
        }
      });

      this.fetchProjects({ page: 1, sort: this.projectsSort, filter: null });
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
      this.updateTotalPages(this.$route.query.page);
      this.fetchProjects({
        page: this.$route.query.page,
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
    this.fetchUsers();
  },
  mounted() {
    const sortValue = this.sortProjectsSelect.find(
      (el) => el.value === this.$route.query.field
    );

    if (this.$route.query) {
      this.updateProjectsSort({
        field: this.$route.query.field,
        type: this.$route.query.type,
        value: sortValue.name,
      });

      this.fetchProjects({
        page: this.$route.query.page,
        sort: { field: this.$route.query.field, type: this.$route.query.type },
        filter: null,
      });
    } else {
      this.fetchProjects({
        page: this.projectsPage,
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
