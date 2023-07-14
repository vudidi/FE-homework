<template>
  <div class="wrapper">
    <Modal
      v-on:click-cancel-btn="closeDeleteModal"
      v-on:click-accept-btn="deleteTask"
      v-bind:isOpen="isDeleteModalOpen"
      modalTitle="Удаление"
      type="modal__container_type_confirm"
      cancelBtnTitle="Отмена"
      acceptBtnTitle="Да"
    >
      <h5 class="modal__text">
        Вы уверены что хотите <span>удалить</span> задачу
        {{ deletedTaskTitle }}?
      </h5>
    </Modal>
    <PreloadModal :isOpen="isTasksLoading" />
    <div class="list tasks" v-if="allTasks.length">
      <SearchPanel
        v-bind:items="sortTasksSelect"
        selectID="sortTasksSelect"
        :defaultValue="tasksSort.value"
        :activeOption="tasksSort.field"
        v-on:click-select="updateSortValue"
        v-bind:sortBtn="sortBtn"
        v-bind:addBtn="addTaskBtn"
        v-bind:filterBtn="filterBtn"
        v-bind:isAscSort="isAscSort"
        v-on:toggle-sort="toggleSort"
      />

      <TaskItem
        v-for="task in allTasks"
        v-bind:key="task.id"
        v-bind:task="task"
        v-on:open-dropdown="openDropdown"
        v-on:click-outside="clickOutsideDropdown"
        v-on:delete-task="confirmModalOpen"
      />

      <Pagination
        :isPagination="isPagination"
        v-bind:pages="visibleTasksPages"
        :firstPage="firstPage"
        :isFirstPageVisible="isFirstPageVisible"
        :lastPage="lastPage"
        :isLastPageVisible="isLastPageVisible"
        :isBackBtnActive="tasksPage > 1"
        :isForwardBtnActive="tasksPage < totalTasksPages.length"
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
    <noContent v-else to="tasks/create" text="Не создана ни одна задача" />
  </div>
</template>

