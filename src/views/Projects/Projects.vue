<template>
  <div class="wrapper">
    <div :class="['modal', { modal_opened: isCreateModalOpen }]">
      <div :class="['modal__container', 'modal__container_type_create']">
        <h2 class="modal__title">Создание проекта</h2>
        <form
          autocomplete="off"
          v-on:submit.prevent="createProject"
          ref="addProjectForm"
          id="add-project-form"
          class="form list-form"
          novalidate
        >
          <span
            :class="[
              'list-formError',
              { 'list-formError_visible': isFormError },
            ]"
            >Заполните форму корректными значениями</span
          >
          <div class="modal__wrapper">
            <div class="modal__field">
              <div class="modal__field-label">
                Код
                <svg-icon
                  v-bind:class="['modal__field-icon']"
                  name="require"
                ></svg-icon>
              </div>

              <Input
                id="prCode"
                inputErrorClass="prCode-error"
                placeholder="Введите текст..."
                type="text"
                :defaultInput="true"
                v-bind:class="['modal__field-input']"
                :maxlength="64"
                :minlength="3"
                required
                v-model="model.projectCode"
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
                id="prName"
                inputErrorClass="prName-error"
                placeholder="Введите текст..."
                type="text"
                :defaultInput="true"
                v-bind:class="['modal__field-input']"
                :maxlength="256"
                :minlength="3"
                required
                v-model="model.projectName"
              />
            </div>
          </div>
          <div class="modal__buttons">
            <Button
              v-on:click-btn="closeCreateModal"
              v-bind:button="cancelCreateProjectBtn"
              v-bind:class="['button', 'secondary-button', 'modal__button']"
            />
            <SubmitButton
              type="submit"
              :id="acceptCreateProjectBtn.id"
              :title="acceptCreateProjectBtn.title"
              v-bind:class="[
                'button',
                'form__button',
                'primary-button',
                'modal__button',
              ]"
            />
          </div>
        </form>
      </div>
    </div>
    <div :class="['modal', { modal_opened: isEditModalOpen }]">
      <div :class="['modal__container', 'modal__container_type_create']">
        <h2 class="modal__title">Редактирование проекта</h2>
        <form
          autocomplete="off"
          v-on:submit.prevent="editProject"
          ref="editProjectForm"
          id="edit-project-form"
          class="form list-form"
          novalidate
        >
          <span
            :class="[
              'list-formError',
              { 'list-formError_visible': isFormError },
            ]"
            >Заполните форму корректными значениями</span
          >
          <div class="modal__wrapper">
            <div class="modal__field">
              <div class="modal__field-label">
                Код
                <svg-icon
                  v-bind:class="['modal__field-icon']"
                  name="require"
                ></svg-icon>
              </div>

              <Input
                id="curPrCode"
                inputErrorClass="curPrCode-error"
                placeholder="Введите текст..."
                type="text"
                :defaultInput="true"
                v-bind:class="['modal__field-input']"
                :maxlength="64"
                :minlength="3"
                required
                v-model="model.currentProjectCode"
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
                id="curPrName"
                inputErrorClass="curPrName-error"
                placeholder="Введите текст..."
                type="text"
                :defaultInput="true"
                v-bind:class="['modal__field-input']"
                :maxlength="256"
                :minlength="3"
                required
                v-model="model.currentProjectName"
              />
            </div>
          </div>
          <div class="modal__buttons">
            <Button
              v-on:click-btn="closeEditModal"
              v-bind:button="cancelEditProjectBtn"
              v-bind:class="['button', 'secondary-button', 'modal__button']"
            />
            <SubmitButton
              type="submit"
              :id="acceptEditProjectBtn.id"
              :title="acceptEditProjectBtn.title"
              v-bind:class="[
                'button',
                'form__button',
                'primary-button',
                'modal__button',
              ]"
            />
          </div>
        </form>
      </div>
    </div>
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
        errorText="Ничего не найдено"
        :isErrorVisible="!projectsSearchResult"
        v-on:search-on-enter="searchProject"
        v-model="model.searchValue"
      />
      <ProjectItem
        v-for="project in allProjects"
        v-bind:key="project.id"
        v-bind:project="project"
        v-on:open-dropdown="openDropdown"
        v-on:click-outside="clickOutsideDropdown"
        v-on:edit-project="openEditModal"
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
import enableValidation from '@/helpers/validation';
import { validationSet } from '@/helpers/constants';
import resetForm from '@/helpers/resetForm';
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
      isEditModalOpen: false,
      isFormError: false,
      deletedProjectId: '',
      deletedProjectTitle: '',
      model: {
        pageValue: '',
        searchValue: '',
        projectCode: '',
        projectName: '',
        currentProjectId: '',
        currentProjectCode: '',
        currentProjectName: '',
      },
      cancelCreateProjectBtn: {
        id: 'cancel-create-project',
        title: 'Отмена',
      },
      acceptCreateProjectBtn: {
        id: 'accept-create-project',
        title: 'Создать проект',
      },
      cancelEditProjectBtn: {
        id: 'cancel-edit-project',
        title: 'Отмена',
      },
      acceptEditProjectBtn: {
        id: 'accept-edit-project',
        title: 'Редактировать проект',
      },
      addProjectBtn: {
        id: 'project-add-btn',
        title: 'Добавить',
        to: '',
      },
      editProjectBtn: {
        id: 'project-edit-btn',
        title: 'Редактировать',
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
      'projectsSearchResult',
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
    ...mapMutations([
      'SET_UPD_PR_PAGES',
      'SET_PR_SORT',
      'SET_PR_FILTER',
      'SET_PR_SEARCH_RESULT',
    ]),
    ...mapActions([
      'fetchProjects',
      'fetchUsers',
      'appendProject',
      'updateProject',
      'removeProject',
      'fetchProjectsSearch',
    ]),
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
        filter: this.projectsFilter,
        id: this.deletedProjectId,
      });
      this.isDeleteModalOpen = false;
    },
    searchProject() {
      if (this.model.searchValue !== this.projectsFilter?.name) {
        this.SET_PR_FILTER({ name: this.model.searchValue.trim() });
        this.fetchProjectsSearch({
          page: 1,
          sort: this.projectsSort,
          filter: this.projectsFilter,
        });
        this.$router.push({
          query: {
            page: this.projectsPage,
            ...this.projectsSort,
            ...this.projectsFilter,
          },
        });
      }
    },
    goPage(page) {
      this.SET_UPD_PR_PAGES(page.num);
      this.fetchProjects({
        page: page.num,
        sort: this.projectsSort,
        filter: this.projectsFilter,
      });
      this.$router.push({
        query: {
          page: page.num,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          ...this.projectsFilter,
        },
      });
    },
    goFirstPage(page) {
      this.SET_UPD_PR_PAGES(page.num);
      this.fetchProjects({
        page: page.num,
        sort: this.projectsSort,
        filter: this.projectsFilter,
      });
      this.$router.push({
        query: {
          page: page.num,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          ...this.projectsFilter,
        },
      });
    },
    goLastPage(page) {
      this.SET_UPD_PR_PAGES(page.num);
      this.fetchProjects({
        page: page.num,
        sort: this.projectsSort,
        filter: this.projectsFilter,
      });
      this.$router.push({
        query: {
          page: page.num,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          ...this.projectsFilter,
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
          sort: this.projectsSort,
          filter: this.projectsFilter,
        });
        this.$router.push({
          query: {
            page: pageValue,
            field: this.projectsSort.field,
            type: this.projectsSort.type,
            ...this.projectsFilter,
          },
        });
      }

      this.model.pageValue = '';
    },
    goBack() {
      this.SET_UPD_PR_PAGES(this.projectsPage - 1);
      this.fetchProjects({
        page: this.projectsPage,
        sort: this.projectsSort,
        filter: this.projectsFilter,
      });
      this.$router.push({
        query: {
          page: this.projectsPage,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          ...this.projectsFilter,
        },
      });
    },
    goForward() {
      this.SET_UPD_PR_PAGES(this.projectsPage + 1);
      this.fetchProjects({
        page: this.projectsPage,
        sort: this.projectsSort,
        filter: this.projectsFilter,
      });
      this.$router.push({
        query: {
          page: this.projectsPage,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          ...this.projectsFilter,
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
        sort: this.projectsSort,
        filter: this.projectsFilter,
      });
      this.$router.push({
        query: {
          page: this.projectsPage,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          ...this.projectsFilter,
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
        sort: this.projectsSort,
        filter: this.projectsFilter,
      });
      this.$router.push({
        query: {
          page: 1,
          field: this.projectsSort.field,
          type: this.projectsSort.type,
          ...this.projectsFilter,
        },
      });
    },
    openCreateModal() {
      resetForm();
      this.resetFormInputs();
      this.isCreateModalOpen = true;
    },
    openEditModal(project) {
      resetForm();
      this.isEditModalOpen = true;
      this.model.currentProjectId = project.id;
      this.model.currentProjectCode = project.code;
      this.model.currentProjectName = project.name;
    },
    resetFormInputs() {
      this.model.projectCode = '';
      this.model.projectName = '';
    },
    closeCreateModal() {
      this.isCreateModalOpen = false;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    },
    createProject() {
      const formValidity = this.$refs.addProjectForm.checkValidity();
      if (
        this.model.projectCode.trim().length < 3 ||
        this.model.projectName.trim().length < 3
      ) {
        this.isFormError = true;
      } else if (formValidity) {
        this.appendProject({
          code: this.model.projectCode.trim(),
          name: this.model.projectName.trim(),
          page: 1,
          sort: {
            field: 'dateCreated',
            type: 'desc',
            value: 'По дате создания',
          },
          filter: null,
        });

        this.$router.push({
          query: {
            page: 1,
            field: 'dateCreated',
            type: 'desc',
          },
        });

        this.closeCreateModal();

        this.SET_PR_SORT({
          field: 'dateCreated',
          type: 'desc',
          value: 'По дате создания',
        });
        this.SET_PR_FILTER(null);
        this.isFormError = false;
        this.model.searchValue = '';
      } else {
        this.isFormError = false;
        enableValidation(validationSet);
      }
    },
    editProject() {
      const formValidity = this.$refs.editProjectForm.checkValidity();
      if (
        this.model.currentProjectCode.trim().length < 3 ||
        this.model.currentProjectName.trim().length < 3
      ) {
        this.isFormError = true;
      } else if (formValidity) {
        this.updateProject({
          id: this.model.currentProjectId,
          code: this.model.currentProjectCode.trim(),
          name: this.model.currentProjectName.trim(),
          page: 1,
          sort: {
            field: 'dateEdited',
            type: 'desc',
          },
          filter: null,
        });

        this.$router.push({
          query: {
            page: 1,
            field: 'dateEdited',
            type: 'desc',
          },
        });

        this.closeEditModal();

        this.SET_PR_SORT({
          field: 'dateEdited',
          type: 'desc',
          value: 'По дате обновления',
        });
        this.SET_PR_FILTER(null);
        this.isFormError = false;
        this.model.searchValue = '';
      } else {
        this.isFormError = false;
        enableValidation(validationSet);
      }
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
  beforeRouteEnter(to, from, next) {
    if (from.name === 'login') {
      store.dispatch('fetchCurrentUser');
      next();
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.projectsSearchResult) {
      this.SET_PR_FILTER(null);
      this.SET_PR_SEARCH_RESULT(true);
    }
    next();
  },
  mounted() {
    enableValidation(validationSet);

    if (this.projectsFilter !== null) {
      this.model.searchValue = this.projectsFilter.name;
    }

    if (!this.projectsSearchResult) {
      this.SET_PR_SEARCH_RESULT(true);
    }

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
        sort: { field: this.$route.query.field, type: this.$route.query.type },
        filter: this.projectsFilter,
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
};
</script>

<style lang="scss"></style>
