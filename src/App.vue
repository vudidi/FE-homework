<template>
  <div id="app" class="page">
    <Navigation />
    <main class="content">
      <!-- <Input /> -->
      <!-- <Profile /> -->
      <Projects
        v-if="projects.length"
        v-bind:projects="projects"
        v-on:open-dropdown="openProjectDropdown"
      />
      <Tasks
        v-else-if="tasks.length"
        v-bind:tasks="tasks"
        v-on:open-dropdown="openTaskDropdown"
      />
      <noContent v-else />
    </main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue';
import Profile from '@/views/Profile/Profile.vue';
import Projects from '@/views/Projects/Projects.vue';
import Tasks from '@/views/Tasks/Tasks.vue';
import noContent from '@/components/noContent/noContent.vue';
import Input from '@/UI/Input/Input.vue';
import { getOverflowValue } from '@/helpers/showTooltip';

export default {
  name: 'App',
  components: {
    Navigation,
    Profile,
    Projects,
    Tasks,
    noContent,
    Input,
  },
  methods: {
    openProjectDropdown(id) {
      this.projects.forEach((project) => {
        if (project.id === id) {
          project.isDropdownOpen = !project.isDropdownOpen;
        } else {
          project.isDropdownOpen = false;
        }
      });
    },
    openTaskDropdown(id) {
      this.tasks.forEach((task) => {
        if (task.id === id) {
          task.isDropdownOpen = !task.isDropdownOpen;
        } else {
          task.isDropdownOpen = false;
        }
      });
    },
  },
  mounted() {
    const classes = ['list-title', 'list-code', 'list-create', 'list-update'];
    getOverflowValue(classes);
  },
  data() {
    return {
      projects: [
        {
          id: 'e90d4288c2098a0f027691d115b688cd',
          title:
            'Проект: Описание задачи далеко-далеко за словесными горами в стране  гласных и согласных живут рыбные тексты. Вдали от всех живут  они в буквенных домах на берегу Семантика большого языковогоокеана. Маленький ручеек Даль журчит по всей стране иобеспечивает ее всеми необходимыми правилами',
          code: '22398742#12345',
          create: 'Климов-Петров И.И. создал(а) 17 сен 2022 в 13:55',
          update: 'Иванов В.В. изменил(а) 1 минуту назад',
          isDropdownOpen: false,
        },
        {
          id: '088ab8d8f1ce519871dae89a31ef9ee5',
          title: 'Название проекта',
          code: '22398742#1234545637458273658972635872635876245786',
          create: 'Петров И.И. создал(а) 17 сен 2022 в 13:55',
          update: 'Иванов В.В. изменил(а) 1 минуту назад',
          isDropdownOpen: false,
        },
        {
          id: '61f12dd4fe8b2b94dce10016cb66e79a',
          title: 'Название проекта',
          code: 'кодпроекта#3',
          create: 'Иванов И.И. создал(а) 1 час назад',
          update: 'Сазонова В.В. изменил(а) 1 минуту назад',
          isDropdownOpen: false,
        },
        {
          id: 'd226b104c34473cfbc272a7d91b5df6f',
          title: 'Название проекта',
          code: 'кодпроекта#3',
          create: 'Иванов И.И. создал(а) 1 час назад',
          update: 'Сазонова В.В. изменил(а) 1 минуту назад',
          isDropdownOpen: false,
        },
        {
          id: '24063f2a495c28888c5e0df7d123deed',
          title: 'Название проекта',
          code: 'кодпроекта#3',
          create: 'Иванов И.И. создал(а) 1 час назад',
          update: 'Сазонова В.В. изменил(а) 1 минуту назад',
          isDropdownOpen: false,
        },
      ],
      tasks: [
        {
          id: '2c601a2757c0e1cca23f3057c0895479',
          title: 'Название задачи',
          code: '234#1',
          create: 'Петров И.И. создал(а) 17 сен 2022 в 13:55',
          update: 'Баранов В.В. изменил(а) 1 минуту назад',
          avatar: require('@/assets/images/avatar.png'),
          isDropdownOpen: false,
        },
        {
          id: '1da26764fab2fd93cafd2fa1fe21466c',
          title: 'Название задачи',
          code: '8742#2653',
          create: 'Иванов И.И. создал(а) 1 час назад',
          update: 'Баранов В.В. изменил(а) 1 минуту назад',
          avatar: require('@/assets/images/avatar.png'),
          isDropdownOpen: false,
        },
        {
          id: '46fd49b97edb55718efcc126de04502a',
          title: 'Название задачи',
          code: 'кодпроекта#3',
          create: 'Иванов И.И. создал(а) 1 час назад',
          update: 'Баранов В.В. изменил(а) 1 минуту назад',
          avatar: require('@/assets/images/avatar.png'),
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
          isDropdownOpen: false,
        },
        {
          id: '056294048f0de24681ee3dbb2b0020dc',
          title: 'Название задачи',
          code: '22398742#26531376532518362354324',
          create: 'Петров И.И. создал(а) 17 сен 2022 в 13:55',
          update: 'Иванов-Старообрядцев В.В. изменил(а) 1 минуту назад',
          avatar: require('@/assets/images/avatar.png'),
          isDropdownOpen: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
</style>