<script>
import TaskItem from '@/components/TaskItem/TaskItem.vue';
import PreloadModal from '@/components/PreloadModal/PreloadModal.vue';
import getOverflowValue from '@/helpers/showTooltip';
import { tooltipClasses } from '@/helpers/constants';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    TaskItem,
    PreloadModal,
  },
  data() {
    return {
      isDeleteModalOpen: false,
      deletedTaskId: '',
      deletedTaskTitle: '',
      model: {
        pageValue: '',
      },
      addTaskBtn: {
        id: 'task-add-btn',
        title: 'Добавить',
        to: 'tasks/create',
      },
      sortBtn: {
        id: 'task-sort-btn',
      },
      filterBtn: {
        id: 'filter-sort-btn',
        isVisible: true,
      },
      sortTasksSelect: [
        {
          name: 'По названию',
          value: 'name',
          isActive: true,
        },
        {
          name: 'По автору',
          value: 'author',
          isActive: false,
        },
        {
          name: 'По статусу',
          value: 'status',
          isActive: false,
        },
        {
          name: 'По исполнителю',
          value: 'executor',
          isActive: false,
        },
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
      ],
    };
  },
  computed: {
    ...mapGetters([
      'allTasks',
      'isTasksLoading',
      'totalTasksPages',
      'visibleTasksPages',
      'tasksPage',
      'tasksSort',
      'tasksFilter',
      'usersMaxLimit',
      'allUsers',
      'currentUser',
    ]),
    isPagination() {
      return this.totalTasksPages.length > 1 ? false : true;
    },
    isLeftExtend() {
      if (this.totalTasksPages.length > 10 && this.tasksPage >= 5) {
        return true;
      } else {
        return false;
      }
    },
    isRightExtend() {
      if (
        this.totalTasksPages.length > 10 &&
        this.tasksPage <= this.totalTasksPages.length - 4
      ) {
        return true;
      } else {
        return false;
      }
    },
    firstPage() {
      if (this.totalTasksPages.length > 10)
        return {
          num: '1',
          isSelected: false,
        };
      else {
        return {};
      }
    },
    isFirstPageVisible() {
      if (this.totalTasksPages.length > 10 && this.tasksPage > 4) {
        return true;
      } else {
        return false;
      }
    },
    lastPage() {
      if (this.totalTasksPages.length > 10)
        return {
          num: this.totalTasksPages.length,
          isSelected: false,
        };
      else {
        return {};
      }
    },
    isLastPageVisible() {
      if (
        this.totalTasksPages.length > 10 &&
        this.tasksPage < this.totalTasksPages.length - 3
      ) {
        return true;
      } else {
        return false;
      }
    },
    queryPage() {
      return this.tasksPage;
    },
    isAscSort() {
      return this.tasksSort.type === 'asc' ? true : false;
    },
  },
  methods: {
    ...mapMutations(['SET_UPD_TS_PAGES', 'SET_TS_SORT', 'SET_TS_FILTER']),
    ...mapActions(['fetchTasks', 'fetchUsers', 'removeTask']),
    closeDeleteModal() {
      this.isDeleteModalOpen = false;
    },
    confirmModalOpen(task) {
      this.deletedTaskId = task.id;
      this.deletedTaskTitle = task.name;
      this.isDeleteModalOpen = true;
      this.openDropdown(task.id);
    },
    deleteTask() {
      this.removeTask({
        page: this.tasksPage,
        limit: this.usersMaxLimit,
        sort: {
          field: this.tasksSort.field,
          type: this.tasksSort.type,
        },
        filter: this.tasksFilter,
        id: this.deletedTaskId,
      });
      this.isDeleteModalOpen = false;
    },
    goPage(page) {
      this.SET_UPD_TS_PAGES(page.num);
      this.fetchTasks({
        page: page.num,
        limit: this.usersMaxLimit,
        sort: this.tasksSort,
        filter: this.tasksFilter,
      });
      this.$router.push({
        query: {
          page: page.num,
          field: this.tasksSort.field,
          type: this.tasksSort.type,
          author: this.tasksFilter.author,
          projectId: this.tasksFilter.projectId,
        },
      });
    },
    goFirstPage(page) {
      this.SET_UPD_TS_PAGES(page.num);
      this.fetchTasks({
        page: page.num,
        limit: this.usersMaxLimit,
        sort: this.tasksSort,
        filter: this.tasksFilter,
      });
      this.$router.push({
        query: {
          page: page.num,
          field: this.tasksSort.field,
          type: this.tasksSort.type,
          author: this.tasksFilter.author,
          projectId: this.tasksFilter.projectId,
        },
      });
    },
    goLastPage(page) {
      this.SET_UPD_TS_PAGES(page.num);
      this.fetchTasks({
        page: page.num,
        limit: this.usersMaxLimit,
        sort: this.tasksSort,
        filter: this.tasksFilter,
      });
      this.$router.push({
        query: {
          page: page.num,
          field: this.tasksSort.field,
          type: this.tasksSort.type,
          author: this.tasksFilter.author,
          projectId: this.tasksFilter.projectId,
        },
      });
    },
    goPageOnEnter() {
      let pageValue = '';

      if (this.totalTasksPages.length < this.model.pageValue) {
        pageValue = this.totalTasksPages.length;
      } else {
        pageValue = this.model.pageValue;
      }

      if (this.tasksPage !== +pageValue) {
        this.SET_UPD_TS_PAGES(this.model.pageValue);
        this.fetchTasks({
          page: pageValue,
          limit: this.usersMaxLimit,
          sort: this.tasksSort,
          filter: this.tasksFilter,
        });
        this.$router.push({
          query: {
            page: pageValue,
            field: this.tasksSort.field,
            type: this.tasksSort.type,
            author: this.tasksFilter.author,
            projectId: this.tasksFilter.projectId,
          },
        });
      }

      this.model.pageValue = '';
    },
    goBack() {
      this.SET_UPD_TS_PAGES(this.tasksPage - 1);
      this.fetchTasks({
        page: this.tasksPage,
        limit: this.usersMaxLimit,
        sort: this.tasksSort,
        filter: this.tasksFilter,
      });
      this.$router.push({
        query: {
          page: this.tasksPage,
          field: this.tasksSort.field,
          type: this.tasksSort.type,
          author: this.tasksFilter.author,
          projectId: this.tasksFilter.projectId,
        },
      });
    },
    goForward() {
      this.SET_UPD_TS_PAGES(this.tasksPage + 1);
      this.fetchTasks({
        page: this.tasksPage,
        limit: this.usersMaxLimit,
        sort: this.tasksSort,
        filter: this.tasksFilter,
      });
      this.$router.push({
        query: {
          page: this.tasksPage,
          field: this.tasksSort.field,
          type: this.tasksSort.type,
          author: this.tasksFilter.author,
          projectId: this.tasksFilter.projectId,
        },
      });
    },

    toggleSort() {
      if (this.tasksSort.type === 'desc') {
        this.SET_TS_SORT({
          field: this.tasksSort.field,
          type: 'asc',
          value: this.tasksSort.value,
        });
      } else {
        this.SET_TS_SORT({
          field: this.tasksSort.field,
          type: 'desc',
          value: this.tasksSort.value,
        });
      }

      this.fetchTasks({
        page: this.tasksPage,
        limit: this.usersMaxLimit,
        sort: this.tasksSort,
        filter: this.tasksFilter,
      });
      this.$router.push({
        query: {
          page: this.tasksPage,
          field: this.tasksSort.field,
          type: this.tasksSort.type,
          author: this.tasksFilter.author,
          projectId: this.tasksFilter.projectId,
        },
      });
    },

    updateSortValue(value) {
      this.sortTasksSelect.forEach((el) => {
        if (el.name === value) {
          el.isActive = true;
          this.SET_TS_SORT({
            field: el.value,
            type: this.tasksSort.type,
            value: el.name,
          });
        } else {
          el.isActive = false;
        }
      });

      this.fetchTasks({
        page: 1,
        limit: this.usersMaxLimit,
        sort: this.tasksSort,
        filter: this.tasksFilter,
      });
      this.$router.push({
        query: {
          page: 1,
          field: this.tasksSort.field,
          type: this.tasksSort.type,
          author: this.tasksFilter.author,
          projectId: this.tasksFilter.projectId,
        },
      });
    },
    openDropdown(id) {
      this.allTasks.forEach((task) => {
        if (task.id === id) {
          task.isDropdownOpen = !task.isDropdownOpen;
        } else {
          task.isDropdownOpen = false;
        }
      });
    },
    clickOutsideDropdown(id) {
      this.allTasks.forEach((task) => {
        if (task.id === id) {
          task.isDropdownOpen = false;
        }
      });
    },
  },
  //-------------------------
  beforeMount() {
    this.fetchUsers({
      page: 1,
      sort: 'asc',
      filter: null,
    });
  },

  mounted() {
    if (this.$route.query.page) {
      const sortValue = this.sortTasksSelect.find(
        (el) => el.value === this.$route.query.field
      );

      this.SET_TS_SORT({
        field: this.$route.query.field,
        type: this.$route.query.type,
        value: sortValue.name,
      });

      this.SET_TS_FILTER({
        author: this.$route.query.author,
        projectId: this.$route.query.projectId,
      });

      this.fetchTasks({
        page: this.$route.query.page,
        limit: this.usersMaxLimit,
        sort: { field: this.$route.query.field, type: this.$route.query.type },
        filter: {
          author: this.$route.query.author,
          projectId: this.$route.query.projectId,
        },
      });
    } else {
      this.fetchTasks({
        page: this.tasksPage,
        limit: this.usersMaxLimit,
        sort: {
          field: this.tasksSort.field,
          type: this.tasksSort.type,
        },
        filter: this.tasksFilter,
      });
    }
  },
  updated() {
    getOverflowValue(tooltipClasses);
  },
};
</script>

<style lang="scss"></style>
