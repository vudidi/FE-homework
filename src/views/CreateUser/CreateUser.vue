<template>
  <div class="action-page">
    <h1 class="action-page__title">Создание профиля сотрудника</h1>
    <form class="action-page__form">
      <div class="action-page__wrapper">
        <div class="action-page__container">
          <div class="action-page__line">
            <div class="action-page__label">
              ФИО
              <svg-icon
                v-bind:class="['action-page__icon']"
                name="require"
              ></svg-icon>
            </div>

            <Input
              placeholder="Введите ФИО"
              type="text"
              :defaultInput="true"
              v-bind:class="['action-page__input', 'profile-input']"
              :maxlength="256"
              :minlength="3"
              v-model="model.fullname"
            />
          </div>

          <div class="action-page__line">
            <div class="action-page__label">
              Логин
              <svg-icon
                v-bind:class="['action-page__icon']"
                name="require"
              ></svg-icon>
            </div>

            <Input
              placeholder="Введите логин"
              type="text"
              :defaultInput="true"
              v-bind:class="['action-page__input', 'profile-input']"
              :maxlength="256"
              :minlength="3"
              v-model="model.login"
            />
          </div>

          <div class="action-page__line">
            <div class="action-page__label">
              Пароль
              <svg-icon
                v-bind:class="['action-page__icon']"
                name="require"
              ></svg-icon>
            </div>

            <Input
              placeholder="Введите пароль"
              type="text"
              :defaultInput="true"
              v-bind:class="['action-page__input', 'profile-input']"
              :maxlength="256"
              :minlength="3"
              v-model="model.password"
            />
          </div>

          <div class="action-page__line">
            <div class="action-page__label">О себе</div>
            <textarea
              class="action-page__textarea profile-input"
              v-model="model.about"
            ></textarea>
          </div>
        </div>

        <div class="action-page__container">
          <div class="action-page__sidebar">Активен</div>
        </div>
      </div>

      <div class="action-page__buttons">
        <Link
          v-bind:link="cancelBtn"
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
export default {
  components: {},
  data() {
    return {
      model: {
        fullname: '',
        login: '',
        password: '',
        about: '',
      },
      createBtn: {
        id: 'create-user',
        title: 'Создать профиль',
      },
      cancelBtn: {
        id: 'cancel-user',
        title: 'Отмена',
        to: '/users',
      },
    };
  },
  methods: {
    getFormData() {
      console.log({
        fullname: this.model.fullname,
        login: this.model.login,
        password: this.model.password,
        about: this.model.about,
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
