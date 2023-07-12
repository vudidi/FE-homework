<template>
  <div class="login">
    <PreloadModal :isOpen="isUsersLoading" />
    <form
      autocomplete="off"
      v-on:submit.prevent="login"
      ref="loginForm"
      id="login-form"
      class="form login__form"
      novalidate
    >
      <span class="login__error">{{ currentError }}</span>
      <h2 class="login__title">Вход</h2>
      <div class="modal__wrapper">
        <div class="modal__field login__field">
          <div class="modal__field-label">
            Логин
            <svg-icon
              v-bind:class="['modal__field-icon']"
              name="require"
            ></svg-icon>
          </div>

          <Input
            pattern="^[A-Za-z0-9@_\-\.]+$"
            id="login"
            autocomplete="off"
            inputErrorClass="login-error"
            placeholder=""
            type="text"
            :defaultInput="true"
            v-bind:class="['modal__field']"
            :maxlength="15"
            :minlength="3"
            required
            v-model="model.login"
          />
        </div>
        <div class="modal__field login__field">
          <div class="modal__field-label">
            Пароль
            <svg-icon
              v-bind:class="['modal__field-icon']"
              name="require"
            ></svg-icon>
          </div>

          <Input
            pattern="^[A-Za-z0-9@_\-\.]+$"
            id="password"
            autocomplete="new-password"
            inputErrorClass="password-error"
            placeholder=""
            :type="passwordInputType"
            :defaultInput="true"
            v-bind:class="['modal__field']"
            :maxlength="15"
            :minlength="6"
            required
            v-model="model.password"
            ><svg-icon
              v-on:click-svg="changePasswordVisability"
              v-if="isPasswordHidden"
              v-bind:class="['action-page__input-icon']"
              name="eye-close"
            ></svg-icon>
            <svg-icon
              v-on:click-svg="changePasswordVisability"
              v-else-if="!isPasswordHidden"
              v-bind:class="['action-page__input-icon']"
              name="eye-open"
            ></svg-icon
          ></Input>
        </div>
      </div>
      <div class="modal__buttons">
        <SubmitButton
          type="submit"
          id="login-btn"
          title="Войти"
          v-bind:class="[
            'button',
            'primary-button',
            'login__button',
            'form__button',
          ]"
        />
      </div>
    </form>
  </div>
</template>

<script>
import PreloadModal from '@/components/PreloadModal/PreloadModal.vue';
import enableValidation from '@/helpers/validation';
import { validationSet } from '@/helpers/constants';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { PreloadModal },
  data() {
    return {
      isPasswordHidden: true,
      model: {
        login: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapGetters(['isUsersLoading', 'currentError']),
    passwordInputType() {
      if (this.isPasswordHidden) {
        return 'password';
      } else {
        return 'text';
      }
    },
  },
  methods: {
    ...mapActions(['loginAction']),
    changePasswordVisability() {
      this.isPasswordHidden = !this.isPasswordHidden;
    },
    login() {
      const formValidity = this.$refs.loginForm.checkValidity();
      if (formValidity) {
        this.loginAction(this.model);
      } else {
        enableValidation(validationSet);
      }
    },
  },
  mounted() {
    enableValidation(validationSet);
  },
};
</script>

<style lang="scss"></style>
