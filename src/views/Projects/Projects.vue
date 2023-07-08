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
import getOverflowValue from '@/helpers/showTooltip';
import { tooltipClasses } from '@/helpers/constants';
import customSelect from '@/helpers/customSelect';
import store from '@/store';
import { mapGetters, mapActions } from 'vuex';

const select = document.querySelectorAll('.select');

export default {
  components: {
    ProjectItem,
    SearchPanel,
  },
  data() {
    return {
      isCreateModalOpen: false,
      model: {
        sortValue: 'По названию',
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
    ...mapGetters(['allProjects']),
  },
  methods: {
    ...mapActions(['fetchProjects']),
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
  mounted() {
    this.fetchProjects();

    getOverflowValue(tooltipClasses);

    select.forEach((el) => {
      customSelect(el);
    });
  },
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
