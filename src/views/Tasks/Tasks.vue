<template>
  <div class="wrapper">
    <PreloadModal :isOpen="isTasksLoading" />
    <div class="list tasks" v-if="allTasks.length">
      <SearchPanel
        v-bind:items="sortTasksSelect"
        selectID="sortTasksSelect"
        :defaultValue="model.sortValue"
        v-on:click-select="updateSortValue"
        v-bind:sortBtn="sortBtn"
        v-bind:addBtn="addTaskBtn"
        v-bind:filterBtn="filterBtn"
      />

      <TaskItem
        v-for="task in allTasks"
        v-bind:key="task.id"
        v-bind:task="task"
        v-on:open-dropdown="openDropdown"
        v-on:click-outside="clickOutsideDropdown"
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
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    TaskItem,
    PreloadModal,
  },
  data() {
    return {
      model: {
        sortValue: 'Выберите опцию',
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
          value: 'title',
          isActive: false,
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
          value: 'create',
          isActive: false,
        },
        {
          name: 'По дате обновления',
          value: 'update',
          isActive: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['allTasks', 'isTasksLoading']),
  },
  methods: {
    ...mapActions(['fetchTasks', 'fetchUsers']),
    updateSortValue(value) {
      this.model.sortValue = value;

      this.sortTasksSelect.forEach((el) => {
        if (el.name === value) {
          el.isActive = true;
        } else {
          el.isActive = false;
        }
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
  beforeMount() {
    this.fetchUsers();
  },
  mounted() {
    if (this.$route.query) {
      const filter = this.$route.query;
      this.fetchTasks(filter);
    } else {
      this.fetchTasks(null);
    }
  },
  updated() {
    getOverflowValue(tooltipClasses);
  },
};
</script>

<style lang="scss"></style>
