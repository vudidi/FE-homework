<template>
  <div class="wrapper">
    <div class="tasks" v-if="tasks.length">
      <TaskItem
        v-for="task in tasks"
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

export default {
  components: {
    TaskItem,
  },
  data() {
    return {
      tasks: [
        {
          id: '2c601a2757c0e1cca23f3057c0895479',
          title: 'Название задачи',
          code: '234#1',
          create: 'Петров И.И. создал(а) 17 сен 2022 в 13:55',
          update: 'Баранов В.В. изменил(а) 1 минуту назад',
          avatar: require('@/assets/images/avatar.png'),
          status: 'В работе',
          isDropdownOpen: false,
        },
        {
          id: '1da26764fab2fd93cafd2fa1fe21466c',
          title: 'Название задачи',
          code: '8742#2653',
          create: 'Иванов И.И. создал(а) 1 час назад',
          update: 'Баранов В.В. изменил(а) 1 минуту назад',
          avatar: require('@/assets/images/avatar.png'),
          status: 'Завершена',
          isDropdownOpen: false,
        },
        {
          id: '46fd49b97edb55718efcc126de04502a',
          title: 'Название задачи',
          code: 'кодпроекта#3',
          create: 'Иванов И.И. создал(а) 1 час назад',
          update: 'Баранов В.В. изменил(а) 1 минуту назад',
          avatar: require('@/assets/images/avatar.png'),
          status: 'Не активен',
          isDropdownOpen: false,
        },
        {
          id: '165cc06ef378007a42fefe70751e6c8c',
          title:
            'Задача: Описание задачи далеко-далеко за словесными горами в стране  гласных и согласных живут рыбные тексты. Вдали от всех живут  они в буквенных домах на берегу Семантика большого языковогоокеана. Маленький ручеек Даль журчит по всей стране иобеспечивает ее всеми необходимыми правилами',
          code: '22398742#2653137653251836235432452513163168242748724298742287987322398742#12345678987654321',
          create: 'Петров-Суздальский И.И. создал(а) 17 сен 2022 в 13:55',
          update: 'Иванов-Старообрядцев В.В. изменил(а) 1 минуту назад',
          avatar: require('@/assets/images/avatar.png'),
          status: 'Выполнена',
          isDropdownOpen: false,
        },
        {
          id: '056294048f0de24681ee3dbb2b0020dc',
          title: 'Название задачи',
          code: '22398742#26531376532518362354324',
          create: 'Петров И.И. создал(а) 17 сен 2022 в 13:55',
          update: 'Иванов-Старообрядцев В.В. изменил(а) 1 минуту назад',
          avatar: require('@/assets/images/avatar.png'),
          status: 'Удалена',
          isDropdownOpen: false,
        },
      ],
    };
  },
  methods: {
    openDropdown(id) {
      this.tasks.forEach((task) => {
        if (task.id === id) {
          task.isDropdownOpen = !task.isDropdownOpen;
        } else {
          task.isDropdownOpen = false;
        }
      });
    },
    clickOutsideDropdown(id) {
      this.tasks.forEach((task) => {
        if (task.id === id) {
          task.isDropdownOpen = false;
        }
      });
    },
  },
  mounted() {
    getOverflowValue(tooltipClasses);
  },
};
</script>

<style lang="scss"></style>
