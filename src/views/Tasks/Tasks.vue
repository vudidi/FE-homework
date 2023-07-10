<template>
  <div class="wrapper">
    <div class="list tasks" v-if="allTasks.length">
      <SearchPanel
        v-bind:items="sortTasksSelect"
        selectID="sortTasksSelect"
        v-on:onSelectClick="updateSortValue"
        v-on:onSelectEnter="updateSortValue"
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
import getOverflowValue from '@/helpers/showTooltip';
import { tooltipClasses } from '@/helpers/constants';
import renderSelect from '@/helpers/renderSelect';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    TaskItem,
  },
  data() {
    return {
      model: {
        sortValue: 'По названию',
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
        },
        {
          name: 'По автору',
          value: 'author',
        },
        {
          name: 'По статусу',
          value: 'status',
        },
        {
          name: 'По исполнителю',
          value: 'executor',
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
    ...mapGetters(['allTasks']),
  },
  methods: {
    ...mapActions(['fetchTasks', 'fetchUsers']),
    updateSortValue(value) {
      this.model.sortValue = value;
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
    renderSelect();
  },
};
</script>

<style lang="scss"></style>
