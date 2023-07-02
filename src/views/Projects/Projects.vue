<template>
  <div class="wrapper">
    <Modal
      v-on:click-cancel-btn="closeCreateModal"
      v-bind:isOpen="isCreateModalOpen"
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
    <div class="projects" v-if="projects.length">
      <ProjectItem
        v-for="project in projects"
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
import getOverflowValue from '@/helpers/showTooltip';
import { tooltipClasses } from '@/helpers/constants';

export default {
  components: {
    ProjectItem,
  },
  data() {
    return {
      isCreateModalOpen: false,
      projects: [
        // {
        //   id: 'e90d4288c2098a0f027691d115b688cd',
        //   title:
        //     'Проект: Описание задачи далеко-далеко за словесными горами в стране  гласных и согласных живут рыбные тексты. Вдали от всех живут  они в буквенных домах на берегу Семантика большого языковогоокеана. Маленький ручеек Даль журчит по всей стране иобеспечивает ее всеми необходимыми правилами',
        //   code: '22398742#12345',
        //   create: 'Климов-Петров И.И. создал(а) 17 сен 2022 в 13:55',
        //   update: 'Иванов В.В. изменил(а) 1 минуту назад',
        //   isDropdownOpen: false,
        // },
        // {
        //   id: '088ab8d8f1ce519871dae89a31ef9ee5',
        //   title: 'Название проекта',
        //   code: '22398742#1234545637458273658972635872635876245786',
        //   create: 'Петров И.И. создал(а) 17 сен 2022 в 13:55',
        //   update: 'Иванов В.В. изменил(а) 1 минуту назад',
        //   isDropdownOpen: false,
        // },
        // {
        //   id: '61f12dd4fe8b2b94dce10016cb66e79a',
        //   title: 'Название проекта',
        //   code: 'кодпроекта#3',
        //   create: 'Иванов И.И. создал(а) 1 час назад',
        //   update: 'Сазонова В.В. изменил(а) 1 минуту назад',
        //   isDropdownOpen: false,
        // },
        // {
        //   id: 'd226b104c34473cfbc272a7d91b5df6f',
        //   title: 'Название проекта',
        //   code: 'кодпроекта#3',
        //   create: 'Иванов И.И. создал(а) 1 час назад',
        //   update: 'Сазонова В.В. изменил(а) 1 минуту назад',
        //   isDropdownOpen: false,
        // },
        // {
        //   id: '24063f2a495c28888c5e0df7d123deed',
        //   title: 'Название проекта',
        //   code: 'кодпроекта#3',
        //   create: 'Иванов И.И. создал(а) 1 час назад',
        //   update: 'Сазонова В.В. изменил(а) 1 минуту назад',
        //   isDropdownOpen: false,
        // },
      ],
    };
  },
  methods: {
    openCreateModal() {
      this.isCreateModalOpen = true;
    },
    closeCreateModal() {
      this.isCreateModalOpen = false;
    },
    openDropdown(id) {
      this.projects.forEach((project) => {
        if (project.id === id) {
          project.isDropdownOpen = !project.isDropdownOpen;
        } else {
          project.isDropdownOpen = false;
        }
      });
    },
    clickOutsideDropdown(id) {
      this.projects.forEach((project) => {
        if (project.id === id) {
          project.isDropdownOpen = false;
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
