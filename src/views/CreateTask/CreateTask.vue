<template>
  <div class="action-page">
    <h1 class="action-page__title">Создание задачи</h1>
    <form
      autocomplete="off"
      v-on:submit.prevent="addTask"
      ref="addTaskForm"
      id="add-task-form"
      class="form action-page__form"
      novalidate
    >
      <span
        :class="[
          'action-page__formError',
          { 'action-page__formError_visible': isFormError },
        ]"
        >Заполните форму корректными значениями</span
      >
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
              id="taskCode"
              inputErrorClass="taskCode-error"
              placeholder="Введите текст..."
              type="text"
              :defaultInput="true"
              v-bind:class="['action-page__input']"
              :maxlength="256"
              :minlength="3"
              required
              v-model="model.titleValue"
            />
          </div>
          <div class="action-page__line">
            <label class="action-page__label">Описание</label>
            <div class="textarea">
              <textarea
                id="taskDesc"
                class="action-page__textarea field__input"
                :maxlength="2048"
                :minlength="1"
                required
                v-model="model.descriptionValue"
              >
              </textarea
              ><span class="field__error textarea__error taskDesc-error">
              </span>
            </div>
          </div>
          <div class="action-page__line">
            <label class="action-page__label">
              Проект<svg-icon
                v-bind:class="['action-page__icon']"
                name="require"
              ></svg-icon>
            </label>

            <Select
              v-bind:items="projectsForSelect"
              :defaultValue="defaultProjectName"
              :activeOption="activeProjectOption"
              :isErrorInput="isErrorSelect"
              v-bind:class="['action-page__select']"
              selectID="projectSelect"
              v-on:click-select="updateProjectValue"
            />
          </div>

          <div class="action-page__line">
            <label class="action-page__label">Исполнитель</label>
            <Select
              v-bind:items="usersForSelect"
              :defaultValue="defaultExecutorName"
              :activeOption="activeExecutorOption"
              v-bind:class="['action-page__select']"
              selectID="executorSelect"
              v-on:click-select="updateExecutortValue"
            />
          </div>
        </div>
      </fieldset>

      <div class="action-page__buttons">
        <Button
          v-bind:button="cancelBtn"
          v-bind:class="['button', 'secondary-button', 'action-page__button']"
          v-on:click-btn="goBack"
        />

        <SubmitButton
          type="submit"
          :id="createBtn.id"
          :title="createBtn.title"
          v-bind:class="[
            'button',
            'form__button',
            'primary-button',
            'action-page__button',
          ]"
        />
      </div>
    </form>
  </div>
</template>

<script>
import enableValidation from '@/helpers/validation';
import { validationSet } from '@/helpers/constants';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  components: {},
  data() {
    return {
      isFormError: false,
      isErrorSelect: false,
      model: {
        titleValue: '',
        descriptionValue: '',
        projectValueId: '',
        executorValueId: '',
      },
      createBtn: {
        id: 'create-project',
        title: 'Создать задачу',
      },
      cancelBtn: {
        id: 'cancel-project',
        title: 'Отмена',
      },
    };
  },
  computed: {
    ...mapGetters(['currentUser', 'usersForSelect', 'projectsForSelect']),
    activeProjectOption() {
      const option = this.projectsForSelect.find((el) => el.isActive === true);
      if (option) {
        return option.value;
      } else if (this.$route.params.projectId) {
        const project = this.projectsForSelect.find(
          (el) => el.value === this.$route.params.projectId
        );
        this.model.projectValueId = project.value;
        return project.value;
      } else {
        return 'Выберите значение...';
      }
    },
    defaultProjectName() {
      const project = this.projectsForSelect.find((el) => el.isActive === true);
      if (project) {
        return project.name;
      } else if (this.$route.params.projectId) {
        const project = this.projectsForSelect.find(
          (el) => el.value === this.$route.params.projectId
        );
        return project.name;
      } else {
        return 'Выберите значение...';
      }
    },
    activeExecutorOption() {
      const option = this.usersForSelect.find((el) => el.isActive === true);
      if (option) {
        return option.value;
      } else {
        this.model.executorValueId = this.currentUser.id;
        return this.currentUser.id;
      }
    },
    defaultExecutorName() {
      const user = this.usersForSelect.find((el) => el.isActive === true);
      if (user) {
        return user.name;
      } else {
        return this.currentUser.name;
      }
    },
  },
  methods: {
    ...mapMutations(['SET_TS_SORT', 'SET_TS_FILTER']),
    ...mapActions([
      'appendTask',
      'fetchUsersForSelect',
      'fetchProjectsForSelect',
    ]),
    updateProjectValue(name, item) {
      this.model.projectValueId = item.value;
      this.isErrorSelect = false;

      this.projectsForSelect.forEach((el) => {
        if (el.name === name) {
          el.isActive = true;
        } else {
          el.isActive = false;
        }
      });
    },
    updateExecutortValue(name, item) {
      this.model.executorValueId = item.value;

      this.usersForSelect.forEach((el) => {
        if (el.name === name) {
          el.isActive = true;
        } else {
          el.isActive = false;
        }
      });
    },
    addTask() {
      const formValidity = this.$refs.addTaskForm.checkValidity();

      if (
        this.model.titleValue.trim().length < 3 ||
        this.model.descriptionValue.trim().length < 1
      ) {
        this.isFormError = true;
      } else if (this.model.projectValue === 'Выберите значение...') {
        this.isFormError = true;
        this.isErrorSelect = true;
      } else if (formValidity) {
        console.log({
          name: this.model.titleValue,
          description: this.model.descriptionValue,
          projectId: this.model.projectValueId,
          executor: this.model.executorValueId,
        });
        this.appendTask({
          name: this.model.titleValue,
          description: this.model.descriptionValue,
          projectId: this.model.projectValueId,
          executor: this.model.executorValueId,
          page: 1,
          sort: {
            field: 'dateCreated',
            type: 'desc',
            value: 'По дате создания',
          },
          filter: {
            author: this.currentUser.id,
            projectId: this.model.projectValueId,
          },
        });

        this.$router.push({
          name: 'tasks',
          query: {
            page: 1,
            field: 'dateCreated',
            type: 'desc',
            author: this.currentUser.id,
            projectId: this.model.projectValueId,
          },
        });

        this.SET_TS_SORT({
          field: 'dateCreated',
          type: 'desc',
          value: 'По дате создания',
        });
        this.SET_TS_FILTER({
          author: this.currentUser.id,
          projectId: this.model.projectValueId,
        });

        this.isFormError = false;
        this.isErrorSelect = false;
      } else {
        enableValidation(validationSet);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    enableValidation(validationSet);

    this.fetchUsersForSelect();
    this.fetchProjectsForSelect();
  },
};
</script>

<style lang="scss"></style>
