<template>
  <div class="action-page">
    <h1 class="action-page__title">Создание задачи</h1>
    <form class="action-page__form">
      <div class="action-page__container">
        <div class="action-page__line">
          <div class="action-page__label">
            Название
            <svg-icon
              v-bind:class="['action-page__icon']"
              name="require"
            ></svg-icon>
          </div>

          <Input
            placeholder="Введите текст..."
            type="text"
            :defaultInput="true"
            v-bind:class="['action-page__input']"
            :maxlength="256"
            :minlength="3"
            v-on:onInput="updateTitle"
          />
        </div>
        <div class="action-page__line">
          <div class="action-page__label">Описание</div>
          <textarea
            class="action-page__textarea"
            v-model="model.descriptionValue"
          ></textarea>
        </div>
        <div class="action-page__line">
          <div class="action-page__label">
            Проект<svg-icon
              v-bind:class="['action-page__icon']"
              name="require"
            ></svg-icon>
          </div>

          <Select
            v-bind:items="selectProjects"
            defaultValue="Выберете значение..."
            v-bind:class="['action-page__select']"
            selectID="projectSelect"
          />
        </div>
        <div class="action-page__line">
          <div class="action-page__label">Исполнитель</div>
          <Select
            v-bind:items="selectExecutors"
            defaultValue="Не назначен"
            v-bind:class="['action-page__select']"
            selectID="executorSelect"
          />
        </div>
      </div>

      <div class="action-page__buttons">
        <Button
          v-bind:button="cancelBtn"
          v-bind:class="['button', 'secondary-button', 'action-page__button']"
        />
        <Button
          v-bind:button="createBtn"
          v-bind:class="['button', 'primary-button', 'action-page__button']"
          v-on:click-btn="getFormData"
        />
      </div>
    </form>
  </div>
</template>

<script>
import customSelect from '@/helpers/customSelect';
export default {
  components: {},
  data() {
    return {
      model: {
        titleValue: '',
        descriptionValue: '',
      },
      createBtn: {
        id: 'create-project',
        title: 'Создать задачу',
      },
      cancelBtn: {
        id: 'cancel-project',
        title: 'Отмена',
      },
      selectProjects: [
        {
          name: 'Проект №1',
          value: 'proj1',
        },
        {
          name: 'Проект №2',
          value: 'proj2',
        },
        {
          name: 'Проект №3',
          value: 'proj3',
        },
        {
          name: 'Проект №4',
          value: 'proj4',
        },
        {
          name: 'Проект №5',
          value: 'proj5',
        },
      ],
      selectExecutors: [
        {
          name: 'Котов Семен Васильевич',
          value: 'kotov',
        },
        {
          name: 'Акунин Иван Иванович',
          value: 'akunin',
        },
        {
          name: 'Львов Петр Ибрагимович',
          value: 'lvov',
        },
        {
          name: 'Константинов Константин Иванович',
          value: 'konst',
        },
        {
          name: 'Иванов Петр Васильевич',
          value: 'ivanov',
        },
      ],
    };
  },
  methods: {
    updateTitle(value) {
      this.model.titleValue = value;
    },
    getFormData() {
      const projectValue = document
        .getElementById('projectSelect')
        .firstElementChild.textContent.trim();
      const executorValue = document
        .getElementById('executorSelect')
        .firstElementChild.textContent.trim();

      console.log({
        title: this.model.titleValue,
        description: this.model.descriptionValue,
        project: `${projectValue}`,
        executor: `${executorValue}`,
      });
    },
  },
  mounted() {
    const select = document.querySelectorAll('.select');
    select.forEach((el) => {
      customSelect(el);
    });
  },
};
</script>

<style lang="scss"></style>
