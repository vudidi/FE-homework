<template>
  <div class="action-page">
    <h1 class="action-page__title">Создание задачи</h1>
    <form class="action-page__form">
      <fieldset class="action-page__fieldset">
        <div class="action-page__container">
          <div class="action-page__line">
            <label class="action-page__label">
              Название
              <svg-icon
                v-bind:class="['action-page__icon']"
                name="require"
              ></svg-icon>
            </label>

            <Input
              placeholder="Введите текст..."
              type="text"
              :defaultInput="true"
              v-bind:class="['action-page__input']"
              :maxlength="256"
              :minlength="3"
              v-model="model.titleValue"
            />
          </div>
          <div class="action-page__line">
            <label class="action-page__label">Описание</label>
            <textarea
              class="action-page__textarea"
              v-model="model.descriptionValue"
            ></textarea>
          </div>
          <div class="action-page__line">
            <label class="action-page__label">
              Проект<svg-icon
                v-bind:class="['action-page__icon']"
                name="require"
              ></svg-icon>
            </label>

            <Select
              v-bind:items="selectProjects"
              :defaultValue="model.projectValue"
              v-bind:class="['action-page__select']"
              selectID="projectSelect"
              v-on:click-select="updateProjectValue"
            />
          </div>

          <div class="action-page__line">
            <label class="action-page__label">Исполнитель</label>
            <Select
              v-bind:items="selectExecutors"
              :defaultValue="model.executorValue"
              v-bind:class="['action-page__select']"
              selectID="executorSelect"
              v-on:click-select="updateExecutortValue"
            />
          </div>
        </div>
      </fieldset>

      <div class="action-page__buttons">
        <Link
          v-bind:link="cancelBtn"
          v-bind:class="['button', 'secondary-button', 'action-page__button']"
          to="/tasks"
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
export default {
  components: {},
  data() {
    return {
      model: {
        titleValue: '',
        descriptionValue: '',
        projectValue: 'Выберите значение...',
        executorValue: 'Не назначен',
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
          isActive: false,
        },
        {
          name: 'Проект №2',
          value: 'proj2',
          isActive: false,
        },
        {
          name: 'Проект №3',
          value: 'proj3',
          isActive: false,
        },
        {
          name: 'Проект №4',
          value: 'proj4',
          isActive: false,
        },
        {
          name: 'Проект №5',
          value: 'proj5',
          isActive: false,
        },
      ],
      selectExecutors: [
        {
          name: 'Котов Семен Васильевич',
          value: 'kotov',
          isActive: false,
        },
        {
          name: 'Акунин Иван Иванович',
          value: 'akunin',
          isActive: false,
        },
        {
          name: 'Львов Петр Ибрагимович',
          value: 'lvov',
          isActive: false,
        },
        {
          name: 'Константинов Константин Иванович',
          value: 'konst',
          isActive: false,
        },
        {
          name: 'Иванов Петр Васильевич',
          value: 'ivanov',
          isActive: false,
        },
      ],
    };
  },
  methods: {
    updateProjectValue(value) {
      this.model.projectValue = value;

      this.selectProjects.forEach((el) => {
        if (el.name === value) {
          el.isActive = true;
        } else {
          el.isActive = false;
        }
      });
    },
    updateExecutortValue(value) {
      this.model.executorValue = value;

      this.selectExecutors.forEach((el) => {
        if (el.name === value) {
          el.isActive = true;
        } else {
          el.isActive = false;
        }
      });
    },
    getFormData() {
      console.log({
        title: this.model.titleValue,
        description: this.model.descriptionValue,
        project: this.model.projectValue,
        executor: this.model.executorValue,
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
